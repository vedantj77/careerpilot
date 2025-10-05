import { useState } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SkillsSection from "./components/SkillsSection"
import SkillTestModal from "./components/skill-tests/SkillTestModal"

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJobForTest, setSelectedJobForTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Function to handle test completion (you can expand this later)
  const handleTestComplete = (results) => {
    console.log('Test completed with results:', results);
    // You can add analytics, notifications, or result storage here
  };

  // Function to open test modal from anywhere in the app
  const openSkillTest = (job) => {
    setSelectedJobForTest(job);
    setIsTestModalOpen(true);
  };

  const renderHomePage = () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6">
          Welcome to CareerPilot-AI 🚀
        </h1>
        <p className="text-lg lg:text-xl text-slate-300 mb-10">
          Your AI-powered guide to career growth — explore skills, practice mock interviews, 
          and prepare for your dream job with smart AI tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setCurrentPage('skills')}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 shadow-blue-500/25"
          >
            Explore Skills & Jobs
          </button>
          <button 
            onClick={() => {
              // Example: Open test modal for a generic frontend role
              openSkillTest({
                role: "Frontend Developer",
                skillsRequired: ["HTML", "CSS", "JavaScript", "React"],
                originalExperienceLevel: "Junior"
              });
            }}
            className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 shadow-purple-500/25"
          >
            Try AI Skill Test
          </button>
        </div>
        
        {/* New Features Highlight */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-3">🧠</div>
            <h3 className="text-white font-semibold mb-2">AI Skill Tests</h3>
            <p className="text-slate-300 text-sm">
              Take personalized assessments for any job role with instant AI feedback
            </p>
          </div>
          
          <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Smart Job Matching</h3>
            <p className="text-slate-300 text-sm">
              Get job recommendations based on your skills and experience level
            </p>
          </div>
          
          <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-white font-semibold mb-2">Learning Roadmaps</h3>
            <p className="text-slate-300 text-sm">
              Follow structured learning paths to fill your skill gaps
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />
      <main className="flex-grow">
        {currentPage === 'home' 
          ? renderHomePage() 
          : <SkillsSection 
              onBack={() => setCurrentPage('home')}
              onStartSkillTest={openSkillTest} // Pass the function to SkillsSection
            />
        }
      </main>
      <Footer />

      {/* Global Skill Test Modal */}
      {isTestModalOpen && selectedJobForTest && (
        <SkillTestModal
          job={selectedJobForTest}
          isOpen={isTestModalOpen}
          onClose={() => {
            setIsTestModalOpen(false);
            setSelectedJobForTest(null);
          }}
          onTestComplete={handleTestComplete}
        />
      )}
    </div>
  );
}