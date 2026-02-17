import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function AerospaceEngineering({ onBack }) {
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
    "Aircraft Design & Aerodynamics": [
      { role: "Aerodynamics Intern", experienceLevel: "Student", skillsRequired: ["Aerodynamics Basics", "CFD Basics", "Wind Tunnel Testing", "Flow Analysis"] },
      { role: "Aircraft Design Intern", experienceLevel: "Student", skillsRequired: ["CAD Basics", "Aircraft Configuration", "Design Principles", "Performance Analysis"] },
      { role: "Flight Test Intern", experienceLevel: "Student", skillsRequired: ["Flight Test Basics", "Data Collection", "Instrumentation", "Safety Procedures"] },
      { role: "Aerodynamics Engineer", experienceLevel: "Junior", skillsRequired: ["CFD Analysis", "Wind Tunnel Testing", "Drag Reduction", "Stability Analysis", "Performance Prediction", "Flow Control"] },
      { role: "Aircraft Design Engineer", experienceLevel: "Junior", skillsRequired: ["Aircraft Configuration", "Weight Analysis", "Performance Optimization", "CAD Modeling", "Design Integration", "Trade Studies"] },
      { role: "Flight Test Engineer", experienceLevel: "Junior", skillsRequired: ["Test Planning", "Data Analysis", "Instrumentation", "Safety Procedures", "Report Writing", "Regulatory Compliance"] }
    ],
    "Structures & Materials": [
      { role: "Structural Analysis Intern", experienceLevel: "Student", skillsRequired: ["FEA Basics", "Stress Analysis", "Material Properties", "Load Analysis"] },
      { role: "Composite Materials Intern", experienceLevel: "Student", skillsRequired: ["Composite Basics", "Manufacturing Methods", "Testing Procedures", "Material Selection"] },
      { role: "Fatigue & Damage Tolerance Intern", experienceLevel: "Student", skillsRequired: ["Fatigue Basics", "Crack Growth", "Inspection Methods", "Life Prediction"] },
      { role: "Structural Analysis Engineer", experienceLevel: "Junior", skillsRequired: ["Finite Element Analysis", "Stress Analysis", "Dynamic Analysis", "Fatigue Analysis", "Damage Tolerance", "Certification Support"] },
      { role: "Composite Engineer", experienceLevel: "Junior", skillsRequired: ["Composite Design", "Manufacturing Processes", "Testing Methods", "Repair Techniques", "Quality Control", "Cost Analysis"] },
      { role: "Damage Tolerance Engineer", experienceLevel: "Junior", skillsRequired: ["Crack Growth Analysis", "Inspection Planning", "Life Extension", "Risk Assessment", "Maintenance Planning", "Regulatory Compliance"] }
    ],
    "Propulsion Systems": [
      { role: "Propulsion Intern", experienceLevel: "Student", skillsRequired: ["Engine Basics", "Thermodynamics", "Performance Analysis", "Testing Methods"] },
      { role: "Gas Turbine Intern", experienceLevel: "Student", skillsRequired: ["Turbomachinery", "Combustion", "Heat Transfer", "System Integration"] },
      { role: "Rocket Propulsion Intern", experienceLevel: "Student", skillsRequired: ["Rocket Basics", "Propellant Systems", "Nozzle Design", "Testing Procedures"] },
      { role: "Propulsion Engineer", experienceLevel: "Junior", skillsRequired: ["Engine Performance", "Thermodynamic Analysis", "System Integration", "Testing Procedures", "Emissions Control", "Certification"] },
      { role: "Gas Turbine Engineer", experienceLevel: "Junior", skillsRequired: ["Compressor Design", "Combustion Analysis", "Turbine Cooling", "Performance Optimization", "Durability Analysis", "Maintenance Planning"] },
      { role: "Rocket Propulsion Engineer", experienceLevel: "Junior", skillsRequired: ["Propellant Systems", "Combustion Chamber Design", "Nozzle Optimization", "Thrust Vector Control", "Testing Procedures", "Safety Systems"] }
    ],
    "Avionics & Flight Control Systems": [
      { role: "Avionics Intern", experienceLevel: "Student", skillsRequired: ["Avionics Basics", "Electronic Systems", "Testing Methods", "Safety Standards"] },
      { role: "Flight Control Intern", experienceLevel: "Student", skillsRequired: ["Control Theory", "Flight Dynamics", "Simulation Basics", "System Integration"] },
      { role: "Navigation Systems Intern", experienceLevel: "Student", skillsRequired: ["GPS Systems", "Inertial Navigation", "Sensor Fusion", "Accuracy Analysis"] },
      { role: "Avionics Engineer", experienceLevel: "Junior", skillsRequired: ["System Integration", "Hardware Design", "Software Integration", "Testing Procedures", "Certification", "Maintenance Planning"] },
      { role: "Flight Control Engineer", experienceLevel: "Junior", skillsRequired: ["Control Laws", "Stability Analysis", "Handling Qualities", "System Integration", "Testing Procedures", "Certification Support"] },
      { role: "Navigation Systems Engineer", experienceLevel: "Junior", skillsRequired: ["GPS/INS Integration", "Sensor Fusion", "Navigation Algorithms", "Accuracy Analysis", "System Testing", "Certification"] }
    ],
    "Space Systems & Satellite Engineering": [
      { role: "Space Systems Intern", experienceLevel: "Student", skillsRequired: ["Space Environment", "Orbital Mechanics", "Satellite Basics", "Mission Design"] },
      { role: "Satellite Design Intern", experienceLevel: "Student", skillsRequired: ["Satellite Systems", "Payload Integration", "Power Systems", "Thermal Control"] },
      { role: "Launch Systems Intern", experienceLevel: "Student", skillsRequired: ["Launch Vehicles", "Propulsion Systems", "Separation Systems", "Trajectory Analysis"] },
      { role: "Spacecraft Systems Engineer", experienceLevel: "Junior", skillsRequired: ["System Integration", "Subsystem Design", "Mission Analysis", "Testing Procedures", "Launch Operations", "Mission Operations"] },
      { role: "Satellite Engineer", experienceLevel: "Junior", skillsRequired: ["Payload Integration", "Power Systems", "Thermal Control", "Attitude Control", "Communication Systems", "Ground Segment"] },
      { role: "Launch Vehicle Engineer", experienceLevel: "Junior", skillsRequired: ["Vehicle Integration", "Propulsion Systems", "Structural Design", "Trajectory Optimization", "Launch Operations", "Recovery Systems"] }
    ],
    "Systems Engineering & Integration": [
      { role: "Systems Engineering Intern", experienceLevel: "Student", skillsRequired: ["Systems Thinking", "Requirements Analysis", "Interface Management", "Documentation"] },
      { role: "Integration & Test Intern", experienceLevel: "Student", skillsRequired: ["Integration Methods", "Test Procedures", "Data Collection", "Problem Resolution"] },
      { role: "Configuration Management Intern", experienceLevel: "Student", skillsRequired: ["Change Control", "Document Management", "Version Control", "Quality Systems"] },
      { role: "Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Requirements Management", "System Architecture", "Interface Control", "Verification Planning", "Risk Management", "Trade Studies"] },
      { role: "Integration & Test Engineer", experienceLevel: "Junior", skillsRequired: ["Integration Planning", "Test Procedure Development", "Problem Resolution", "Data Analysis", "Report Writing", "Certification Support"] },
      { role: "Configuration Management Specialist", experienceLevel: "Junior", skillsRequired: ["Change Management", "Document Control", "Baseline Management", "Audit Support", "Quality Assurance", "Process Improvement"] }
    ],
    "Manufacturing & Assembly": [
      { role: "Aerospace Manufacturing Intern", experienceLevel: "Student", skillsRequired: ["Manufacturing Processes", "Assembly Methods", "Quality Basics", "Safety Procedures"] },
      { role: "Composite Manufacturing Intern", experienceLevel: "Student", skillsRequired: ["Composite Fabrication", "Autoclave Processes", "Lay-up Techniques", "Quality Control"] },
      { role: "Tooling Design Intern", experienceLevel: "Student", skillsRequired: ["Tool Design", "Fixturing", "CAD Modeling", "Manufacturing Methods"] },
      { role: "Manufacturing Engineer", experienceLevel: "Junior", skillsRequired: ["Process Planning", "Lean Manufacturing", "Quality Systems", "Cost Analysis", "Tooling Design", "Continuous Improvement"] },
      { role: "Composite Manufacturing Engineer", experienceLevel: "Junior", skillsRequired: ["Composite Fabrication", "Curing Processes", "Non-destructive Testing", "Quality Control", "Repair Techniques", "Process Optimization"] },
      { role: "Assembly Engineer", experienceLevel: "Junior", skillsRequired: ["Assembly Planning", "Jig & Fixture Design", "Quality Control", "Process Optimization", "Team Leadership", "Schedule Management"] }
    ],
    "Mission Operations & Support": [
      { role: "Mission Operations Intern", experienceLevel: "Student", skillsRequired: ["Orbital Mechanics", "Ground Systems", "Operations Planning", "Data Analysis"] },
      { role: "Flight Operations Intern", experienceLevel: "Student", skillsRequired: ["Flight Planning", "Weather Analysis", "Regulatory Requirements", "Safety Procedures"] },
      { role: "Maintenance Engineering Intern", experienceLevel: "Student", skillsRequired: ["Maintenance Procedures", "Reliability Analysis", "Technical Documentation", "Safety Standards"] },
      { role: "Mission Operations Engineer", experienceLevel: "Junior", skillsRequired: ["Mission Planning", "Orbit Analysis", "Ground Operations", "Anomaly Resolution", "Procedure Development", "Team Training"] },
      { role: "Flight Operations Engineer", experienceLevel: "Junior", skillsRequired: ["Flight Planning", "Performance Analysis", "Weather Analysis", "Regulatory Compliance", "Safety Management", "Operations Optimization"] },
      { role: "Maintenance Engineer", experienceLevel: "Junior", skillsRequired: ["Maintenance Planning", "Reliability Analysis", "Technical Documentation", "Spare Parts Management", "Safety Compliance", "Cost Control"] }
    ],
    "Quality & Certification": [
      { role: "Quality Engineering Intern", experienceLevel: "Student", skillsRequired: ["Quality Systems", "Inspection Methods", "Measurement Tools", "Documentation"] },
      { role: "Certification Intern", experienceLevel: "Student", skillsRequired: ["Regulatory Requirements", "Certification Processes", "Documentation", "Compliance Checking"] },
      { role: "Safety Engineering Intern", experienceLevel: "Student", skillsRequired: ["Safety Analysis", "Risk Assessment", "Safety Standards", "Documentation"] },
      { role: "Quality Engineer", experienceLevel: "Junior", skillsRequired: ["Quality Management Systems", "Statistical Process Control", "Inspection Methods", "Root Cause Analysis", "Corrective Actions", "Auditing"] },
      { role: "Certification Engineer", experienceLevel: "Junior", skillsRequired: ["Regulatory Compliance", "Certification Documentation", "Test Witnessing", "Airworthiness Certification", "Continued Airworthiness", "Regulatory Liaison"] },
      { role: "Safety Engineer", experienceLevel: "Junior", skillsRequired: ["Safety Analysis", "Risk Assessment", "Safety Management Systems", "Incident Investigation", "Safety Training", "Regulatory Compliance"] }
    ],
    "Research & Development": [
      { role: "Aerospace Research Intern", experienceLevel: "Student", skillsRequired: ["Research Methods", "Experimental Design", "Data Analysis", "Technical Writing"] },
      { role: "Advanced Concepts Intern", experienceLevel: "Student", skillsRequired: ["Concept Development", "Technology Assessment", "Feasibility Studies", "Innovation Methods"] },
      { role: "CFD Research Intern", experienceLevel: "Student", skillsRequired: ["CFD Software", "Model Development", "Simulation Setup", "Data Analysis"] },
      { role: "Research Engineer", experienceLevel: "Junior", skillsRequired: ["Experimental Design", "Data Analysis", "Technical Writing", "Grant Applications", "Collaborative Research", "Publication"] },
      { role: "Advanced Concepts Engineer", experienceLevel: "Junior", skillsRequired: ["Concept Development", "Technology Assessment", "Feasibility Studies", "Prototype Development", "Testing Procedures", "Technology Transfer"] },
      { role: "CFD Specialist", experienceLevel: "Junior", skillsRequired: ["Advanced CFD Modeling", "Turbulence Modeling", "Multi-physics Simulation", "Code Development", "Validation Methods", "High-performance Computing"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Aerodynamics & Fluid Dynamics",
      color: "blue",
      skills: [
        'Computational Fluid Dynamics', 'Wind Tunnel Testing', 'Aerodynamic Analysis',
        'Supersonic/Hypersonic Flow', 'Boundary Layer Theory', 'Vortex Lattice Method',
        'Panel Methods', 'Flow Control', 'Drag Reduction', 'Lift Enhancement',
        'Stability & Control', 'Aeroacoustics', 'CFD Software (ANSYS Fluent, Star-CCM+)',
        'Experimental Aerodynamics', 'Flow Visualization'
      ]
    },
    {
      id: 2,
      title: "Structural Analysis & Design",
      color: "green",
      skills: [
        'Finite Element Analysis', 'Stress Analysis', 'Vibration Analysis',
        'Fatigue & Damage Tolerance', 'Composite Structures', 'Buckling Analysis',
        'Crashworthiness', 'Aeroelasticity', 'Thermal-Structural Analysis',
        'FEM Software (NASTRAN, ABAQUS)', 'Structural Dynamics', 'Modal Analysis',
        'Fracture Mechanics', 'Structural Optimization', 'Lightweight Design'
      ]
    },
    {
      id: 3,
      title: "Propulsion & Power Systems",
      color: "purple",
      skills: [
        'Gas Turbine Engineering', 'Rocket Propulsion', 'Combustion Analysis',
        'Propeller Design', 'Electric Propulsion', 'Fuel Cell Systems',
        'Thermodynamics', 'Heat Transfer', 'Fluid Mechanics',
        'Propulsion System Integration', 'Nozzle Design', 'Turbomachinery',
        'Performance Analysis', 'Emissions Control', 'Alternative Fuels'
      ]
    },
    {
      id: 4,
      title: "Avionics & Control Systems",
      color: "orange",
      skills: [
        'Flight Control Systems', 'Guidance & Navigation', 'Autopilot Systems',
        'Sensor Fusion', 'Inertial Navigation Systems', 'GPS Technology',
        'Communication Systems', 'Radar Systems', 'Electronic Warfare',
        'DO-178C Software Standards', 'DO-254 Hardware Standards', 'System Integration',
        'Control Theory', 'Stability Analysis', 'Human-Machine Interface'
      ]
    },
    {
      id: 5,
      title: "Space Systems & Orbital Mechanics",
      color: "red",
      skills: [
        'Orbital Mechanics', 'Spacecraft Design', 'Satellite Systems',
        'Launch Vehicle Technology', 'Space Environment', 'Thermal Control Systems',
        'Attitude Determination & Control', 'Power Systems (Solar Arrays, Batteries)',
        'Propulsion Systems', 'Mission Design', 'Trajectory Optimization',
        'Space Debris Mitigation', 'Planetary Entry Systems', 'Space Mission Operations'
      ]
    },
    {
      id: 6,
      title: "CAD & Design Software",
      color: "teal",
      skills: [
        'CATIA', 'NX (Unigraphics)', 'SolidWorks', 'AutoCAD',
        'CREO Parametric', 'SIEMENS Teamcenter', 'CAD/CAE Integration',
        'Digital Mock-up', 'Configuration Management', 'PLM Systems',
        'Surface Modeling', 'Parametric Design', 'Assembly Design',
        'Drawing Standards', 'Model-based Definition'
      ]
    },
    {
      id: 7,
      title: "Materials & Manufacturing",
      color: "blue",
      skills: [
        'Composite Materials', 'Titanium Alloys', 'Aluminum Alloys',
        'Superalloys', 'Ceramic Matrix Composites', 'Additive Manufacturing',
        'Advanced Welding Techniques', 'Precision Machining', 'Heat Treatment',
        'Non-destructive Testing', 'Quality Control', 'Lean Manufacturing',
        'Automation & Robotics', 'Supply Chain Management'
      ]
    },
    {
      id: 8,
      title: "Systems Engineering & Integration",
      color: "green",
      skills: [
        'Requirements Management', 'System Architecture', 'Interface Control',
        'Verification & Validation', 'Risk Management', 'Trade Studies',
        'Configuration Management', 'Life Cycle Management', 'Reliability Engineering',
        'Maintainability Analysis', 'Safety Engineering', 'Human Factors Engineering',
        'Cost Analysis', 'Schedule Management', 'Project Management'
      ]
    },
    {
      id: 9,
      title: "Regulatory & Certification",
      color: "purple",
      skills: [
        'FAA Regulations', 'EASA Regulations', 'Military Standards',
        'Airworthiness Certification', 'DO-160 Environmental Testing',
        'Quality Management Systems', 'Auditing Procedures', 'Technical Documentation',
        'Certification Testing', 'Continuing Airworthiness', 'Export Compliance',
        'Intellectual Property', 'Security Regulations', 'Export Control'
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
          <h2 className="skills-title">Aerospace Engineering Career Path</h2>
          <p className="skills-subtitle">
            Design and develop aircraft, spacecraft, and aerospace systems. Select your skills to discover aerodynamics, propulsion, and space systems engineering roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Aerospace Engineering Skills
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
            Aerospace Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which aerospace engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Aircraft Design & Aerodynamics', 'Structures & Materials', 'Propulsion Systems',
                'Avionics & Flight Control Systems', 'Space Systems & Satellite Engineering', 'Systems Engineering & Integration',
                'Manufacturing & Assembly', 'Mission Operations & Support', 'Quality & Certification',
                'Research & Development'
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
            Analyze My Aerospace Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable aerospace engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Aerospace Engineering Roles</h3>
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