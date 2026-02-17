import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function ElectronicsEngineering({ onBack }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showJobRecommendations, setShowJobRecommendations] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [selectedJobForTest, setSelectedJobForTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const findJobRecommendations = () => {
    const selectedInterests = Array.from(document.querySelectorAll('.interest-checkbox:checked'))
      .map(cb => cb.parentElement.querySelector('.interest-label').textContent);

    const userExperience = document.querySelector('.experience-radio:checked')?.parentElement?.querySelector('.experience-level')?.textContent || '';

    setSelectedExperience(userExperience);

    const matchedJobs = [];

    // Map experience levels for job matching
    const experienceMapping = {
      'Student (Intern)': 'Student',
      'Junior': 'Junior'
    };

    const targetExperienceLevel = experienceMapping[userExperience] || userExperience;
    const isBeginnerLevel = targetExperienceLevel === 'Student';

    selectedInterests.forEach(interest => {
      if (jobRolesData[interest]) {
        jobRolesData[interest].forEach(job => {
          if (job.experienceLevel === targetExperienceLevel) {
            const matchingSkills = job.skillsRequired.filter(skill => 
              selectedSkills.includes(skill)
            );
            const matchPercentage = (matchingSkills.length / job.skillsRequired.length) * 100;
            const threshold = isBeginnerLevel ? 20 : 30;

            if (matchPercentage >= threshold) {
              matchedJobs.push({
                ...job,
                careerPath: interest,
                matchPercentage: Math.round(matchPercentage),
                matchingSkills,
                missingSkills: job.skillsRequired.filter(skill => !selectedSkills.includes(skill)),
                originalExperienceLevel: job.experienceLevel
              });
            }
          }
        });
      }
    });

    // Ensure at least 3 matches for Student
    if (isBeginnerLevel && matchedJobs.length < 3) {
      const additionalJobs = [];
      selectedInterests.forEach(interest => {
        if (jobRolesData[interest]) {
          jobRolesData[interest].forEach(job => {
            if (job.experienceLevel === targetExperienceLevel) {
              const alreadyIncluded = matchedJobs.some(matchedJob => 
                matchedJob.role === job.role && matchedJob.careerPath === interest
              );
              if (!alreadyIncluded) {
                const matchingSkills = job.skillsRequired.filter(skill => 
                  selectedSkills.includes(skill)
                );
                const matchPercentage = (matchingSkills.length / job.skillsRequired.length) * 100;
                if (matchPercentage >= 10) {
                  additionalJobs.push({
                    ...job,
                    careerPath: interest,
                    matchPercentage: Math.round(matchPercentage),
                    matchingSkills,
                    missingSkills: job.skillsRequired.filter(skill => !selectedSkills.includes(skill)),
                    originalExperienceLevel: job.experienceLevel
                  });
                }
              }
            }
          });
        }
      });

      additionalJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
      const neededJobs = 3 - matchedJobs.length;
      const topAdditionalJobs = additionalJobs.slice(0, neededJobs);

      const allJobs = [...matchedJobs, ...topAdditionalJobs];
      allJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
      setRecommendedJobs(allJobs);
    } else {
      setRecommendedJobs(matchedJobs);
    }
    
    setShowJobRecommendations(true);
  };

  const jobRolesData = {
    "Analog & Digital Circuit Design": [
      { role: "Circuit Design Intern", experienceLevel: "Student", skillsRequired: ["Analog Circuit Design", "Digital Logic Design", "PCB Basics", "SPICE Simulation"] },
      { role: "PCB Design Intern", experienceLevel: "Student", skillsRequired: ["PCB Layout", "Eagle/Altium Basics", "Schematic Design", "Component Selection"] },
      { role: "Mixed-Signal Design Intern", experienceLevel: "Student", skillsRequired: ["Analog Circuits", "Digital Circuits", "Signal Integrity Basics", "Simulation Tools"] },
      { role: "Analog Design Engineer", experienceLevel: "Junior", skillsRequired: ["Analog Circuit Design", "SPICE Simulation", "PCB Layout", "Signal Integrity", "Filter Design", "Op-Amp Circuits"] },
      { role: "Digital Design Engineer", experienceLevel: "Junior", skillsRequired: ["Digital Logic Design", "VHDL/Verilog", "FPGA Programming", "Timing Analysis", "Test Benches"] },
      { role: "PCB Design Engineer", experienceLevel: "Junior", skillsRequired: ["Altium Designer", "PCB Layout", "High-Speed Design", "Signal Integrity", "EMI/EMC Compliance", "DFM"] }
    ],
    "Embedded Systems & IoT": [
      { role: "Embedded Systems Intern", experienceLevel: "Student", skillsRequired: ["C/C++", "Microcontroller Basics", "Arduino", "Sensor Integration"] },
      { role: "IoT Development Intern", experienceLevel: "Student", skillsRequired: ["Embedded C", "Wireless Protocols Basics", "Sensor Networks", "Cloud Integration Basics"] },
      { role: "RTOS Intern", experienceLevel: "Student", skillsRequired: ["Real-Time Systems", "C Programming", "Task Scheduling", "Memory Management"] },
      { role: "Embedded Software Engineer", experienceLevel: "Junior", skillsRequired: ["C/C++", "ARM Cortex-M", "RTOS", "Device Drivers", "Communication Protocols", "Debugging Tools"] },
      { role: "IoT Engineer", experienceLevel: "Junior", skillsRequired: ["Embedded Systems", "MQTT", "LoRa/WiFi/BLE", "Cloud Platforms", "Sensor Networks", "Power Management"] },
      { role: "Firmware Engineer", experienceLevel: "Junior", skillsRequired: ["C/C++", "Microcontrollers", "Bootloaders", "Hardware Testing", "Communication Protocols", "Version Control"] }
    ],
    "Power Electronics": [
      { role: "Power Electronics Intern", experienceLevel: "Student", skillsRequired: ["Power Supply Basics", "Converters", "Magnetics Basics", "Thermal Management"] },
      { role: "Renewable Energy Intern", experienceLevel: "Student", skillsRequired: ["Solar Systems", "Battery Management", "Power Conversion", "Energy Storage"] },
      { role: "Motor Control Intern", experienceLevel: "Student", skillsRequired: ["Motor Drives", "Power Electronics", "Control Theory Basics", "Simulation"] },
      { role: "Power Supply Design Engineer", experienceLevel: "Junior", skillsRequired: ["SMPS Design", "Magnetics Design", "Thermal Analysis", "EMI Filtering", "Safety Standards", "Prototyping"] },
      { role: "Motor Control Engineer", experienceLevel: "Junior", skillsRequired: ["Motor Drives", "Power Electronics", "Control Algorithms", "DSP Programming", "Sensor Integration", "Simulation"] },
      { role: "BMS Engineer", experienceLevel: "Junior", skillsRequired: ["Battery Management", "Cell Balancing", "State Estimation", "Safety Systems", "Communication Protocols", "Testing"] }
    ],
    "VLSI & Semiconductor": [
      { role: "VLSI Intern", experienceLevel: "Student", skillsRequired: ["Digital Design", "Verilog Basics", "ASIC Flow", "Simulation Tools"] },
      { role: "Semiconductor Intern", experienceLevel: "Student", skillsRequired: ["Semiconductor Physics", "Device Characterization", "Lab Equipment", "Data Analysis"] },
      { role: "ASIC Intern", experienceLevel: "Student", skillsRequired: ["ASIC Design Flow", "Verilog/VHDL", "Synthesis Basics", "Timing Analysis"] },
      { role: "ASIC Design Engineer", experienceLevel: "Junior", skillsRequired: ["Verilog/VHDL", "ASIC Design Flow", "Synthesis", "Static Timing Analysis", "Formal Verification", "Low Power Design"] },
      { role: "Physical Design Engineer", experienceLevel: "Junior", skillsRequired: ["Place & Route", "Timing Closure", "Power Analysis", "DRC/LVS", "Physical Verification", "Tcl Scripting"] },
      { role: "Verification Engineer", experienceLevel: "Junior", skillsRequired: ["SystemVerilog", "UVM", "Testbench Development", "Coverage Analysis", "Assertion Based Verification", "Debugging"] }
    ],
    "RF & Wireless Communication": [
      { role: "RF Engineering Intern", experienceLevel: "Student", skillsRequired: ["RF Fundamentals", "Antenna Basics", "Network Analyzer", "Spectrum Analyzer"] },
      { role: "Wireless Systems Intern", experienceLevel: "Student", skillsRequired: ["Communication Theory", "Modulation Schemes", "Wireless Protocols", "Lab Testing"] },
      { role: "Microwave Engineering Intern", experienceLevel: "Student", skillsRequired: ["Microwave Theory", "Transmission Lines", "RF Components", "Simulation Software"] },
      { role: "RF Design Engineer", experienceLevel: "Junior", skillsRequired: ["RF Circuit Design", "Impedance Matching", "Network Analyzers", "EM Simulation", "PCB Layout", "Component Selection"] },
      { role: "Antenna Engineer", experienceLevel: "Junior", skillsRequired: ["Antenna Design", "EM Simulation", "Radiation Patterns", "Measurement Techniques", "Wireless Standards", "Prototyping"] },
      { role: "Wireless Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Communication Systems", "Modulation Schemes", "Link Budget", "Protocol Testing", "System Integration", "Troubleshooting"] }
    ],
    "Control Systems & Automation": [
      { role: "Control Systems Intern", experienceLevel: "Student", skillsRequired: ["Control Theory", "MATLAB/Simulink", "PID Control", "System Modeling"] },
      { role: "Robotics Intern", experienceLevel: "Student", skillsRequired: ["Robotics Basics", "Sensors & Actuators", "Microcontrollers", "Basic Programming"] },
      { role: "Automation Intern", experienceLevel: "Student", skillsRequired: ["PLC Basics", "Industrial Networks", "HMI Programming", "Process Control"] },
      { role: "Control Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Control Theory", "MATLAB/Simulink", "PID Tuning", "System Identification", "Hardware Implementation", "Stability Analysis"] },
      { role: "Robotics Engineer", experienceLevel: "Junior", skillsRequired: ["ROS", "Motion Planning", "Sensor Fusion", "Actuator Control", "Computer Vision Basics", "Embedded Systems"] },
      { role: "Automation Engineer", experienceLevel: "Junior", skillsRequired: ["PLC Programming", "SCADA Systems", "Industrial Networks", "HMI Development", "Process Automation", "Safety Systems"] }
    ],
    "Medical Electronics": [
      { role: "Medical Device Intern", experienceLevel: "Student", skillsRequired: ["Biomedical Sensors", "Signal Processing Basics", "Safety Standards", "Prototyping"] },
      { role: "Biomedical Intern", experienceLevel: "Student", skillsRequired: ["Medical Instrumentation", "ECG/EEG Basics", "Data Acquisition", "Quality Systems"] },
      { role: "Healthcare IoT Intern", experienceLevel: "Student", skillsRequired: ["Wearable Devices", "Wireless Health Monitoring", "Sensor Integration", "Data Security"] },
      { role: "Medical Device Engineer", experienceLevel: "Junior", skillsRequired: ["Medical Standards", "Signal Processing", "Patient Safety", "EMC Compliance", "Testing Protocols", "Documentation"] },
      { role: "Biomedical Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Medical Imaging", "Diagnostic Equipment", "Regulatory Compliance", "System Integration", "Clinical Testing", "Risk Management"] }
    ],
    "Test & Measurement": [
      { role: "Test Engineering Intern", experienceLevel: "Student", skillsRequired: ["Oscilloscope", "Multimeter", "Signal Generator", "Basic Test Procedures"] },
      { role: "Validation Intern", experienceLevel: "Student", skillsRequired: ["Test Equipment", "Data Collection", "Quality Checks", "Documentation"] },
      { role: "Hardware Test Intern", experienceLevel: "Student", skillsRequired: ["Hardware Testing", "Debugging", "Test Scripts", "LabVIEW Basics"] },
      { role: "Test Engineer", experienceLevel: "Junior", skillsRequired: ["Test Equipment", "Automated Testing", "LabVIEW/Python", "Test Fixtures", "Data Analysis", "Debugging"] },
      { role: "Validation Engineer", experienceLevel: "Junior", skillsRequired: ["Design Validation", "Environmental Testing", "Reliability Testing", "Compliance Testing", "Test Reports", "Root Cause Analysis"] }
    ],
    "Consumer Electronics": [
      { role: "Consumer Electronics Intern", experienceLevel: "Student", skillsRequired: ["Product Design Basics", "User Interface", "Cost Analysis", "Market Research"] },
      { role: "Audio/Video Intern", experienceLevel: "Student", skillsRequired: ["Audio Circuits", "Video Processing", "Signal Chain", "Quality Testing"] },
      { role: "Wearable Tech Intern", experienceLevel: "Student", skillsRequired: ["Low Power Design", "Sensor Integration", "Wireless Connectivity", "User Experience"] },
      { role: "Product Design Engineer", experienceLevel: "Junior", skillsRequired: ["Consumer Electronics", "Cost Optimization", "Manufacturing Processes", "User Interface", "Regulatory Compliance", "Product Lifecycle"] },
      { role: "Audio/Video Engineer", experienceLevel: "Junior", skillsRequired: ["Audio Processing", "Video Systems", "Signal Integrity", "Quality Testing", "System Integration", "Troubleshooting"] }
    ],
    "Automotive Electronics": [
      { role: "Automotive Electronics Intern", experienceLevel: "Student", skillsRequired: ["Automotive Systems", "CAN Basics", "Safety Standards", "Vehicle Electronics"] },
      { role: "EV Systems Intern", experienceLevel: "Student", skillsRequired: ["Electric Vehicles", "Battery Systems", "Power Electronics", "Charging Systems"] },
      { role: "ADAS Intern", experienceLevel: "Student", skillsRequired: ["Advanced Driver Systems", "Sensor Fusion", "Control Systems", "Safety Critical"] },
      { role: "Automotive Electronics Engineer", experienceLevel: "Junior", skillsRequired: ["CAN/LIN/Ethernet", "Functional Safety", "EMC Compliance", "Vehicle Systems", "Diagnostics", "Testing"] },
      { role: "EV Powertrain Engineer", experienceLevel: "Junior", skillsRequired: ["Traction Inverters", "BMS", "Charging Systems", "Thermal Management", "Safety Systems", "Vehicle Integration"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Circuit Design & Analysis",
      color: "blue",
      skills: [
        'Analog Circuit Design', 'Digital Logic Design', 'Mixed-Signal Design', 'PCB Layout',
        'SPICE Simulation', 'Signal Integrity', 'Power Integrity', 'EMI/EMC Design',
        'Filter Design', 'Oscillator Design', 'Amplifier Design', 'RF Circuit Design',
        'High-Speed Design', 'Impedance Matching', 'Transmission Lines'
      ]
    },
    {
      id: 2,
      title: "Embedded Systems & Programming",
      color: "green",
      skills: [
        'C/C++', 'ARM Cortex-M', 'RTOS', 'Device Drivers', 'Microcontrollers',
        'FPGA Programming', 'VHDL/Verilog', 'Embedded Linux', 'Bootloaders',
        'Communication Protocols', 'DSP Programming', 'Assembly Language',
        'Python for Embedded', 'Real-Time Systems', 'Memory Management'
      ]
    },
    {
      id: 3,
      title: "Power & Energy Systems",
      color: "purple",
      skills: [
        'Power Electronics', 'SMPS Design', 'Converters (DC-DC, AC-DC)', 'Inverters',
        'Battery Management', 'Renewable Energy', 'Motor Control', 'Power Supply Design',
        'Magnetics Design', 'Thermal Management', 'Energy Storage', 'Grid Systems',
        'Charging Systems', 'Power Quality', 'Safety Standards'
      ]
    },
    {
      id: 4,
      title: "VLSI & Semiconductor",
      color: "orange",
      skills: [
        'ASIC Design', 'Physical Design', 'Verification', 'SystemVerilog', 'UVM',
        'Static Timing Analysis', 'Synthesis', 'Place & Route', 'Low Power Design',
        'DFT', 'Semiconductor Physics', 'Device Characterization', 'Analog Layout',
        'Memory Design', 'SoC Integration'
      ]
    },
    {
      id: 5,
      title: "RF & Communication Systems",
      color: "red",
      skills: [
        'RF Design', 'Antenna Design', 'Wireless Systems', 'Microwave Engineering',
        'Communication Theory', 'Modulation Schemes', 'SDR', 'Network Analyzers',
        'Spectrum Analyzers', 'Satellite Systems', 'Radar Systems', '5G/6G',
        'IoT Protocols', 'Bluetooth/WiFi', 'Cellular Systems'
      ]
    },
    {
      id: 6,
      title: "Tools & Test Equipment",
      color: "teal",
      skills: [
        'Altium Designer', 'Cadence', 'MATLAB/Simulink', 'LabVIEW', 'OrCAD',
        'HFSS/CST', 'ADS', 'Oscilloscope', 'Logic Analyzer', 'Multimeter',
        'Signal Generator', 'Power Analyzer', 'Network Analyzer', 'Spectrum Analyzer',
        'Thermal Camera', 'EMI Test Equipment', 'Automated Test Equipment'
      ]
    },
    {
      id: 7,
      title: "Control & Automation",
      color: "blue",
      skills: [
        'Control Theory', 'PID Control', 'PLC Programming', 'SCADA', 'Industrial Networks',
        'Robotics', 'ROS', 'Motion Control', 'Sensor Fusion', 'Machine Vision',
        'Process Automation', 'HMI Development', 'Safety Systems', 'System Identification',
        'State Estimation'
      ]
    },
    {
      id: 8,
      title: "Industry Standards & Protocols",
      color: "green",
      skills: [
        'I2C/SPI/UART', 'CAN/LIN/Ethernet', 'USB', 'PCIe', 'MIPI',
        'Functional Safety', 'ISO Standards', 'EMC Compliance', 'Medical Standards',
        'Automotive Standards', 'Quality Systems', 'Risk Management', 'DFMEA',
        'Regulatory Compliance', 'Certification Processes'
      ]
    }
  ];

  // Remove duplicates and sort alphabetically
  const processedCategories = skillCategories.map(category => ({
    ...category,
    skills: [...new Set(category.skills)].sort()
  }));

  const colorBadges = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    teal: 'bg-teal-500'
  };

  if (selectedRoadmap) {
    return <RoadmapViewer role={selectedRoadmap} onBack={() => setSelectedRoadmap(null)} />;
  }

  return (
    <div className="skills-container">
      <div className="skills-content">
        <button onClick={onBack} className="return-btn">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Career Paths</span>
        </button>

        <div className="skills-header">
          <h2 className="skills-title">Electronics Engineering Career Path</h2>
          <p className="skills-subtitle">
            Design and innovate with electronics. Select your skills to discover hardware, embedded systems, and semiconductor engineering roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Electronics Engineering Skills
          </h3>
          {processedCategories.map((category) => (
            <div key={category.id} className="skill-category">
              <h4 className="category-header">
                <span className={`category-badge ${colorBadges[category.color]}`}>{category.id}</span>
                {category.title}
              </h4>
              <div className="skills-grid">
                {category.skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-btn ${category.color} ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="selected-skills">
            <h5 className="selected-skills-title">Your Selected Skills ({selectedSkills.length})</h5>
            <div className="selected-skills-list">
              {selectedSkills.length > 0 ? (
                selectedSkills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                    <button onClick={() => toggleSkill(skill)} className="remove-btn">×</button>
                  </span>
                ))
              ) : (
                <span className="no-skills">No skills selected yet. Click on skills above to add them.</span>
              )}
            </div>
          </div>
        </div>

        {/* Interests Input */}
        <div className="interests-card">
          <h3 className="section-title">
            <span className="title-badge" style={{background: 'linear-gradient(135deg, #10b981, #047857)'}}>2</span>
            Electronics Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which electronics engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Analog & Digital Circuit Design', 'Embedded Systems & IoT', 'Power Electronics',
                'VLSI & Semiconductor', 'RF & Wireless Communication', 'Control Systems & Automation',
                'Medical Electronics', 'Test & Measurement', 'Consumer Electronics', 'Automotive Electronics'
              ].map((interest) => (
                <label key={interest} className="interest-item">
                  <input type="checkbox" className="interest-checkbox" />
                  <span className="interest-label">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="experience-card">
          <h3 className="section-title">
            <span className="title-badge" style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>3</span>
            Your Experience Level
          </h3>
          <div className="experience-grid">
            {[
              { level: 'Student', desc: 'Just starting out\nLearning fundamentals' },
              { level: 'Junior', desc: '0-2 years experience\nBuilding real projects' }
            ].map(({ level, desc }) => (
              <label key={level} className="experience-item">
                <input type="radio" name="experience" className="experience-radio" />
                <span className="experience-level">{level === 'Student' ? 'Student (Intern)' : level}</span>
                <span className="experience-desc" style={{whiteSpace: 'pre-line'}}>{desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button 
            onClick={findJobRecommendations}
            className="submit-btn"
            disabled={selectedSkills.length === 0}
            style={{
              opacity: selectedSkills.length === 0 ? 0.6 : 1,
              cursor: selectedSkills.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Analyze My Electronics Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable electronics engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Electronics Engineering Roles</h3>
            {recommendedJobs.length > 0 ? (
              <div className="jobs-grid">
                {recommendedJobs.map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-header">
                      <h4 className="job-role">{job.role}</h4>
                      <span className={`match-badge ${
                        job.matchPercentage >= 70 ? 'high-match' : 
                        job.matchPercentage >= 50 ? 'medium-match' : 'low-match'
                      }`}>
                        {job.matchPercentage}% Match
                      </span>
                    </div>
                    <div className="job-details">
                      <div className="job-meta">
                        <span className="career-path">{job.careerPath}</span>
                        <span className="experience-level">{job.originalExperienceLevel}</span>
                      </div>
                      <div className="skills-section">
                        <h5>Your Matching Skills ({job.matchingSkills.length}/{job.skillsRequired.length})</h5>
                        <div className="skills-list">
                          {job.matchingSkills.map(skill => (
                            <span key={skill} className="skill-match">{skill}</span>
                          ))}
                        </div>
                      </div>
                      {job.missingSkills.length > 0 && (
                        <div className="skills-section">
                          <h5>Skills to Learn</h5>
                          <div className="skills-list">
                            {job.missingSkills.map(skill => (
                              <span key={skill} className="skill-missing">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="job-card-actions">
                        <button onClick={() => setSelectedRoadmap(job.role)} className="roadmap-button">
                          <span className="button-icon"></span>
                          View Learning Roadmap
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedJobForTest(job);
                            setIsTestModalOpen(true);
                          }} 
                          className="test-skills-button"
                        >
                          Test Your Skills
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-jobs">
                <p>No job matches found for your selected skills and experience level.</p>
                <p>Try selecting more skills or a different experience level.</p>
              </div>
            )}
            <div className="job-actions">
              <button onClick={() => setShowJobRecommendations(false)} className="back-to-skills-btn">
                ← Back to Skills
              </button>
            </div>
          </div>
        )}

        <button onClick={onBack} className="bottom-return-btn">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Career Paths</span>
        </button>
      </div>

      {isTestModalOpen && selectedJobForTest && (
        <SkillTestModal
          job={selectedJobForTest}
          isOpen={isTestModalOpen}
          onClose={() => {
            setIsTestModalOpen(false);
            setSelectedJobForTest(null);
          }}
          onTestComplete={(results) => {
            console.log('Test completed:', results);
            // Handle results here
          }}
        />
      )}
    </div>
  );
}