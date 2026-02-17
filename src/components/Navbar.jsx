// components/Navbar.jsx
export default function Navbar({ onNavigateHome, onNavigateSkills, onNavigateCareerPaths }) {
  
  // Function to navigate to AI Interview (external URL)
  const handleAIInterviewClick = () => {
    window.open('http://127.0.0.1:5000/', '_blank');
  };

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Home Button */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition duration-300"
            >
              CareerPilot<span className="text-blue-500">AI</span>
            </button>
          </div>

          {/* Navigation Links - Desktop - Rightmost */}
          <div className="hidden md:block ml-auto">
            <div className="flex items-baseline space-x-8">
              {/* 1st Button: Home */}
              <button
                onClick={onNavigateHome}
                className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-slate-800/50 hover:text-blue-300"
              >
                Home
              </button>
              
              {/* 2nd Button: Career Paths */}
              <button
                onClick={onNavigateCareerPaths}
                className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-slate-800/50 hover:text-blue-300"
              >
                Career Paths
              </button>
              
              {/* 3rd Button: AI Interview */}
              <button
                onClick={handleAIInterviewClick}
                className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-slate-800/50 hover:text-blue-300 flex items-center gap-2"
              >
                <span>🤖</span>
                AI Interview
              </button>
              
              {/* About Button */}
              <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-slate-800/50">
                About
              </a>
              
              {/* Contact Button */}
              <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-slate-800/50">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2 rounded-md hover:bg-slate-800/50 transition duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}