
import React, { useEffect, useState } from 'react';
import { EvaluationResult } from '../types';

interface EvaluationViewProps {
  result: EvaluationResult;
  onClose: () => void;
}

const EvaluationView: React.FC<EvaluationViewProps> = ({ result, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBarColor = (score: number) => {
    if (score >= 4) return 'bg-emerald-500';
    if (score >= 3) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  // Dynamic Score Cards based on available metrics
  const scoreCards = [
      { label: 'Structured Thinking', val: result.scores.structuredThinking, icon: '🧠' },
      { label: 'Communication Clarity', val: result.scores.communicationClarity, icon: '💬' }
  ];

  // Specific metrics based on category
  if (result.scores.mathAndReasoning !== undefined) {
      scoreCards.splice(1, 0, { label: 'Framework Application', val: result.scores.frameworkUsage, icon: '📐' }); // Assumptions
      scoreCards.splice(2, 0, { label: 'Math & Reasoning', val: result.scores.mathAndReasoning, icon: '🧮' });
  } else if (result.scores.strategicInsight !== undefined) {
      scoreCards.splice(1, 0, { label: 'Framework Application', val: result.scores.frameworkUsage, icon: '📐' });
      scoreCards.splice(2, 0, { label: 'Strategic Insight', val: result.scores.strategicInsight, icon: '♟️' });
  } else if (result.scores.userUnderstanding !== undefined) {
      scoreCards.splice(1, 0, { label: 'User Understanding', val: result.scores.userUnderstanding, icon: '👥' });
      scoreCards.splice(2, 0, { label: 'Prioritization Clarity', val: result.scores.prioritizationClarity, icon: '⚖️' });
  } else {
      // Default RCA
      scoreCards.splice(1, 0, { label: 'Framework Application', val: result.scores.frameworkUsage, icon: '📐' });
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header - Celebratory */}
        <div className="bg-slate-50 border-b border-slate-100 p-8 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                Session Complete
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Performance Report</h2>
            <p className="text-slate-500">Here's a breakdown of your performance.</p>
          </div>

          <div className="relative z-10 text-right">
             <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Total Score</div>
             <div className={`text-6xl font-black tracking-tighter ${getScoreColor(result.scores.finalScore)}`}>
                 {animate ? result.scores.finalScore : 0}
                 <span className="text-2xl text-slate-300 font-medium">/100</span>
             </div>
          </div>
          
          {/* Decorative BG element */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 space-y-10">
          
          {/* Score Cards - Dynamic Grid */}
          <div className={`grid gap-6 ${scoreCards.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
            {scoreCards.map((stat, idx) => (
                <div 
                    key={idx} 
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-500"
                    style={{ opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${idx * 100}ms` }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
                        <span className="text-xl grayscale opacity-50">{stat.icon}</span>
                    </div>
                    <div className="flex items-end gap-2 mb-3">
                        <span className="text-3xl font-bold text-slate-800">{stat.val}</span>
                        <span className="text-sm text-slate-400 mb-1.5 font-medium">/ 5.0</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(stat.val)}`} 
                            style={{ 
                                width: animate ? `${(stat.val / 5) * 100}%` : '0%',
                                transitionDelay: `${(idx * 150) + 300}ms` 
                            }}
                        />
                    </div>
                </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Col - Summary */}
            <div className="lg:col-span-7 space-y-8">
                <div className="animate-fade-in-up delay-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-blue-500">🔍</span> The Analysis
                    </h3>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 text-base leading-relaxed border border-slate-100 shadow-sm">
                        {result.rootCauseSummary}
                    </div>
                </div>

                <div className="animate-fade-in-up delay-300">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recommendation / Actions</h3>
                    <div className="grid gap-3">
                        {result.recommendedActions.map((action, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl text-sm text-slate-600">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                                {action}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Col - Steps & Feedback */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in-up delay-500">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Reasoning Path</h3>
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2">
                        {result.reasoningSteps.map((step, i) => (
                            <div key={i} className="ml-6 relative group">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-500 group-hover:scale-110 transition-all"></div>
                                <p className="text-sm text-slate-600 leading-snug">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                        💡 Coach's Feedback
                    </h3>
                    <p className="text-amber-900/80 text-sm leading-relaxed italic">
                        "{result.improvementSuggestions}"
                    </p>
                </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button 
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl transform hover:-translate-y-0.5"
            >
                Start New Scenario
            </button>
        </div>

      </div>
    </div>
  );
};

export default EvaluationView;
