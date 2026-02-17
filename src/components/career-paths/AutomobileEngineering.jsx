import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function AutomobileEngineering({ onBack }) {
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
    "Vehicle Design & Styling": [
      { role: "Automotive Design Intern", experienceLevel: "Student", skillsRequired: ["Sketching", "CAD Basics", "Design Principles", "Vehicle Architecture"] },
      { role: "Exterior Design Intern", experienceLevel: "Student", skillsRequired: ["Surface Modeling", "Aerodynamics Basics", "Proportion Study", "Design Language"] },
      { role: "Interior Design Intern", experienceLevel: "Student", skillsRequired: ["Ergonomics", "Materials Selection", "Human-Machine Interface", "Packaging"] },
      { role: "Automotive Designer", experienceLevel: "Junior", skillsRequired: ["CATIA/ALIAS", "Surface Modeling", "Design Development", "Clay Modeling", "Digital Sculpting", "Presentation Skills"] },
      { role: "Exterior Designer", experienceLevel: "Junior", skillsRequired: ["Aerodynamics", "Surface Continuity", "Manufacturing Constraints", "Lighting Design", "Proportion Development", "Brand Identity"] },
      { role: "Interior Designer", experienceLevel: "Junior", skillsRequired: ["Ergonomics", "Materials Engineering", "Human Factors", "Packaging Optimization", "Comfort Analysis", "User Experience"] }
    ],
    "Powertrain Engineering": [
      { role: "Engine Design Intern", experienceLevel: "Student", skillsRequired: ["Engine Fundamentals", "CAD Basics", "Thermodynamics", "Combustion Basics"] },
      { role: "Transmission Intern", experienceLevel: "Student", skillsRequired: ["Transmission Systems", "Gear Design", "Lubrication Systems", "Shift Quality"] },
      { role: "EV Powertrain Intern", experienceLevel: "Student", skillsRequired: ["Electric Motors", "Battery Basics", "Power Electronics", "Thermal Management"] },
      { role: "Engine Development Engineer", experienceLevel: "Junior", skillsRequired: ["Engine Calibration", "Performance Testing", "Emissions Control", "Thermal Analysis", "Durability Testing", "NVH Analysis"] },
      { role: "Transmission Engineer", experienceLevel: "Junior", skillsRequired: ["Gear Design", "Shift Quality Optimization", "Efficiency Analysis", "Lubrication Systems", "Durability Testing", "Control Systems"] },
      { role: "EV Powertrain Engineer", experienceLevel: "Junior", skillsRequired: ["Electric Motor Design", "Inverter Technology", "Battery Integration", "Thermal Management", "Power Distribution", "Range Optimization"] }
    ],
    "Chassis & Suspension Systems": [
      { role: "Suspension Design Intern", experienceLevel: "Student", skillsRequired: ["Suspension Basics", "CAD Modeling", "Kinematics", "Spring/Damper Systems"] },
      { role: "Brake Systems Intern", experienceLevel: "Student", skillsRequired: ["Brake Fundamentals", "Hydraulic Systems", "Thermal Analysis", "Safety Standards"] },
      { role: "Steering Systems Intern", experienceLevel: "Student", skillsRequired: ["Steering Mechanisms", "EPS Systems", "Feedback Systems", "Safety Requirements"] },
      { role: "Suspension Engineer", experienceLevel: "Junior", skillsRequired: ["Multi-body Dynamics", "Kinematic Analysis", "Comfort Optimization", "Durability Testing", "Component Design", "NVH Analysis"] },
      { role: "Brake Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Brake System Design", "Thermal Analysis", "ABS/ESP Systems", "Pedal Feel Optimization", "Safety Compliance", "Testing Procedures"] },
      { role: "Steering Engineer", experienceLevel: "Junior", skillsRequired: ["Steering System Design", "EPS Calibration", "Feedback Optimization", "Safety Systems", "NVH Control", "Durability Testing"] }
    ],
    "Electrical & Electronics Systems": [
      { role: "Automotive Electronics Intern", experienceLevel: "Student", skillsRequired: ["Vehicle Electronics", "Wiring Basics", "ECU Fundamentals", "Diagnostic Systems"] },
      { role: "Infotainment Intern", experienceLevel: "Student", skillsRequired: ["Human-Machine Interface", "Display Systems", "Connectivity", "User Experience"] },
      { role: "ADAS Intern", experienceLevel: "Student", skillsRequired: ["Sensor Systems", "Camera/Lidar Basics", "Safety Systems", "Control Algorithms"] },
      { role: "Automotive Electronics Engineer", experienceLevel: "Junior", skillsRequired: ["ECU Development", "Wiring Harness Design", "Power Distribution", "EMC Compliance", "Diagnostic Systems", "Testing Procedures"] },
      { role: "Infotainment Engineer", experienceLevel: "Junior", skillsRequired: ["HMI Design", "Display Technology", "Connectivity Systems", "Audio Systems", "Software Integration", "User Experience Testing"] },
      { role: "ADAS Engineer", experienceLevel: "Junior", skillsRequired: ["Sensor Fusion", "Perception Algorithms", "Control Systems", "Functional Safety", "Testing Procedures", "Regulatory Compliance"] }
    ],
    "Vehicle Dynamics & Performance": [
      { role: "Vehicle Dynamics Intern", experienceLevel: "Student", skillsRequired: ["Dynamics Basics", "Simulation Software", "Handling Analysis", "Data Collection"] },
      { role: "Performance Testing Intern", experienceLevel: "Student", skillsRequired: ["Test Track Procedures", "Data Acquisition", "Performance Metrics", "Safety Protocols"] },
      { role: "Ride Comfort Intern", experienceLevel: "Student", skillsRequired: ["Comfort Analysis", "Vibration Testing", "Subjective Evaluation", "Data Processing"] },
      { role: "Vehicle Dynamics Engineer", experienceLevel: "Junior", skillsRequired: ["Multi-body Simulation", "Handling Optimization", "Tire Modeling", "Stability Control", "Objective Testing", "Subjective Evaluation"] },
      { role: "Performance Engineer", experienceLevel: "Junior", skillsRequired: ["Performance Testing", "Data Analysis", "Optimization Strategies", "Track Testing", "Driver Feedback", "Competitive Benchmarking"] },
      { role: "Ride & Comfort Engineer", experienceLevel: "Junior", skillsRequired: ["Vibration Analysis", "Comfort Optimization", "Road Noise Reduction", "Subjective Assessment", "Objective Metrics", "Component Tuning"] }
    ],
    "Body & Interior Engineering": [
      { role: "Body-in-White Intern", experienceLevel: "Student", skillsRequired: ["Sheet Metal Design", "Welding Basics", "Structural Analysis", "Manufacturing Processes"] },
      { role: "Closures Intern", experienceLevel: "Student", skillsRequired: ["Door Systems", "Hinges/Latches", "Sealing Systems", "Safety Mechanisms"] },
      { role: "Interior Trim Intern", experienceLevel: "Student", skillsRequired: ["Trim Design", "Material Selection", "Manufacturing Methods", "Quality Standards"] },
      { role: "Body Engineer", experienceLevel: "Junior", skillsRequired: ["Sheet Metal Design", "Structural Analysis", "Crashworthiness", "Manufacturing Feasibility", "Weight Optimization", "Cost Analysis"] },
      { role: "Closures Engineer", experienceLevel: "Junior", skillsRequired: ["Door System Design", "Sealing Technology", "Safety Mechanisms", "Quality Standards", "Durability Testing", "Customer Satisfaction"] },
      { role: "Interior Engineer", experienceLevel: "Junior", skillsRequired: ["Trim Design", "Material Engineering", "Manufacturing Processes", "Quality Control", "Cost Optimization", "Aesthetic Requirements"] }
    ],
    "Thermal Management Systems": [
      { role: "Thermal Systems Intern", experienceLevel: "Student", skillsRequired: ["Heat Transfer Basics", "Cooling Systems", "HVAC Basics", "Fluid Dynamics"] },
      { role: "Climate Control Intern", experienceLevel: "Student", skillsRequired: ["HVAC Systems", "Refrigeration", "Air Distribution", "Control Systems"] },
      { role: "Battery Cooling Intern", experienceLevel: "Student", skillsRequired: ["Thermal Management", "Cooling Strategies", "Fluid Systems", "Temperature Control"] },
      { role: "Thermal Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Cooling System Design", "Heat Exchanger Design", "Thermal Analysis", "System Optimization", "Testing Procedures", "Energy Efficiency"] },
      { role: "HVAC Engineer", experienceLevel: "Junior", skillsRequired: ["Climate Control Design", "Refrigeration Systems", "Air Quality Management", "Energy Efficiency", "Comfort Optimization", "System Integration"] },
      { role: "Battery Thermal Engineer", experienceLevel: "Junior", skillsRequired: ["Battery Cooling Design", "Thermal Runaway Prevention", "Coolant Systems", "Temperature Control Algorithms", "Safety Systems", "Efficiency Optimization"] }
    ],
    "Manufacturing & Production": [
      { role: "Automotive Manufacturing Intern", experienceLevel: "Student", skillsRequired: ["Production Processes", "Assembly Methods", "Quality Basics", "Lean Principles"] },
      { role: "Tooling Design Intern", experienceLevel: "Student", skillsRequired: ["Tool Design", "Fixturing", "Manufacturing Methods", "CAD Software"] },
      { role: "Production Planning Intern", experienceLevel: "Student", skillsRequired: ["Production Planning", "Capacity Analysis", "Line Balancing", "Process Flow"] },
      { role: "Manufacturing Engineer", experienceLevel: "Junior", skillsRequired: ["Process Planning", "Lean Manufacturing", "Quality Systems", "Automation Systems", "Cost Reduction", "Continuous Improvement"] },
      { role: "Tooling Engineer", experienceLevel: "Junior", skillsRequired: ["Tool Design", "Fixturing Systems", "Manufacturing Processes", "Cost Analysis", "Maintenance Planning", "Quality Standards"] },
      { role: "Production Engineer", experienceLevel: "Junior", skillsRequired: ["Line Balancing", "Capacity Planning", "Process Optimization", "Quality Control", "Cost Management", "Team Leadership"] }
    ],
    "Quality & Testing": [
      { role: "Quality Engineering Intern", experienceLevel: "Student", skillsRequired: ["Quality Systems", "Inspection Methods", "Measurement Tools", "Documentation"] },
      { role: "Testing & Validation Intern", experienceLevel: "Student", skillsRequired: ["Test Procedures", "Data Collection", "Analysis Methods", "Reporting"] },
      { role: "Reliability Intern", experienceLevel: "Student", skillsRequired: ["Reliability Basics", "Failure Analysis", "Testing Methods", "Statistical Analysis"] },
      { role: "Quality Engineer", experienceLevel: "Junior", skillsRequired: ["Quality Systems", "Statistical Process Control", "Measurement Systems", "Root Cause Analysis", "Corrective Actions", "Auditing"] },
      { role: "Test Engineer", experienceLevel: "Junior", skillsRequired: ["Test Planning", "Data Acquisition", "Analysis Methods", "Reporting", "Test Equipment", "Protocol Development"] },
      { role: "Reliability Engineer", experienceLevel: "Junior", skillsRequired: ["Reliability Analysis", "Failure Mode Analysis", "Life Testing", "Statistical Analysis", "Design Improvement", "Warranty Analysis"] }
    ],
    "Alternative Fuel & Electric Vehicles": [
      { role: "EV Systems Intern", experienceLevel: "Student", skillsRequired: ["Electric Vehicle Basics", "Battery Systems", "Charging Technology", "Regenerative Braking"] },
      { role: "Hybrid Systems Intern", experienceLevel: "Student", skillsRequired: ["Hybrid Architecture", "Energy Management", "Powertrain Integration", "Control Strategies"] },
      { role: "Fuel Cell Intern", experienceLevel: "Student", skillsRequired: ["Fuel Cell Technology", "Hydrogen Systems", "Energy Conversion", "Safety Systems"] },
      { role: "EV Integration Engineer", experienceLevel: "Junior", skillsRequired: ["Battery Pack Integration", "Charging Systems", "Thermal Management", "Safety Systems", "Range Optimization", "Cost Analysis"] },
      { role: "Hybrid Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Hybrid Architecture", "Energy Management Strategies", "Mode Transition", "Efficiency Optimization", "Emissions Control", "System Integration"] },
      { role: "Fuel Cell Engineer", experienceLevel: "Junior", skillsRequired: ["Fuel Cell Stack Design", "Hydrogen Storage", "Balance of Plant", "System Efficiency", "Safety Systems", "Durability Testing"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "CAD & Design Software",
      color: "blue",
      skills: [
        'CATIA', 'NX (Unigraphics)', 'SolidWorks', 'AutoCAD',
        'ALIAS Automotive', 'ICEM Surf', 'Blender', 'Maya',
        'Surface Modeling', 'Class-A Surfacing', 'Digital Mockup',
        'Virtual Reality Review', 'Clay Modeling', 'Rapid Prototyping',
        'Design Visualization', 'Photorealistic Rendering'
      ]
    },
    {
      id: 2,
      title: "Vehicle Dynamics & Simulation",
      color: "green",
      skills: [
        'Adams Car', 'CarSim', 'MATLAB/Simulink', 'dSPACE',
        'Multi-body Dynamics', 'Kinematic Analysis', 'Compliance Analysis',
        'Handling Optimization', 'Ride Comfort Analysis', 'Tire Modeling',
        'Suspension Tuning', 'Steering Feel', 'Brake System Analysis',
        'NVH Analysis', 'Durability Simulation'
      ]
    },
    {
      id: 3,
      title: "Powertrain & Propulsion Systems",
      color: "purple",
      skills: [
        'GT-SUITE', 'AVL Cruise', 'Ricardo Wave', 'Engine Calibration',
        'Transmission Design', 'Electric Motor Design', 'Battery Systems',
        'Power Electronics', 'Hybrid Systems', 'Fuel Cell Technology',
        'Thermal Management', 'Emissions Control', 'Performance Testing',
        'Energy Management', 'Range Optimization'
      ]
    },
    {
      id: 4,
      title: "Electrical & Electronics Systems",
      color: "orange",
      skills: [
        'Automotive SPICE', 'CAN/LIN/Ethernet', 'Vector Tools', 'dSPACE',
        'ECU Development', 'Wiring Harness Design', 'Power Distribution',
        'EMC/EMI Testing', 'Functional Safety (ISO 26262)', 'Diagnostic Systems',
        'Infotainment Systems', 'HMI Design', 'ADAS Development',
        'Sensor Fusion', 'Vehicle Network Architecture'
      ]
    },
    {
      id: 5,
      title: "Structural & Safety Analysis",
      color: "red",
      skills: [
        'ANSYS', 'HyperWorks', 'ABAQUS', 'LS-DYNA',
        'Finite Element Analysis', 'Crashworthiness Analysis', 'Impact Simulation',
        'Fatigue Analysis', 'Durability Testing', 'Lightweight Design',
        'Composite Materials', 'High-Strength Steel', 'Aluminum Design',
        'Joining Technologies', 'Safety Standards Compliance'
      ]
    },
    {
      id: 6,
      title: "Manufacturing & Production",
      color: "teal",
      skills: [
        'Lean Manufacturing', 'Six Sigma', 'TQM Systems', 'Automation',
        'Robotics Programming', 'Welding Technologies', 'Sheet Metal Forming',
        'Injection Molding', 'Composite Manufacturing', 'Assembly Processes',
        'Quality Control Systems', 'Measurement Systems Analysis',
        'Process Planning', 'Tooling Design', 'Factory Planning'
      ]
    },
    {
      id: 7,
      title: "Thermal & Fluid Systems",
      color: "blue",
      skills: [
        'CFD Analysis', 'Star-CCM+', 'FloTHERM', 'Heat Transfer Analysis',
        'Cooling System Design', 'HVAC Systems', 'Airflow Analysis',
        'Thermal Management', 'Battery Cooling', 'Engine Cooling',
        'Exhaust Systems', 'Aerodynamics', 'Fuel Systems',
        'Lubrication Systems', 'Fluid Dynamics'
      ]
    },
    {
      id: 8,
      title: "Testing & Validation",
      color: "green",
      skills: [
        'Test Planning', 'Data Acquisition Systems', 'Dyno Testing',
        'Environmental Testing', 'Durability Testing', 'Reliability Testing',
        'Emissions Testing', 'Noise Testing', 'Vibration Analysis',
        'Crash Testing', 'Safety Testing', 'Homologation Testing',
        'Field Testing', 'Fleet Testing', 'Certification Processes'
      ]
    },
    {
      id: 9,
      title: "Regulatory & Standards",
      color: "purple",
      skills: [
        'Vehicle Regulations', 'Safety Standards', 'Emissions Standards',
        'Homologation Processes', 'Type Approval', 'Certification Requirements',
        'Quality Standards', 'Environmental Regulations', 'Recall Management',
        'Compliance Testing', 'Documentation Systems', 'Audit Preparation',
        'International Standards', 'Market-specific Requirements'
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
          <h2 className="skills-title">Automobile Engineering Career Path</h2>
          <p className="skills-subtitle">
            Design, develop, and optimize vehicles for the future. Select your skills to discover automotive design, powertrain, and vehicle development roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Automobile Engineering Skills
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
            Automobile Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which automobile engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Vehicle Design & Styling', 'Powertrain Engineering', 'Chassis & Suspension Systems',
                'Electrical & Electronics Systems', 'Vehicle Dynamics & Performance', 'Body & Interior Engineering',
                'Thermal Management Systems', 'Manufacturing & Production', 'Quality & Testing',
                'Alternative Fuel & Electric Vehicles'
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
            Analyze My Automobile Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable automobile engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Automobile Engineering Roles</h3>
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