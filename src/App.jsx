import { useState } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SkillsSection from "./components/SkillsSection"

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderHomePage = () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6">
          Welcome to CareerPilot-AI 🚀
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 mb-10">
          Your AI-powered guide to career growth — explore skills, practice mock interviews, 
          and prepare for your dream job with smart AI tools.
        </p>
        <button 
          onClick={() => setCurrentPage('skills')}
          className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 shadow-blue-500/25"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        {currentPage === 'home' 
          ? renderHomePage() 
          : <SkillsSection onBack={() => setCurrentPage('home')} />
        }
      </main>
      <Footer />
    </div>
  );
}