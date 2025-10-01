import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/skills');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl lg:text-7xl font-extrabold text-blue-700 mb-6">
          Welcome to CareerPilot-AI 🚀
        </h1>
        <p className="text-lg lg:text-xl text-gray-800 mb-10">
          Your AI-powered guide to career growth — explore skills, practice mock interviews, 
          and prepare for your dream job with smart AI tools.
        </p>
        <button 
          onClick={handleGetStarted}
          className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}