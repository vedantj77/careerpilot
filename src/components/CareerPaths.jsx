import React from 'react';

const engineeringCareerPaths = [
  {
    id: 'computer',
    title: 'Computer/IT Engineering',
    description: 'Design, develop, and maintain computer systems, networks, and software applications',
    icon: '💻',
    color: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
    borderColor: 'border-blue-200 dark:border-blue-700/50',
    coreSubjects: ['Data Structures & Algorithms', 'Computer Networks', 'Database Systems', 'Operating Systems', 'Software Engineering'],
    keySkills: ['Programming (Python/Java/C++)', 'Cloud Computing (AWS/Azure)', 'Cybersecurity', 'DevOps', 'Machine Learning'],
    averageSalary: '$85,000 - $150,000+',
    growth: '25% (Much faster than average)',
    industries: ['Tech Companies', 'Finance', 'Healthcare', 'E-commerce', 'Government'],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Intel'],
  },
  {
    id: 'electronics',
    title: 'Electronics Engineering',
    description: 'Design and develop electronic circuits, devices, and systems',
    icon: '🔌',
    color: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
    borderColor: 'border-purple-200 dark:border-purple-700/50',
    coreSubjects: ['Digital Electronics', 'Microprocessors', 'Signal Processing', 'VLSI Design', 'Embedded Systems'],
    keySkills: ['PCB Design', 'Analog/Digital Circuit Design', 'MATLAB/Simulink', 'FPGA Programming', 'IoT Development'],
    averageSalary: '$75,000 - $130,000+',
    growth: '7% (As fast as average)',
    industries: ['Semiconductor', 'Consumer Electronics', 'Telecommunications', 'Automotive', 'Aerospace'],
    topCompanies: ['Intel', 'Texas Instruments', 'Qualcomm', 'Samsung', 'NVIDIA', 'Broadcom'],
  },
  {
    id: 'mechanical',
    title: 'Mechanical Engineering',
    description: 'Design, analyze, and manufacture mechanical systems and thermal devices',
    icon: '⚙️',
    color: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
    borderColor: 'border-orange-200 dark:border-orange-700/50',
    coreSubjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'CAD/CAM', 'Manufacturing Processes'],
    keySkills: ['SolidWorks/CATIA', 'Finite Element Analysis (FEA)', '3D Printing/Additive Manufacturing', 'Robotics', 'HVAC Design'],
    averageSalary: '$70,000 - $120,000+',
    growth: '10% (Faster than average)',
    industries: ['Automotive', 'Aerospace', 'Energy', 'Manufacturing', 'Robotics'],
    topCompanies: ['Tesla', 'Boeing', 'General Electric', 'Toyota', 'Siemens', 'Lockheed Martin'],
  },
  {
    id: 'automobile',
    title: 'Automobile Engineering',
    description: 'Design, develop, and test vehicles and their components',
    icon: '🚗',
    color: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30',
    borderColor: 'border-emerald-200 dark:border-emerald-700/50',
    coreSubjects: ['Vehicle Dynamics', 'Automotive Electronics', 'Engine Design', 'Chassis Design', 'Alternative Fuels'],
    keySkills: ['CAD (CATIA/UG NX)', 'Crash Simulation', 'Electric Vehicle Technology', 'Engine Calibration', 'NVH Analysis'],
    averageSalary: '$68,000 - $115,000+',
    growth: '12% (Faster than average)',
    industries: ['Automotive OEMs', 'Auto Components', 'EV Manufacturing', 'Racing', 'Transportation'],
    topCompanies: ['Tesla', 'Ford', 'Toyota', 'BMW', 'Mercedes-Benz', 'Rivian'],
  },
  {
    id: 'chemical',
    title: 'Chemical Engineering',
    description: 'Design processes for converting raw materials into valuable products',
    icon: '🧪',
    color: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30',
    borderColor: 'border-amber-200 dark:border-amber-700/50',
    coreSubjects: ['Process Engineering', 'Thermodynamics', 'Reaction Engineering', 'Mass Transfer', 'Process Control'],
    keySkills: ['ASPEN/HYSYS', 'Process Simulation', 'Safety Management', 'Quality Control', 'Plant Design'],
    averageSalary: '$78,000 - $135,000+',
    growth: '8% (As fast as average)',
    industries: ['Petrochemicals', 'Pharmaceuticals', 'Food Processing', 'Biotechnology', 'Energy'],
    topCompanies: ['Dow Chemical', 'BASF', 'Shell', 'Pfizer', 'ExxonMobil', 'P&G'],
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    description: 'Design, construct, and maintain infrastructure projects',
    icon: '🏗️',
    color: 'from-stone-50 to-stone-100 dark:from-stone-800/30 dark:to-stone-700/30',
    borderColor: 'border-stone-300 dark:border-stone-600/50',
    coreSubjects: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Construction Management'],
    keySkills: ['AutoCAD Civil 3D', 'STAAD Pro', 'Project Planning', 'Building Codes', 'Surveying'],
    averageSalary: '$65,000 - $110,000+',
    growth: '7% (As fast as average)',
    industries: ['Construction', 'Infrastructure', 'Urban Planning', 'Real Estate', 'Government'],
    topCompanies: ['Bechtel', 'AECOM', 'Jacobs', 'Fluor', 'Tata Projects'],
  },
  {
    id: 'aerospace',
    title: 'Aerospace Engineering',
    description: 'Design aircraft, spacecraft, satellites, and missiles',
    icon: '🚀',
    color: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30',
    borderColor: 'border-indigo-200 dark:border-indigo-700/50',
    coreSubjects: ['Aerodynamics', 'Flight Mechanics', 'Aircraft Structures', 'Propulsion Systems', 'Spacecraft Design'],
    keySkills: ['CATIA/NASTRAN', 'CFD Analysis', 'MATLAB/Simulink', 'Systems Engineering', 'Avionics'],
    averageSalary: '$85,000 - $145,000+',
    growth: '8% (As fast as average)',
    industries: ['Aerospace', 'Defense', 'Satellite Communications', 'Space Exploration', 'Aviation'],
    topCompanies: ['NASA', 'SpaceX', 'Boeing', 'Lockheed Martin', 'Blue Origin', 'Airbus'],
  },
  {
    id: 'biomedical',
    title: 'Biomedical Engineering',
    description: 'Apply engineering principles to healthcare and medical problems',
    icon: '🫀',
    color: 'from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30',
    borderColor: 'border-rose-200 dark:border-rose-700/50',
    coreSubjects: ['Biomechanics', 'Medical Imaging', 'Biomaterials', 'Physiological Systems', 'Bioinstrumentation'],
    keySkills: ['SolidWorks (Medical)', 'MATLAB for Biosignals', 'Regulatory Affairs', 'Medical Device Design', 'Tissue Engineering'],
    averageSalary: '$70,000 - $125,000+',
    growth: '10% (Faster than average)',
    industries: ['Medical Devices', 'Pharmaceuticals', 'Healthcare', 'Biotechnology', 'Research'],
    topCompanies: ['Medtronic', 'Johnson & Johnson', 'GE Healthcare', 'Siemens Healthineers', 'Philips'],
  },
];

const CareerPaths = ({ onBack, onStartSkillTest, onSelectCareerPath }) => {
  const handleCareerPathClick = (path) => {
    // Call the prop to navigate to specific career path page
    if (onSelectCareerPath) {
      onSelectCareerPath(path.id); // Pass the ID: 'computer', 'mechanical', 'electronics', etc.
    }
  };

  const handleAptitudeTestClick = () => {
    // Call the onStartSkillTest prop to trigger navigation
    if (onStartSkillTest) {
      onStartSkillTest({
        title: 'Engineering Aptitude Test',
        description: 'Find out which engineering field suits you best',
        type: 'aptitude-test'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950 dark:to-slate-900 text-gray-900 dark:text-white p-4 md:p-8 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzQuNXYtNGg0di02aC00di00aC02djRoLTR2NmgtNHY0aDZ6Ii8+PHBhdGggZD0iTTE0LjUgMTQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTM0LjUgMTQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTE0LjUgMzQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTM0LjUgMzQuNWgxMXYxMWgtMTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0LjV2LTRoNHYtNmgtNHYtNGgtNnY0aC00djZoNHY0aDZ6Ii8+PHBhdGggZD0iTTE0LjUgMTQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTM0LjUgMTQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTE0LjUgMzQuNWgxMXYxMWgtMTF6Ii8+PHBhdGggZD0iTTM0LjUgMzQuNWgxMXYxMWgtMTF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white mb-8 group transition-all duration-300 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700/50 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Engineering Career Paths
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover various engineering disciplines, required skills, and career opportunities
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700">
            <span className="text-cyan-600 dark:text-cyan-400">⚙️</span>
            <span className="text-sm text-gray-600 dark:text-slate-300">{engineeringCareerPaths.length} Engineering Disciplines</span>
          </div>
        </div>

        {/* Engineering Career Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {engineeringCareerPaths.map((path, index) => (
            <div
              key={path.id}
              onClick={() => handleCareerPathClick(path)}
              className={`
                bg-gradient-to-br ${path.color} ${path.borderColor}
                rounded-xl cursor-pointer transform transition-all duration-300 
                hover:shadow-lg dark:hover:shadow-xl hover:scale-[1.02]
                p-6 h-full flex flex-col border backdrop-blur-sm
                hover:border-opacity-100 dark:hover:border-opacity-100
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{path.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{path.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{path.description}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full text-gray-700 dark:text-slate-300">
                  {path.growth.split(' ')[0]}
                </span>
              </div>
              
              {/* Core Subjects */}
              <div className="mb-4 flex-grow">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Core Subjects:</h4>
                <div className="flex flex-wrap gap-2">
                  {path.coreSubjects.slice(0, 3).map((subject) => (
                    <span 
                      key={subject} 
                      className="text-xs bg-white/80 dark:bg-black/40 px-2 py-1 rounded border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300"
                    >
                      {subject}
                    </span>
                  ))}
                  {path.coreSubjects.length > 3 && (
                    <span className="text-xs bg-white/80 dark:bg-black/40 px-2 py-1 rounded text-gray-600 dark:text-slate-400">
                      +{path.coreSubjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Key Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {path.keySkills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs bg-white dark:bg-white/10 px-2 py-1 rounded text-gray-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/20">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-600 dark:text-yellow-400">💰</span>
                    <span className="text-gray-700 dark:text-slate-300">{path.averageSalary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 dark:text-green-400">📈</span>
                    <span className="text-gray-700 dark:text-slate-300">{path.growth}</span>
                  </div>
                </div>
                
                {/* Industries */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Top Industries:</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-400">
                    {path.industries.slice(0, 3).join(' • ')}
                  </p>
                </div>
                
                {/* Explore Button */}
                <button 
                  onClick={() => handleCareerPathClick(path)}
                  className="w-full mt-4 py-2 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] border border-gray-300 dark:border-white/20"
                >
                  Explore {path.title.split(' ')[0]} Path →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Career Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Engineering Fundamentals */}
          <div className="bg-white/80 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">📚</span> Common Engineering Fundamentals
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span> Mathematics & Physics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span> Engineering Drawing/CAD
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span> Project Management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span> Technical Communication
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span> Problem Solving & Analysis
              </li>
            </ul>
          </div>

          {/* Career Paths Comparison */}
          <div className="bg-blue-50/80 dark:bg-blue-900/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-700/50">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <span className="text-cyan-600 dark:text-cyan-400">📊</span> Engineering Career Trends
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-slate-300">
                  <span>Computer Engineering</span>
                  <span className="text-green-600 dark:text-green-400">High Demand</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-slate-300">
                  <span>Automobile (EV)</span>
                  <span className="text-blue-600 dark:text-blue-400">Rapid Growth</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-slate-300">
                  <span>Aerospace</span>
                  <span className="text-yellow-600 dark:text-yellow-400">Steady Growth</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-purple-50/80 dark:bg-purple-900/30 p-6 rounded-2xl border border-purple-100 dark:border-purple-700/50">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <span className="text-purple-600 dark:text-purple-400">💡</span> Engineering Career Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span>🛠️</span>
                <span>Gain practical experience through internships</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📜</span>
                <span>Obtain relevant certifications (PE, AWS, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🤝</span>
                <span>Network at engineering conferences and events</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>Stay updated with latest technologies</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🎯</span>
                <span>Specialize in emerging fields (AI, EV, Renewable Energy)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Not sure which engineering field suits you? Take our engineering aptitude test
          </p>
          <button 
            onClick={handleAptitudeTestClick}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>⚡</span>
            Take Engineering Aptitude Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;