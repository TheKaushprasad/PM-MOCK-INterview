import React, { useState, useEffect } from 'react';

interface CalculatorProps {
  onPasteToChat: (value: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onPasteToChat }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<string | null>(null);
  const [expression, setExpression] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setShouldResetDisplay(true);
    setExpression(display + ' ' + op + ' ');
  };

  const calculate = () => {
    try {
      // Basic safe calculation using Function constructor is often cleaner than eval, 
      // but for a simple calculator, we parse manually or use eval carefully. 
      // For this practice app, we'll strip non-math chars.
      const fullExpression = expression + display;
      // Replace visual operators with JS operators
      const sanitized = fullExpression.replace(/×/g, '*').replace(/÷/g, '/');
      
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      
      const resultStr = String(Number(result.toFixed(2))); // limit decimals
      
      setHistory(prev => [fullExpression + ' = ' + resultStr, ...prev].slice(0, 10));
      setDisplay(resultStr);
      setExpression('');
      setShouldResetDisplay(true);
    } catch (e) {
      setDisplay('Error');
      setShouldResetDisplay(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setShouldResetDisplay(false);
  };

  const handlePaste = () => {
    onPasteToChat(display);
  };

  const handleMemory = (action: 'MS' | 'MR' | 'MC') => {
    if (action === 'MS') setMemory(display);
    if (action === 'MC') setMemory(null);
    if (action === 'MR' && memory) {
        setDisplay(memory);
        setShouldResetDisplay(true);
    }
  };

  return (
    <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 flex flex-col h-[40vh] md:h-full shrink-0">
      <div className="p-4 bg-white border-b border-slate-200 shadow-sm z-10">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="text-lg">🧮</span> Calculator
        </h3>
      </div>

      {/* Display */}
      <div className="bg-slate-900 p-6 text-right flex flex-col justify-end h-32 shrink-0">
        <div className="text-slate-400 text-xs h-6">{expression}</div>
        <div className="text-white text-3xl font-mono tracking-wider truncate">{display}</div>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-4 grid grid-cols-4 gap-2 content-start">
        {/* Memory Row */}
        <button onClick={() => handleMemory('MC')} className="btn-calc-secondary text-xs">MC</button>
        <button onClick={() => handleMemory('MR')} className="btn-calc-secondary text-xs disabled:opacity-50" disabled={!memory}>MR</button>
        <button onClick={() => handleMemory('MS')} className="btn-calc-secondary text-xs">MS</button>
        <button onClick={clear} className="btn-calc-danger text-xs font-bold text-rose-600">AC</button>

        {/* Numbers & Ops */}
        <button onClick={() => handleNumber('7')} className="btn-calc">7</button>
        <button onClick={() => handleNumber('8')} className="btn-calc">8</button>
        <button onClick={() => handleNumber('9')} className="btn-calc">9</button>
        <button onClick={() => handleOperator('÷')} className="btn-calc-primary">÷</button>

        <button onClick={() => handleNumber('4')} className="btn-calc">4</button>
        <button onClick={() => handleNumber('5')} className="btn-calc">5</button>
        <button onClick={() => handleNumber('6')} className="btn-calc">6</button>
        <button onClick={() => handleOperator('×')} className="btn-calc-primary">×</button>

        <button onClick={() => handleNumber('1')} className="btn-calc">1</button>
        <button onClick={() => handleNumber('2')} className="btn-calc">2</button>
        <button onClick={() => handleNumber('3')} className="btn-calc">3</button>
        <button onClick={() => handleOperator('-')} className="btn-calc-primary">−</button>

        <button onClick={() => handleNumber('0')} className="btn-calc col-span-2">0</button>
        <button onClick={() => handleNumber('.')} className="btn-calc">.</button>
        <button onClick={() => handleOperator('+')} className="btn-calc-primary">+</button>

        <button onClick={calculate} className="col-span-4 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all mt-2 text-xl">=</button>
      
        <button 
            onClick={handlePaste} 
            className="col-span-4 mt-2 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
        >
            <span>📋</span> Paste Result to Chat
        </button>
      </div>

      {/* History Log */}
      <div className="h-32 bg-white border-t border-slate-200 p-4 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">History</div>
        <div className="space-y-1">
            {history.map((item, i) => (
                <div key={i} className="text-xs text-slate-600 font-mono border-b border-slate-50 pb-1 last:border-0">{item}</div>
            ))}
            {history.length === 0 && <div className="text-xs text-slate-300 italic">No calculations yet.</div>}
        </div>
      </div>

      <style>{`
        .btn-calc {
            @apply bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg shadow-sm border border-slate-200 h-12 text-lg active:scale-95 transition-transform;
        }
        .btn-calc-primary {
            @apply bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-lg shadow-sm border border-indigo-100 h-12 text-lg active:scale-95 transition-transform;
        }
        .btn-calc-secondary {
            @apply bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold rounded-lg shadow-sm h-10 active:scale-95 transition-transform;
        }
        .btn-calc-danger {
            @apply bg-rose-50 hover:bg-rose-100 rounded-lg shadow-sm border border-rose-100 h-10 active:scale-95 transition-transform;
        }
      `}</style>
    </div>
  );
};

export default Calculator;