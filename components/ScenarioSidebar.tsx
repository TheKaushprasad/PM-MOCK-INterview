
import React from 'react';
import { Scenario } from '../types';
import { COACH_AVATAR_URL, RCA_GUIDE, GUESSTIMATE_GUIDE, STRATEGY_GUIDE, PRODUCT_DESIGN_GUIDE } from '../constants';

interface ScenarioSidebarProps {
  scenario: Scenario;
  onExit: () => void;
}

const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({ scenario, onExit }) => {
  let guideSteps = RCA_GUIDE;
  let tip = 'Don\'t jump to solutions. Good PMs fall in love with the problem first. Ask "Why" 5 times if needed.';

  if (scenario.category === 'Guesstimate') {
      guideSteps = GUESSTIMATE_GUIDE;
      tip = 'Focus on the formula first. The actual numbers matter less than your logic. Sanity check everything.';
  } else if (scenario.category === 'Strategy') {
      guideSteps = STRATEGY_GUIDE;
      tip = 'Consider the 3Cs: Company, Customer, Competition. A good strategy always involves trade-offs.';
  } else if (scenario.category === 'Product Design') {
      guideSteps = PRODUCT_DESIGN_GUIDE;
      tip = 'Define the USER first. If you solve for everyone, you solve for no one. Be specific with persona and pain points.';
  }

  return (
    <div className="w-full md:w-80 lg:w-96 bg-slate-900 text-white flex flex-col justify-between shrink-0 h-[30vh] md:h-full overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="p-6 pb-0">
             <button 
                onClick={onExit}
                className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Topics
            </button>

            <div className="flex items-center gap-2 mb-4">
                 <span className={`h-2 w-2 rounded-full ${
                     scenario.difficulty === 'Easy' ? 'bg-emerald-400' :
                     scenario.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-rose-400'
                 }`}></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {scenario.category} • {scenario.difficulty}
                 </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2 text-white/90">
                {scenario.title}
            </h2>
            {scenario.companyStyle && (
                <div className="text-xs font-mono text-blue-300/80 mb-2">Style: {scenario.companyStyle}</div>
            )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            
            {/* Context Widget */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Coach's Guide
                </h3>
                <ul className="space-y-3">
                    {guideSteps.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700/50 text-[10px] font-mono text-slate-400 shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span className="leading-tight">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 p-5 rounded-xl border border-indigo-500/20">
                <h3 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Pro Tip</h3>
                <p className="text-xs leading-relaxed text-indigo-100/80">
                    {tip}
                </p>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-slate-900">
            <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden bg-white">
                     <img src={COACH_AVATAR_URL} alt="AI" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="text-xs font-bold text-white">Coach AI</div>
                    <div className="text-[10px] text-slate-400">v2.0 • {scenario.category}</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ScenarioSidebar;
