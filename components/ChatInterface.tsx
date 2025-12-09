import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import { COACH_AVATAR_URL } from '../constants';

interface ChatInterfaceProps {
  messages: Message[];
  isThinking: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: (text: string) => void;
  onHint: () => void;
  onComplete: () => void;
}

// Add type definition for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isThinking,
  inputText,
  setInputText,
  onSendMessage,
  onHint,
  onComplete,
}) => {
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setInputText(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isThinking) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  // Helper to format basic markdown-like text
  const formatText = (text: string) => {
    return text.split('\n').map((str, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {str.split('**').map((part, index) =>
          index % 2 === 1 ? <strong key={index} className="font-semibold">{part}</strong> : part
        )}
      </p>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative">
      
      {/* Top Bar - Glassmorphism */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Coaching Session</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onHint}
            disabled={isThinking}
            className="group flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <span>💡</span> Hint
          </button>
          <button
            onClick={onComplete}
            disabled={isThinking}
            className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-20 pb-4 space-y-8 scrollbar-hide bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex w-full animate-fade-in-up ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
            style={{ animationDelay: '0ms' }}
          >
            <div className={`flex items-end gap-3 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden ${
                    msg.role === 'user' ? 'bg-slate-200' : 'bg-white'
                }`}>
                    {msg.role === 'user' ? (
                        <span className="text-[10px] font-bold text-slate-500">YOU</span>
                    ) : (
                        <img src={COACH_AVATAR_URL} alt="Coach" className="w-full h-full object-cover" />
                    )}
                </div>

                <div className="flex flex-col">
                    {/* Name Label */}
                    <span className={`text-[10px] uppercase font-bold text-slate-400 mb-1 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.role === 'user' ? 'You' : 'Coach AI'}
                    </span>

                    {/* Bubble */}
                    <div
                    className={`relative px-6 py-4 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                        : msg.role === 'system'
                        ? 'bg-slate-100 text-slate-600 rounded-xl border border-slate-200 w-full text-center italic'
                        : 'bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100'
                    }`}
                    >
                    {msg.role === 'system' ? (
                        <span className="flex items-center justify-center gap-2">
                            {msg.text}
                        </span>
                    ) : (
                        formatText(msg.text)
                    )}
                    </div>
                </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start w-full animate-fade-in-up">
             <div className="flex items-end gap-3 max-w-[80%]">
                 <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden">
                     <img src={COACH_AVATAR_URL} alt="Coach" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 px-1">Coach AI</span>
                    <div className="bg-white rounded-2xl rounded-tl-none px-6 py-5 border border-slate-100 shadow-sm flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '200ms' }} />
                        <div className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '400ms' }} />
                    </div>
                 </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
            placeholder={isListening ? "Listening..." : "Type your answer here..."}
            className={`flex-1 pl-5 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium disabled:bg-slate-100 placeholder:text-slate-400 ${
                isListening ? 'ring-2 ring-rose-100 border-rose-400' : ''
            }`}
          />
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isThinking}
            className={`absolute right-14 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center transition-all ${
                isListening 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title="Use Microphone"
          >
             {isListening ? (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                </svg>
             ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
             )}
          </button>

          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white aspect-square rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A2.001 2.001 0 005.684 9.5H8a.5.5 0 010 1H5.684a2.001 2.001 0 00-1.991 1.336l-1.414 4.925a.75.75 0 00.95.826l10.87-3.953a.75.75 0 000-1.414L4.055 2.29z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;