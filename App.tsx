import React, { useState, useRef } from 'react';
import { Scenario, Message, AppState, EvaluationResult } from './types';
import LandingPage from './components/LandingPage';
import ScenarioList from './components/ScenarioList';
import ScenarioSidebar from './components/ScenarioSidebar';
import ChatInterface from './components/ChatInterface';
import EvaluationView from './components/EvaluationView';
import Calculator from './components/Calculator';
import { Chat } from '@google/genai';
import { createChatSession, startScenario, sendMessageToCoach, getHintFromCoach, endSessionAndEvaluate, generateSpeech } from './services/geminiService';

// Audio Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  
  // Shared Input State
  const [chatInputText, setChatInputText] = useState('');

  // Refs
  const chatRef = useRef<Chat | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playAudio = async (base64Data: string) => {
    if (!isVoiceEnabled) return;
    initAudioContext();
    const ctx = audioContextRef.current!;
    
    // Stop previous audio if still playing
    if (activeAudioSourceRef.current) {
      try { activeAudioSourceRef.current.stop(); } catch (e) {}
    }

    const audioBytes = decode(base64Data);
    const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
    
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
    activeAudioSourceRef.current = source;
  };

  const handleStartPractice = () => {
    setAppState('selection');
  };

  const handleGoToLanding = () => {
    setAppState('landing');
    setActiveScenario(null);
    setMessages([]);
    setEvaluation(null);
    chatRef.current = null;
    setChatInputText('');
    if (activeAudioSourceRef.current) activeAudioSourceRef.current.stop();
  };

  const handleSelectScenario = async (scenario: Scenario) => {
    setActiveScenario(scenario);
    setAppState('coaching');
    setMessages([]);
    setChatInputText('');
    setIsThinking(true);

    try {
      const chat = createChatSession(scenario.category);
      chatRef.current = chat;
      
      const initialResponse = await startScenario(chat, scenario.title, scenario.category);
      
      const systemMsg: Message = {
        id: Date.now().toString(),
        role: 'model',
        text: initialResponse
      };
      setMessages([systemMsg]);

      // Speak initial greeting if voice is on
      if (isVoiceEnabled) {
          const audioData = await generateSpeech(initialResponse);
          if (audioData) playAudio(audioData);
      }
    } catch (error) {
      console.error(error);
      setMessages([{ id: 'err', role: 'system', text: 'Failed to start session.' }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!chatRef.current) return;
    if (activeAudioSourceRef.current) activeAudioSourceRef.current.stop();

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const responseText = await sendMessageToCoach(chatRef.current, text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);

      if (isVoiceEnabled) {
          const audioData = await generateSpeech(responseText);
          if (audioData) playAudio(audioData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleHint = async () => {
    if (!chatRef.current) return;
    setIsThinking(true);
    try {
        const hintText = await getHintFromCoach(chatRef.current);
        const fullHintText = `💡 HINT: ${hintText}`;
        const hintMsg: Message = {
            id: Date.now().toString(),
            role: 'system',
            text: fullHintText
        };
        setMessages(prev => [...prev, hintMsg]);
        if (isVoiceEnabled) {
            const audioData = await generateSpeech(hintText);
            if (audioData) playAudio(audioData);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsThinking(false);
    }
  };

  const handleComplete = async () => {
    if (!chatRef.current || !activeScenario) return;
    setIsThinking(true);
    if (activeAudioSourceRef.current) activeAudioSourceRef.current.stop();
    try {
        const result = await endSessionAndEvaluate(chatRef.current, activeScenario.category);
        setEvaluation(result);
        setAppState('evaluation');
        
        if (isVoiceEnabled) {
            const evaluationVoiceText = `Session complete. Your final score is ${result.scores.finalScore} out of 100. ${result.improvementSuggestions}`;
            const audioData = await generateSpeech(evaluationVoiceText);
            if (audioData) playAudio(audioData);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsThinking(false);
    }
  };

  const handleExit = () => {
    setAppState('selection');
    setActiveScenario(null);
    setMessages([]);
    setEvaluation(null);
    chatRef.current = null;
    setChatInputText('');
    if (activeAudioSourceRef.current) activeAudioSourceRef.current.stop();
  };

  const handleCalculatorPaste = (val: string) => {
      setChatInputText(prev => prev ? `${prev} ${val}` : val);
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      {appState === 'landing' && (
        <div className="w-full h-full overflow-y-auto bg-white">
          <LandingPage 
            onStart={handleStartPractice} 
          />
        </div>
      )}

      {appState === 'selection' && (
        <div className="w-full h-full overflow-y-auto">
            <ScenarioList onSelect={handleSelectScenario} onGoHome={handleGoToLanding} />
        </div>
      )}

      {(appState === 'coaching' || appState === 'evaluation') && activeScenario && (
        <>
          <ScenarioSidebar scenario={activeScenario} onExit={handleExit} />
          <div className="flex-1 h-full p-4 md:p-6 overflow-hidden flex flex-col relative">
            <ChatInterface 
                messages={messages} 
                isThinking={isThinking}
                inputText={chatInputText}
                setInputText={setChatInputText}
                onSendMessage={handleSendMessage}
                onHint={handleHint}
                onComplete={handleComplete}
                isVoiceEnabled={isVoiceEnabled}
                setIsVoiceEnabled={setIsVoiceEnabled}
                onInitAudio={initAudioContext}
            />
          </div>
          {activeScenario.category === 'Guesstimate' && (
              <Calculator onPasteToChat={handleCalculatorPaste} />
          )}
        </>
      )}

      {appState === 'evaluation' && evaluation && (
        <EvaluationView result={evaluation} onClose={handleExit} />
      )}
    </div>
  );
};

export default App;
