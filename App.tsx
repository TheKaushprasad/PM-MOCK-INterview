import React, { useState, useRef } from 'react';
import { Scenario, Message, AppState, EvaluationResult } from './types';
import LandingPage from './components/LandingPage';
import ScenarioList from './components/ScenarioList';
import ScenarioSidebar from './components/ScenarioSidebar';
import ChatInterface from './components/ChatInterface';
import EvaluationView from './components/EvaluationView';
import Calculator from './components/Calculator'; // Import calculator
import { Chat } from '@google/genai';
import { createChatSession, startScenario, sendMessageToCoach, getHintFromCoach, endSessionAndEvaluate } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  
  // Shared Input State
  const [chatInputText, setChatInputText] = useState('');

  // Keep the chat instance in a ref so it doesn't trigger re-renders
  const chatRef = useRef<Chat | null>(null);

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
    } catch (error) {
      console.error(error);
      setMessages([{ id: 'err', role: 'system', text: 'Failed to start session.' }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!chatRef.current) return;

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
        const hintMsg: Message = {
            id: Date.now().toString(),
            role: 'system',
            text: `💡 HINT: ${hintText}`
        };
        setMessages(prev => [...prev, hintMsg]);
    } catch (error) {
        console.error(error);
    } finally {
        setIsThinking(false);
    }
  };

  const handleComplete = async () => {
    if (!chatRef.current || !activeScenario) return;
    setIsThinking(true);
    try {
        const result = await endSessionAndEvaluate(chatRef.current, activeScenario.category);
        setEvaluation(result);
        setAppState('evaluation');
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
  };

  const handleCalculatorPaste = (val: string) => {
      setChatInputText(prev => prev ? `${prev} ${val}` : val);
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      {appState === 'landing' && (
        <div className="w-full h-full overflow-y-auto bg-white">
          <LandingPage onStart={handleStartPractice} />
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
            />
          </div>
          {/* Conditionally Render Calculator Panel */}
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