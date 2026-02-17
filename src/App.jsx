import { useState } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CareerPaths from "./components/CareerPaths"
// Import individual career path components
import ComputerEngineering from "./components/career-paths/ComputerEngineering"
import MechanicalEngineering from "./components/career-paths/MechanicalEngineering"
import ElectronicsEngineering from "./components/career-paths/ElectronicsEngineering"
import AutomobileEngineering from "./components/career-paths/AutomobileEngineering"
import ChemicalEngineering from "./components/career-paths/ChemicalEngineering"
import CivilEngineering from "./components/career-paths/CivilEngineering"
import AerospaceEngineering from "./components/career-paths/AerospaceEngineering"
import BiomedicalEngineering from "./components/career-paths/BiomedicalEngineering"
import AptitudeTestPage from "./pages/AptitudeTestPage"
import SkillTestModal from "./components/skill-tests/SkillTestModal"
import DarkVeil from "./components/DarkVeil"
import HomePage from "./pages/HomePage"

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJobForTest, setSelectedJobForTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Navigation functions for Navbar
  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateCareerPaths = () => {
    setCurrentPage('career-paths');
  };

  // Function to handle test completion
  const handleTestComplete = (results) => {
    console.log('Test completed with results:', results);
  };

  // Function to open test modal
  const openSkillTest = (job) => {
    setSelectedJobForTest(job);
    setIsTestModalOpen(true);
  };

  // Function to start aptitude test
  const startAptitudeTest = () => {
    setCurrentPage('aptitude-test');
  };

  // Helper function to handle back navigation
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleBackToCareerPaths = () => {
    setCurrentPage('career-paths');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar 
        onNavigateHome={handleNavigateHome}
        onNavigateCareerPaths={handleNavigateCareerPaths}
      />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onGetStarted={() => setCurrentPage('career-paths')} />
        )}
        
        {currentPage === 'career-paths' && (
          <CareerPaths 
            onBack={handleBackToHome}
            onStartSkillTest={startAptitudeTest}
            onSelectCareerPath={(careerId) => {
              // Navigate to specific career path page based on ID
              setCurrentPage(`career-${careerId}`);
            }}
          />
        )}
        
        {/* Aptitude Test Page */}
        {currentPage === 'aptitude-test' && (
          <AptitudeTestPage 
            onBack={handleBackToCareerPaths}
          />
        )}
        
        {/* Individual Career Path Pages */}
        {currentPage === 'career-computer' && (
          <ComputerEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-mechanical' && (
          <MechanicalEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-electronics' && (
          <ElectronicsEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-automobile' && (
          <AutomobileEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-chemical' && (
          <ChemicalEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-civil' && (
          <CivilEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-aerospace' && (
          <AerospaceEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
        
        {currentPage === 'career-biomedical' && (
          <BiomedicalEngineering 
            onBack={handleBackToCareerPaths}
            onStartSkillTest={openSkillTest}
          />
        )}
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