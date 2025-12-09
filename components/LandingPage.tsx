import React from 'react';
import { COACH_AVATAR_URL } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center animate-fade-in z-20 relative">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={onStart}>
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
             PM
           </div>
           <div className="text-xl font-bold tracking-tight text-slate-900">
             PM <span className="text-blue-600">Mock Interview</span>
           </div>
        </div>
        
        <button 
          onClick={scrollToHowItWorks} 
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-full hover:border-blue-200 hover:text-blue-600 hover:shadow-md transition-all duration-300 group"
        >
          <span>How it works</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-y-0.5 transition-transform duration-300">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-24 md:pt-16 md:pb-32 text-center max-w-7xl mx-auto w-full relative z-10">
        
        {/* Decorative background blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        {/* Teacher Avatar - Large Hero Element */}
        <div className="animate-fade-in-up mb-6">
            <div className="relative inline-block">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden relative z-10 mx-auto">
                    <img src={COACH_AVATAR_URL} alt="PM Coach" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-4 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100 text-xs font-bold text-slate-600 z-20 flex items-center gap-1">
                    <span>👋</span> Coach AI
                </div>
                {/* Decorative specs icon floating */}
                <div className="absolute -top-4 -left-8 text-4xl animate-bounce delay-700 opacity-80">👓</div>
            </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 animate-fade-in-up delay-100 max-w-4xl leading-[1.1]">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PM Interviews</span> <br className="hidden md:block" /> with AI Coaching.
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          Practice Root Cause Analysis, Guesstimates, and Product Sense interactive scenarios — just like real interview case rounds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full animate-fade-in-up delay-300">
          <button 
            onClick={onStart} 
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 text-lg"
          >
            Start Practicing
          </button>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative max-w-4xl w-full mx-auto animate-fade-in-up delay-500">
          {/* Abstract Interface Mockup */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform md:rotate-1 hover:rotate-0 transition-transform duration-700 ease-out mx-4 md:mx-0">
             <div className="bg-slate-50 border-b border-slate-100 p-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
             </div>
             <div className="p-6 md:p-10 text-left space-y-8 bg-slate-50/30">
                {/* Fake Conversation */}
                <div className="flex gap-4 items-end">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex-shrink-0 overflow-hidden">
                         <img src={COACH_AVATAR_URL} alt="AI" className="w-full h-full" />
                    </div>
                    <div className="bg-white p-5 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 text-slate-700 text-sm md:text-base leading-relaxed max-w-lg">
                      Estimate the number of daily Uber rides in NYC. How would you structure this?
                    </div>
                </div>

                <div className="flex gap-4 justify-end items-end">
                    <div className="bg-blue-600 p-5 rounded-2xl rounded-br-none shadow-lg shadow-blue-100 text-white text-sm md:text-base leading-relaxed max-w-lg">
                       I'll start by estimating the population of NYC, then segment by commuters vs tourists to find daily demand.
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 text-xs font-bold">You</div>
                </div>

                <div className="flex gap-4 items-end opacity-50 blur-[1px]">
                     <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex-shrink-0 overflow-hidden">
                         <img src={COACH_AVATAR_URL} alt="AI" className="w-full h-full" />
                    </div>
                    <div className="bg-white p-5 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 text-slate-700 text-sm md:text-base leading-relaxed max-w-lg">
                      Great approach. Let's list your assumptions for the commuter segment first.
                    </div>
                </div>
             </div>

             {/* Floating Score Badge */}
             <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 transform rotate-3 hover:rotate-0 transition-transform z-20">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Analytical Thinking</div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[90%]"></div>
                    </div>
                    <span className="font-bold text-slate-800">4.8/5</span>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { 
                 title: 'Execution & RCA', 
                 desc: 'Diagnose metric drops and solve operational problems using frameworks like 5-Whys.', 
                 icon: '🔍',
                 bg: 'bg-amber-100 text-amber-600'
               },
               { 
                 title: 'Guesstimates', 
                 desc: 'Master market sizing and estimation questions with a built-in calculator.', 
                 icon: '🧮',
                 bg: 'bg-blue-100 text-blue-600'
               },
               { 
                 title: 'AI Coaching', 
                 desc: 'Get directional hints and "brutal" feedback adjusted to the interview type.', 
                 icon: '🤖',
                 bg: 'bg-purple-100 text-purple-600'
               },
               { 
                 title: 'Progress Tracking', 
                 desc: 'Track your performance scores across structure, math, and communication.', 
                 icon: '📈',
                 bg: 'bg-emerald-100 text-emerald-600'
               }
             ].map((item, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl mb-6`}>{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    The Process
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    From Prep to Offer
                </h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    A simple 3-step loop to build your product intuition and ace the interview.
                </p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-10">
                {/* Desktop Connector Line */}
                <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 rounded-full z-0"></div>

                {[
                    { 
                        step: '1', 
                        title: 'Select a Round', 
                        desc: 'Choose from Root Cause Analysis or Guesstimates (Easy to Hard).', 
                        icon: '🎯',
                        color: 'bg-emerald-500',
                        lightColor: 'bg-emerald-50'
                    },
                    { 
                        step: '2', 
                        title: 'Interactive Chat', 
                        desc: 'Engage with the AI Coach. Apply frameworks, calculate, and solve.', 
                        icon: '💬',
                        color: 'bg-blue-500',
                        lightColor: 'bg-blue-50'
                    },
                    { 
                        step: '3', 
                        title: 'Get Evaluated', 
                        desc: 'Receive a detailed score card and actionable feedback to improve.', 
                        icon: '📊',
                        color: 'bg-indigo-500',
                        lightColor: 'bg-indigo-50'
                    }
                ].map((item, i) => (
                    <div key={i} className="relative z-10 group">
                        {/* Floating Icon */}
                        <div className="w-32 h-32 mx-auto bg-white rounded-full p-2 mb-8 shadow-xl shadow-slate-200/50 group-hover:scale-110 transition-transform duration-300 relative">
                            <div className={`w-full h-full rounded-full ${item.lightColor} flex items-center justify-center text-5xl border border-slate-100`}>
                                {item.icon}
                            </div>
                            {/* Step Badge */}
                            <div className={`absolute top-0 right-0 w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md`}>
                                {item.step}
                            </div>
                        </div>

                        {/* Card */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group-hover:-translate-y-2 text-center h-[260px] flex flex-col items-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Audience Section - Dark Theme Persona Grid */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          {/* Abstract BG Shapes */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Designed for your journey</h2>
                   <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                       Whether you're breaking into product management or sharpening your strategic skills, structural thinking is the key.
                   </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                      {
                          title: 'The Aspirant',
                          subtitle: 'Interview Candidates',
                          desc: 'Practice strictly for PM & APM case rounds. Build muscle memory.',
                          icon: '🎓',
                          gradient: 'from-blue-500/20 to-cyan-500/20',
                          border: 'border-blue-500/30'
                      },
                      {
                          title: 'The Switcher',
                          subtitle: 'Career Transitioners',
                          desc: 'Move from Engineering or Ops to Product by learning the mindset.',
                          icon: '🔄',
                          gradient: 'from-purple-500/20 to-pink-500/20',
                          border: 'border-purple-500/30'
                      },
                      {
                          title: 'The Student',
                          subtitle: 'MBA & Undergrads',
                          desc: 'Supplement your coursework with real-world simulated cases.',
                          icon: '📚',
                          gradient: 'from-emerald-500/20 to-teal-500/20',
                          border: 'border-emerald-500/30'
                      },
                      {
                          title: 'The Pro',
                          subtitle: 'Working PMs',
                          desc: 'Keep your problem-solving skills sharp and ready for senior roles.',
                          icon: '💼',
                          gradient: 'from-amber-500/20 to-orange-500/20',
                          border: 'border-amber-500/30'
                      }
                  ].map((persona, i) => (
                      <div key={i} className={`group relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border ${persona.border} hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
                          
                          <div className="relative z-10">
                              <div className="text-4xl mb-4 bg-slate-900 w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg border border-white/5">
                                  {persona.icon}
                              </div>
                              <h3 className="text-xl font-bold text-white mb-1">{persona.title}</h3>
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{persona.subtitle}</div>
                              <p className="text-sm text-slate-300 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                  {persona.desc}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA - High Impact */}
      <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
                  Ready to crack the interview?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Join hundreds of PMs practicing structured interview questions today. It's free, fun, and effective.
              </p>
              <button 
                onClick={onStart}
                className="bg-white text-blue-700 font-bold text-lg py-4 px-12 rounded-full hover:bg-blue-50 hover:scale-105 transition-all shadow-2xl shadow-blue-900/20"
              >
                  Start Practicing Now
              </button>
              <div className="mt-8 flex justify-center gap-6 text-sm text-blue-200/80 font-medium">
                  <span className="flex items-center gap-2">✓ No Login Required</span>
                  <span className="flex items-center gap-2">✓ Instant Feedback</span>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm font-bold text-slate-900">
                  PM <span className="text-blue-600">Mock Interview</span>
              </div>
              <div className="flex gap-8 text-sm text-slate-500">
                  <a href="#" className="hover:text-slate-900">Terms</a>
                  <a href="#" className="hover:text-slate-900">Privacy</a>
                  <a href="#" className="hover:text-slate-900">Contact</a>
              </div>
              <div className="text-sm text-slate-400">
                  © RCA Lab 2025
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;