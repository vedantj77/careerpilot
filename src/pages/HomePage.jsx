// pages/HomePage.jsx
import DarkVeil from "../components/DarkVeil";

export default function HomePage({ onGetStarted }) {
  return (
    <div className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dark Veil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil 
          hueShift={30}
          noiseIntensity={0.02}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={0.5}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="text-center max-w-4xl relative z-10">
        <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
          Welcome to CareerPilot-AI 🚀
        </h1>
        <p className="text-lg lg:text-xl text-slate-200 mb-10 drop-shadow-lg">
          Your AI-powered guide to career growth — explore skills, practice mock interviews, 
          and prepare for your dream job with smart AI tools.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={onGetStarted}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40 backdrop-blur-sm border border-blue-400/20 hover:border-blue-300/30"
          >
            Explore Skills & Jobs
          </button>
        </div>
        
        {/* Simple Features Highlight */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Skill Tests Box */}
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-xl hover:scale-105">
            <div className="text-2xl mb-3">🧠</div>
            <h3 className="text-white font-semibold mb-2">AI Skill Tests</h3>
            <p className="text-slate-200 text-sm">
              Take personalized assessments for any job role with instant AI feedback
            </p>
          </div>
          
          {/* Smart Job Matching Box */}
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-xl hover:scale-105">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Smart Job Matching</h3>
            <p className="text-slate-200 text-sm">
              Get job recommendations based on your skills and experience level
            </p>
          </div>
          
          {/* Learning Roadmaps Box */}
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-xl hover:scale-105">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="text-white font-semibold mb-2">Domain-Based AI Interview</h3>
            <p className="text-slate-200 text-sm">
            Conducts smart, field-specific interviews tailored to the candidate’s chosen domain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}