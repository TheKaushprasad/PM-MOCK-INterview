
import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { Scenario, Difficulty, Category } from '../types';

interface ScenarioListProps {
  onSelect: (scenario: Scenario) => void;
  onGoHome: () => void;
}

const ScenarioList: React.FC<ScenarioListProps> = ({ onSelect, onGoHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('RCA');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredScenarios = SCENARIOS.filter(
    (s) => s.category === selectedCategory && (filterDifficulty === 'All' || s.difficulty === filterDifficulty)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 h-full overflow-y-auto">
      {/* Header Section */}
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
          Ace Your Next Interview
        </div>
        <h1 
          onClick={onGoHome}
          className="text-5xl font-extrabold mb-4 tracking-tight text-slate-900 cursor-pointer hover:opacity-80 transition-opacity select-none"
        >
          PM <span className="text-gradient">Mock Interview</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Select a round type and scenario below to start your AI-guided practice session.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up delay-75">
        <button
            onClick={() => { setSelectedCategory('RCA'); setFilterDifficulty('All'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === 'RCA'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105'
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-200'
            }`}
        >
            <span>🔍</span> RCA
        </button>
        <button
            onClick={() => { setSelectedCategory('Product Design'); setFilterDifficulty('All'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === 'Product Design'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 transform scale-105'
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-200'
            }`}
        >
            <span>🎨</span> Product Design
        </button>
        <button
            onClick={() => { setSelectedCategory('Guesstimate'); setFilterDifficulty('All'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === 'Guesstimate'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-105'
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-200'
            }`}
        >
            <span>🧮</span> Guesstimates
        </button>
        <button
            onClick={() => { setSelectedCategory('Strategy'); setFilterDifficulty('All'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === 'Strategy'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 transform scale-105'
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-200'
            }`}
        >
            <span>♟️</span> Strategy
        </button>
      </div>

      {/* Difficulty Filter (Secondary) */}
      <div className="flex justify-center gap-4 mb-10 animate-fade-in-up delay-100 border-b border-slate-100 pb-4 w-fit mx-auto">
        {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterDifficulty(level)}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors px-2 ${
              filterDifficulty === level
                ? 'text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Scenarios Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
        {filteredScenarios.length > 0 ? (
            filteredScenarios.map((scenario, index) => (
            <button
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                className="group relative flex flex-col text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${150 + index * 50}ms`, animationFillMode: 'both' }}
            >
                {/* Difficulty Dot */}
                <div className="flex justify-between items-start mb-4 w-full">
                <span
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    scenario.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : scenario.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                    scenario.difficulty === 'Easy' ? 'bg-emerald-500' :
                    scenario.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}></span>
                    {scenario.difficulty}
                </span>
                
                {scenario.companyStyle && (
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide border border-slate-200 px-2 py-0.5 rounded-md">
                        {scenario.companyStyle}
                    </span>
                )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                {scenario.title}
                </h3>
                
                <p className="text-sm text-slate-400 mt-auto pt-4 font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Start Practice
                </p>
            </button>
            ))
        ) : (
            <div className="col-span-full text-center py-12 text-slate-400 italic animate-fade-in">
                No scenarios found for this category and difficulty.
            </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioList;
