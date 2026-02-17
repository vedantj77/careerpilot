import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function MechanicalEngineering({ onBack }) {
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
    "Product Design & Development": [
      { role: "Product Design Intern", experienceLevel: "Student", skillsRequired: ["CAD Basics", "Design Principles", "Sketching", "Material Selection"] },
      { role: "Design Engineering Intern", experienceLevel: "Student", skillsRequired: ["CAD Modeling", "Tolerancing", "DFM Basics", "Prototyping"] },
      { role: "Consumer Products Intern", experienceLevel: "Student", skillsRequired: ["Product Development", "User Research", "Market Analysis", "Concept Design"] },
      { role: "Mechanical Design Engineer", experienceLevel: "Junior", skillsRequired: ["CAD (SolidWorks/CATIA)", "GD&T", "FEA Analysis", "Design Validation", "DFM/DFA", "Prototyping"] },
      { role: "Product Development Engineer", experienceLevel: "Junior", skillsRequired: ["Design Process", "Prototyping", "Testing", "Manufacturing Processes", "Cost Analysis", "Project Management"] },
      { role: "R&D Engineer", experienceLevel: "Junior", skillsRequired: ["Innovation", "Concept Development", "Testing Protocols", "Technical Documentation", "Cross-functional Collaboration"] }
    ],
    "CAD/CAM & Manufacturing": [
      { role: "CAD Intern", experienceLevel: "Student", skillsRequired: ["CAD Software", "2D Drafting", "3D Modeling", "Technical Drawing"] },
      { role: "CAM Intern", experienceLevel: "Student", skillsRequired: ["CAM Software", "Toolpath Generation", "Machining Basics", "G-code Basics"] },
      { role: "CNC Intern", experienceLevel: "Student", skillsRequired: ["CNC Basics", "Machine Setup", "Quality Inspection", "Safety Procedures"] },
      { role: "CAD Engineer", experienceLevel: "Junior", skillsRequired: ["SolidWorks/CATIA/NX", "Parametric Design", "Assembly Design", "Drawing Creation", "Model Management", "Standards Compliance"] },
      { role: "CAM Programmer", experienceLevel: "Junior", skillsRequired: ["CAM Software", "Multi-axis Programming", "Tool Selection", "Optimization", "Simulation", "Post-processing"] },
      { role: "Manufacturing Engineer", experienceLevel: "Junior", skillsRequired: ["Process Planning", "Lean Manufacturing", "Quality Systems", "Equipment Selection", "Cost Reduction", "Continuous Improvement"] }
    ],
    "Thermal & Fluid Systems": [
      { role: "Thermal Engineering Intern", experienceLevel: "Student", skillsRequired: ["Heat Transfer Basics", "CFD Basics", "Thermal Analysis", "Experimental Setup"] },
      { role: "HVAC Intern", experienceLevel: "Student", skillsRequired: ["HVAC Systems", "Load Calculation", "Duct Design", "Equipment Selection"] },
      { role: "Fluid Systems Intern", experienceLevel: "Student", skillsRequired: ["Fluid Mechanics", "Pump Systems", "Piping Design", "Pressure Drop Calculation"] },
      { role: "Thermal Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Heat Transfer", "CFD Analysis", "Thermal Management", "System Design", "Testing", "Optimization"] },
      { role: "HVAC Engineer", experienceLevel: "Junior", skillsRequired: ["HVAC Design", "Energy Modeling", "Load Calculation", "Equipment Selection", "Duct/Piping Design", "Codes Compliance"] },
      { role: "Fluid Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Fluid Dynamics", "Pump/Piping Design", "Flow Analysis", "System Optimization", "Pressure/Vacuum Systems", "Testing"] }
    ],
    "Structural Analysis & FEA": [
      { role: "FEA Intern", experienceLevel: "Student", skillsRequired: ["FEA Basics", "Stress Analysis", "Mesh Generation", "Software Basics"] },
      { role: "Structural Intern", experienceLevel: "Student", skillsRequired: ["Structural Mechanics", "Load Analysis", "Material Properties", "Safety Factors"] },
      { role: "Stress Analysis Intern", experienceLevel: "Student", skillsRequired: ["Stress Calculations", "Failure Analysis", "Fatigue Basics", "Hand Calculations"] },
      { role: "FEA Analyst", experienceLevel: "Junior", skillsRequired: ["ANSYS/ABAQUS", "Linear/Non-linear Analysis", "Dynamic Analysis", "Validation", "Reporting", "Optimization"] },
      { role: "Stress Engineer", experienceLevel: "Junior", skillsRequired: ["Stress Analysis", "Fatigue Analysis", "Fracture Mechanics", "Hand Calculations", "Test Correlation", "Design Improvement"] },
      { role: "Structural Analyst", experienceLevel: "Junior", skillsRequired: ["Structural Analysis", "Vibration Analysis", "Modal Analysis", "Composite Analysis", "Failure Investigation", "Recommendations"] }
    ],
    "Mechatronics & Robotics": [
      { role: "Mechatronics Intern", experienceLevel: "Student", skillsRequired: ["Mechanical Design", "Electronics Basics", "Programming Basics", "Sensor Integration"] },
      { role: "Robotics Intern", experienceLevel: "Student", skillsRequired: ["Robotics Basics", "Actuators", "Control Systems", "Kinematics Basics"] },
      { role: "Automation Intern", experienceLevel: "Student", skillsRequired: ["PLC Basics", "Pneumatics", "Hydraulics", "System Integration"] },
      { role: "Mechatronics Engineer", experienceLevel: "Junior", skillsRequired: ["System Integration", "Sensors/Actuators", "Control Systems", "Embedded Systems", "Programming", "Testing"] },
      { role: "Robotics Engineer", experienceLevel: "Junior", skillsRequired: ["Robot Programming", "Kinematics/Dynamics", "End Effector Design", "Vision Systems", "System Integration", "Safety Systems"] },
      { role: "Automation Engineer", experienceLevel: "Junior", skillsRequired: ["PLC Programming", "Industrial Robotics", "Pneumatic/Hydraulic Systems", "HMI Design", "System Commissioning", "Troubleshooting"] }
    ],
    "Automotive Engineering": [
      { role: "Automotive Design Intern", experienceLevel: "Student", skillsRequired: ["Vehicle Systems", "CAD Basics", "Design Principles", "Material Selection"] },
      { role: "Vehicle Dynamics Intern", experienceLevel: "Student", skillsRequired: ["Dynamics Basics", "Suspension Systems", "Tire Mechanics", "Simulation Basics"] },
      { role: "Powertrain Intern", experienceLevel: "Student", skillsRequired: ["Engine Basics", "Transmission Systems", "Drivetrain", "Thermal Management"] },
      { role: "Automotive Design Engineer", experienceLevel: "Junior", skillsRequired: ["Vehicle Systems", "CATIA/NX", "Packaging", "Manufacturing Constraints", "Regulatory Compliance", "Testing"] },
      { role: "Vehicle Dynamics Engineer", experienceLevel: "Junior", skillsRequired: ["Multi-body Dynamics", "Suspension Design", "Handling Analysis", "Simulation Tools", "Testing", "Optimization"] },
      { role: "Powertrain Engineer", experienceLevel: "Junior", skillsRequired: ["Engine Systems", "Transmission Design", "Thermal Management", "NVH Analysis", "Performance Testing", "Emissions Compliance"] }
    ],
    "Aerospace Engineering": [
      { role: "Aerospace Intern", experienceLevel: "Student", skillsRequired: ["Aerospace Systems", "CAD Basics", "Structural Basics", "Material Science"] },
      { role: "Aircraft Systems Intern", experienceLevel: "Student", skillsRequired: ["Flight Systems", "Control Surfaces", "Hydraulic Systems", "Avionics Basics"] },
      { role: "Space Systems Intern", experienceLevel: "Student", skillsRequired: ["Space Environment", "Thermal Control", "Structural Design", "Launch Systems"] },
      { role: "Aircraft Structures Engineer", experienceLevel: "Junior", skillsRequired: ["Composite Materials", "Structural Analysis", "Fatigue Analysis", "Damage Tolerance", "Certification", "Repair Techniques"] },
      { role: "Propulsion Engineer", experienceLevel: "Junior", skillsRequired: ["Turbomachinery", "Combustion Analysis", "Thermal Systems", "Performance Analysis", "Testing", "System Integration"] },
      { role: "Systems Engineer (Aerospace)", experienceLevel: "Junior", skillsRequired: ["System Integration", "Requirements Management", "Interface Control", "Verification", "Risk Management", "Documentation"] }
    ],
    "Materials & Process Engineering": [
      { role: "Materials Intern", experienceLevel: "Student", skillsRequired: ["Material Properties", "Testing Methods", "Selection Criteria", "Failure Analysis"] },
      { role: "Process Engineering Intern", experienceLevel: "Student", skillsRequired: ["Manufacturing Processes", "Process Flow", "Quality Control", "Safety Procedures"] },
      { role: "Welding Intern", experienceLevel: "Student", skillsRequired: ["Welding Processes", "Weld Symbols", "Inspection Methods", "Defect Analysis"] },
      { role: "Materials Engineer", experienceLevel: "Junior", skillsRequired: ["Material Selection", "Failure Analysis", "Corrosion Control", "Testing Methods", "Specification Development", "Supplier Management"] },
      { role: "Process Engineer", experienceLevel: "Junior", skillsRequired: ["Process Optimization", "Lean/Six Sigma", "Quality Systems", "Equipment Specification", "Cost Analysis", "Continuous Improvement"] },
      { role: "Welding Engineer", experienceLevel: "Junior", skillsRequired: ["Welding Processes", "Procedure Development", "NDT Methods", "Defect Analysis", "Quality Assurance", "Code Compliance"] }
    ],
    "Quality & Reliability": [
      { role: "Quality Intern", experienceLevel: "Student", skillsRequired: ["Quality Basics", "Inspection Methods", "Measurement Tools", "Documentation"] },
      { role: "Reliability Intern", experienceLevel: "Student", skillsRequired: ["Reliability Basics", "Failure Analysis", "Testing Methods", "Data Analysis"] },
      { role: "Metrology Intern", experienceLevel: "Student", skillsRequired: ["Measurement Systems", "CMM Basics", "Gauge R&R", "Calibration"] },
      { role: "Quality Engineer", experienceLevel: "Junior", skillsRequired: ["Quality Systems", "Statistical Process Control", "Inspection Methods", "Root Cause Analysis", "Corrective Actions", "Auditing"] },
      { role: "Reliability Engineer", experienceLevel: "Junior", skillsRequired: ["Reliability Analysis", "Failure Analysis", "Accelerated Testing", "Weibull Analysis", "Life Prediction", "Design Improvement"] },
      { role: "Metrology Engineer", experienceLevel: "Junior", skillsRequired: ["Measurement Systems", "CMM Programming", "GD&T", "Calibration Systems", "Uncertainty Analysis", "Equipment Selection"] }
    ],
    "Project & Maintenance Engineering": [
      { role: "Project Engineering Intern", experienceLevel: "Student", skillsRequired: ["Project Basics", "Scheduling", "Documentation", "Team Coordination"] },
      { role: "Maintenance Intern", experienceLevel: "Student", skillsRequired: ["Equipment Maintenance", "Troubleshooting", "Preventive Maintenance", "Safety Procedures"] },
      { role: "Plant Engineering Intern", experienceLevel: "Student", skillsRequired: ["Plant Systems", "Equipment Layout", "Safety Systems", "Energy Management"] },
      { role: "Project Engineer", experienceLevel: "Junior", skillsRequired: ["Project Management", "Budgeting", "Scheduling", "Vendor Management", "Risk Management", "Reporting"] },
      { role: "Maintenance Engineer", experienceLevel: "Junior", skillsRequired: ["Predictive Maintenance", "Reliability Engineering", "Root Cause Analysis", "Spare Parts Management", "Safety Compliance", "Cost Control"] },
      { role: "Plant Engineer", experienceLevel: "Junior", skillsRequired: ["Facility Management", "Utility Systems", "Equipment Specification", "Layout Planning", "Safety Compliance", "Energy Efficiency"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "CAD & Design Tools",
      color: "blue",
      skills: [
        'SolidWorks', 'CATIA', 'AutoCAD', 'NX (Unigraphics)', 'Inventor',
        'Creo (Pro/ENGINEER)', 'Fusion 360', 'Onshape', 'Rhino',
        'GD&T', 'Technical Drawing', 'Parametric Design', 'Surface Modeling',
        'Assembly Design', 'Drawing Standards', 'Model Management'
      ]
    },
    {
      id: 2,
      title: "Analysis & Simulation",
      color: "green",
      skills: [
        'ANSYS', 'ABAQUS', 'FEA Analysis', 'CFD Analysis',
        'Stress Analysis', 'Thermal Analysis', 'Vibration Analysis',
        'Fatigue Analysis', 'Multi-body Dynamics', 'Modal Analysis',
        'Computational Fluid Dynamics', 'Heat Transfer Analysis',
        'Structural Dynamics', 'Non-linear Analysis', 'Optimization'
      ]
    },
    {
      id: 3,
      title: "Manufacturing & Production",
      color: "purple",
      skills: [
        'CNC Machining', 'CAM Programming', 'Additive Manufacturing (3D Printing)',
        'Injection Molding', 'Sheet Metal Fabrication', 'Casting Processes',
        'Welding (MIG/TIG/Stick)', 'Lean Manufacturing', 'Six Sigma',
        'Process Planning', 'Quality Control', 'GD&T Application',
        'Tool Design', 'Fixturing', 'Assembly Processes'
      ]
    },
    {
      id: 4,
      title: "Materials & Mechanics",
      color: "orange",
      skills: [
        'Material Science', 'Metallurgy', 'Composite Materials',
        'Plastics & Polymers', 'Failure Analysis', 'Fracture Mechanics',
        'Fatigue Analysis', 'Corrosion Engineering', 'Material Testing',
        'Mechanical Properties', 'Material Selection', 'Heat Treatment',
        'Non-destructive Testing', 'Tribology', 'Creep & Stress Relaxation'
      ]
    },
    {
      id: 5,
      title: "Thermal & Fluid Systems",
      color: "red",
      skills: [
        'Heat Transfer', 'Thermodynamics', 'HVAC Design',
        'Refrigeration Systems', 'Fluid Mechanics', 'Pump Selection',
        'Piping Design', 'Pressure Vessel Design', 'Heat Exchanger Design',
        'Thermal Management', 'CFD Software', 'Energy Systems',
        'Combustion Analysis', 'Aerodynamics', 'Compressible Flow'
      ]
    },
    {
      id: 6,
      title: "Mechatronics & Control",
      color: "teal",
      skills: [
        'PLC Programming', 'Robotics', 'Automation Systems',
        'Sensors & Actuators', 'Motion Control', 'PID Control',
        'Hydraulic Systems', 'Pneumatic Systems', 'Motor Selection',
        'Control Systems', 'Embedded Systems', 'Industrial Networks',
        'Machine Vision', 'System Integration', 'Safety Systems'
      ]
    },
    {
      id: 7,
      title: "Product Development",
      color: "blue",
      skills: [
        'Design for Manufacturing', 'Design for Assembly',
        'Prototyping', 'Testing & Validation', 'Risk Analysis',
        'Cost Analysis', 'Project Management', 'Technical Documentation',
        'Requirements Management', 'Change Management', 'Version Control',
        'Design Reviews', 'Customer Requirements', 'Regulatory Compliance'
      ]
    },
    {
      id: 8,
      title: "Industry-Specific Skills",
      color: "green",
      skills: [
        'Automotive Systems', 'Aerospace Standards', 'Medical Device Regulations',
        'Energy Systems', 'Consumer Products', 'Industrial Equipment',
        'Defense Standards', 'Oil & Gas Equipment', 'Renewable Energy Systems',
        'ASME Codes', 'ISO Standards', 'Safety Standards',
        'Environmental Regulations', 'Quality Systems', 'Certification Processes'
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
          <h2 className="skills-title">Mechanical Engineering Career Path</h2>
          <p className="skills-subtitle">
            Design, analyze, and build mechanical systems. Select your skills to discover product design, manufacturing, and systems engineering roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Mechanical Engineering Skills
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
            Mechanical Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which mechanical engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Product Design & Development', 'CAD/CAM & Manufacturing', 'Thermal & Fluid Systems',
                'Structural Analysis & FEA', 'Mechatronics & Robotics', 'Automotive Engineering',
                'Aerospace Engineering', 'Materials & Process Engineering', 'Quality & Reliability',
                'Project & Maintenance Engineering'
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
            Analyze My Mechanical Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable mechanical engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Mechanical Engineering Roles</h3>
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