import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function ChemicalEngineering({ onBack }) {
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
    "Process Engineering": [
      { role: "Process Engineering Intern", experienceLevel: "Student", skillsRequired: ["Process Flow Diagrams", "Mass Balance", "Energy Balance", "Equipment Basics"] },
      { role: "Chemical Plant Intern", experienceLevel: "Student", skillsRequired: ["Plant Operations", "Safety Procedures", "Process Monitoring", "Data Collection"] },
      { role: "Production Intern", experienceLevel: "Student", skillsRequired: ["Batch Processes", "Quality Control", "Operation Procedures", "Troubleshooting Basics"] },
      { role: "Process Engineer", experienceLevel: "Junior", skillsRequired: ["Process Design", "P&ID Development", "Equipment Sizing", "Process Optimization", "Troubleshooting", "Cost Analysis"] },
      { role: "Production Engineer", experienceLevel: "Junior", skillsRequired: ["Batch Process Optimization", "Quality Improvement", "Yield Enhancement", "Root Cause Analysis", "Continuous Improvement", "Safety Management"] },
      { role: "Plant Engineer", experienceLevel: "Junior", skillsRequired: ["Plant Operations", "Equipment Maintenance", "Capacity Planning", "Energy Efficiency", "Environmental Compliance", "Safety Systems"] }
    ],
    "Design & Simulation": [
      { role: "Process Design Intern", experienceLevel: "Student", skillsRequired: ["CAD Basics", "PFD Creation", "Equipment Layout", "Design Principles"] },
      { role: "Simulation Intern", experienceLevel: "Student", skillsRequired: ["Aspen Plus/HYSYS Basics", "Modeling Concepts", "Simulation Setup", "Data Analysis"] },
      { role: "Equipment Design Intern", experienceLevel: "Student", skillsRequired: ["Equipment Basics", "Sizing Calculations", "Material Selection", "Design Standards"] },
      { role: "Process Design Engineer", experienceLevel: "Junior", skillsRequired: ["Process Simulation", "Equipment Design", "P&ID Development", "HAZOP Studies", "Cost Estimation", "Specification Writing"] },
      { role: "Simulation Engineer", experienceLevel: "Junior", skillsRequired: ["Aspen Plus/HYSYS", "Dynamic Simulation", "Optimization Techniques", "Model Validation", "Data Regression", "Process Analysis"] },
      { role: "Equipment Engineer", experienceLevel: "Junior", skillsRequired: ["Pressure Vessel Design", "Heat Exchanger Design", "Pump/Compressor Selection", "Material Selection", "ASME Codes", "Fabrication Oversight"] }
    ],
    "Petrochemical & Refining": [
      { role: "Refinery Intern", experienceLevel: "Student", skillsRequired: ["Refinery Processes", "Distillation Basics", "Catalytic Cracking", "Safety Standards"] },
      { role: "Petrochemical Intern", experienceLevel: "Student", skillsRequired: ["Petrochemical Processes", "Polymer Basics", "Catalyst Systems", "Process Control"] },
      { role: "Oil & Gas Intern", experienceLevel: "Student", skillsRequired: ["Upstream/Downstream Basics", "Hydrocarbon Processing", "Safety Systems", "Environmental Considerations"] },
      { role: "Refinery Process Engineer", experienceLevel: "Junior", skillsRequired: ["Refinery Operations", "Distillation Optimization", "Catalyst Management", "Yield Improvement", "Energy Conservation", "Safety Compliance"] },
      { role: "Petrochemical Engineer", experienceLevel: "Junior", skillsRequired: ["Polymer Processes", "Catalyst Technology", "Reactor Design", "Process Intensification", "Quality Control", "Product Development"] },
      { role: "Oil & Gas Engineer", experienceLevel: "Junior", skillsRequired: ["Natural Gas Processing", "Pipeline Operations", "Gas Treatment", "LNG Processes", "Safety Systems", "Environmental Management"] }
    ],
    "Pharmaceutical & Biotechnology": [
      { role: "Pharmaceutical Intern", experienceLevel: "Student", skillsRequired: ["GMP Basics", "Batch Processing", "Quality Systems", "Documentation"] },
      { role: "Biotech Intern", experienceLevel: "Student", skillsRequired: ["Fermentation Basics", "Cell Culture", "Bioprocessing", "Laboratory Techniques"] },
      { role: "API Manufacturing Intern", experienceLevel: "Student", skillsRequired: ["API Production", "Synthesis Processes", "Purification Methods", "Quality Assurance"] },
      { role: "Pharmaceutical Process Engineer", experienceLevel: "Junior", skillsRequired: ["GMP Compliance", "Process Validation", "Scale-up Technology", "Clean Room Design", "Regulatory Requirements", "Documentation Systems"] },
      { role: "Bioprocess Engineer", experienceLevel: "Junior", skillsRequired: ["Fermentation Technology", "Cell Culture Processes", "Downstream Processing", "Process Scale-up", "Validation Protocols", "Quality Systems"] },
      { role: "API Manufacturing Engineer", experienceLevel: "Junior", skillsRequired: ["Chemical Synthesis", "Purification Processes", "Process Optimization", "Yield Improvement", "Safety Systems", "Regulatory Compliance"] }
    ],
    "Environmental & Sustainability": [
      { role: "Environmental Engineering Intern", experienceLevel: "Student", skillsRequired: ["Environmental Regulations", "Waste Treatment", "Pollution Control", "Sustainability Principles"] },
      { role: "Sustainability Intern", experienceLevel: "Student", skillsRequired: ["Energy Efficiency", "Carbon Footprint", "Circular Economy", "Green Technologies"] },
      { role: "Waste Management Intern", experienceLevel: "Student", skillsRequired: ["Waste Processing", "Recycling Systems", "Hazardous Waste", "Environmental Monitoring"] },
      { role: "Environmental Engineer", experienceLevel: "Junior", skillsRequired: ["Waste Treatment Design", "Air Pollution Control", "Water Treatment", "Environmental Impact Assessment", "Regulatory Compliance", "Permitting"] },
      { role: "Sustainability Engineer", experienceLevel: "Junior", skillsRequired: ["Life Cycle Assessment", "Energy Optimization", "Carbon Management", "Green Process Design", "Circular Economy", "Sustainability Reporting"] },
      { role: "Waste Management Engineer", experienceLevel: "Junior", skillsRequired: ["Waste Processing Design", "Recycling Systems", "Hazardous Waste Management", "Landfill Design", "Environmental Protection", "Regulatory Compliance"] }
    ],
    "Food & Beverage Processing": [
      { role: "Food Processing Intern", experienceLevel: "Student", skillsRequired: ["Food Safety Basics", "Processing Methods", "Sanitation Procedures", "Quality Control"] },
      { role: "Beverage Production Intern", experienceLevel: "Student", skillsRequired: ["Beverage Processes", "Packaging Systems", "Quality Testing", "Sanitation Standards"] },
      { role: "Dairy Processing Intern", experienceLevel: "Student", skillsRequired: ["Dairy Technology", "Pasteurization", "Fermentation Processes", "Quality Assurance"] },
      { role: "Food Process Engineer", experienceLevel: "Junior", skillsRequired: ["Food Processing Technology", "Thermal Processing", "Packaging Systems", "Food Safety", "Quality Systems", "Process Optimization"] },
      { role: "Beverage Engineer", experienceLevel: "Junior", skillsRequired: ["Beverage Processing", "Carbonation Systems", "Filtration Technology", "Packaging Design", "Quality Control", "Sanitation Systems"] },
      { role: "Dairy Engineer", experienceLevel: "Junior", skillsRequired: ["Dairy Processing", "Pasteurization Systems", "Fermentation Control", "Cold Chain Management", "Quality Assurance", "Regulatory Compliance"] }
    ],
    "Materials & Polymers": [
      { role: "Polymer Engineering Intern", experienceLevel: "Student", skillsRequired: ["Polymer Basics", "Material Testing", "Processing Methods", "Characterization Techniques"] },
      { role: "Materials Science Intern", experienceLevel: "Student", skillsRequired: ["Material Properties", "Testing Methods", "Structure-Property Relationships", "Laboratory Techniques"] },
      { role: "Composite Materials Intern", experienceLevel: "Student", skillsRequired: ["Composite Basics", "Fabrication Methods", "Testing Procedures", "Material Selection"] },
      { role: "Polymer Engineer", experienceLevel: "Junior", skillsRequired: ["Polymer Processing", "Rheology", "Additive Formulation", "Material Characterization", "Quality Control", "Product Development"] },
      { role: "Materials Engineer", experienceLevel: "Junior", skillsRequired: ["Material Selection", "Failure Analysis", "Corrosion Control", "Testing Methods", "Specification Development", "Supplier Management"] },
      { role: "Composite Engineer", experienceLevel: "Junior", skillsRequired: ["Composite Manufacturing", "Fabrication Processes", "Material Testing", "Design Optimization", "Quality Assurance", "Cost Analysis"] }
    ],
    "Energy & Renewable Resources": [
      { role: "Energy Engineering Intern", experienceLevel: "Student", skillsRequired: ["Energy Systems", "Renewable Technologies", "Energy Efficiency", "Process Integration"] },
      { role: "Biofuels Intern", experienceLevel: "Student", skillsRequired: ["Biofuel Production", "Fermentation Processes", "Conversion Technologies", "Feedstock Analysis"] },
      { role: "Solar/Wind Intern", experienceLevel: "Student", skillsRequired: ["Renewable Systems", "Energy Storage", "Grid Integration", "Sustainability Analysis"] },
      { role: "Energy Engineer", experienceLevel: "Junior", skillsRequired: ["Process Integration", "Heat Recovery Systems", "Energy Optimization", "Utility Systems", "Cost Analysis", "Sustainability Assessment"] },
      { role: "Biofuels Engineer", experienceLevel: "Junior", skillsRequired: ["Biomass Conversion", "Fermentation Technology", "Catalyst Development", "Process Scale-up", "Yield Optimization", "Economic Analysis"] },
      { role: "Renewable Energy Engineer", experienceLevel: "Junior", skillsRequired: ["Solar/Wind Integration", "Energy Storage Systems", "Grid Management", "Life Cycle Analysis", "Project Development", "Regulatory Compliance"] }
    ],
    "Safety & Risk Management": [
      { role: "Process Safety Intern", experienceLevel: "Student", skillsRequired: ["Safety Procedures", "Risk Assessment Basics", "Hazard Identification", "Emergency Response"] },
      { role: "Risk Assessment Intern", experienceLevel: "Student", skillsRequired: ["Risk Analysis", "Failure Modes", "Safety Systems", "Documentation"] },
      { role: "HAZOP Intern", experienceLevel: "Student", skillsRequired: ["HAZOP Methodology", "Process Hazards", "Safety Review", "Team Facilitation"] },
      { role: "Process Safety Engineer", experienceLevel: "Junior", skillsRequired: ["HAZOP Studies", "Layer of Protection Analysis", "Safety Instrumented Systems", "Risk Assessment", "Compliance Auditing", "Incident Investigation"] },
      { role: "Risk Management Engineer", experienceLevel: "Junior", skillsRequired: ["Quantitative Risk Assessment", "Consequence Analysis", "Reliability Engineering", "Safety Systems Design", "Emergency Planning", "Regulatory Compliance"] },
      { role: "Safety Systems Engineer", experienceLevel: "Junior", skillsRequired: ["Safety Instrumented Systems", "Alarm Management", "Fire & Gas Systems", "Safety Integrity Levels", "System Testing", "Maintenance Procedures"] }
    ],
    "Research & Development": [
      { role: "R&D Intern", experienceLevel: "Student", skillsRequired: ["Laboratory Techniques", "Experimental Design", "Data Analysis", "Literature Review"] },
      { role: "Catalyst Development Intern", experienceLevel: "Student", skillsRequired: ["Catalyst Basics", "Testing Methods", "Characterization Techniques", "Data Collection"] },
      { role: "Product Development Intern", experienceLevel: "Student", skillsRequired: ["Product Formulation", "Testing Protocols", "Market Analysis", "Prototype Development"] },
      { role: "R&D Engineer", experienceLevel: "Junior", skillsRequired: ["Experimental Design", "Data Analysis", "Process Development", "Scale-up Technology", "Intellectual Property", "Technical Reporting"] },
      { role: "Catalyst Engineer", experienceLevel: "Junior", skillsRequired: ["Catalyst Development", "Characterization Techniques", "Performance Testing", "Kinetic Modeling", "Scale-up", "Manufacturing Support"] },
      { role: "Product Development Engineer", experienceLevel: "Junior", skillsRequired: ["Formulation Development", "Prototype Testing", "Market Analysis", "Scale-up Processes", "Quality Specifications", "Regulatory Compliance"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Process Design & Simulation",
      color: "blue",
      skills: [
        'Aspen Plus', 'Aspen HYSYS', 'CHEMCAD', 'Pro/II',
        'Process Flow Diagrams', 'P&ID Development', 'Equipment Sizing',
        'Heat & Mass Balance', 'Process Simulation', 'Dynamic Simulation',
        'Process Optimization', 'Cost Estimation', 'Economic Analysis',
        'Scale-up Technology', 'Process Intensification'
      ]
    },
    {
      id: 2,
      title: "Thermodynamics & Kinetics",
      color: "green",
      skills: [
        'Chemical Thermodynamics', 'Reaction Kinetics', 'Phase Equilibrium',
        'Transport Phenomena', 'Heat Transfer', 'Mass Transfer',
        'Fluid Mechanics', 'Reactor Design', 'Separations Technology',
        'Distillation Design', 'Absorption/Stripping', 'Extraction Processes',
        'Crystallization', 'Drying Processes', 'Membrane Separations'
      ]
    },
    {
      id: 3,
      title: "Process Equipment & Operations",
      color: "purple",
      skills: [
        'Pumps & Compressors', 'Heat Exchangers', 'Pressure Vessels',
        'Reactors', 'Distillation Columns', 'Absorbers/Strippers',
        'Filtration Equipment', 'Centrifuges', 'Mixers & Agitators',
        'Process Control Systems', 'Instrumentation', 'Valves & Piping',
        'Material Selection', 'Corrosion Engineering', 'Maintenance Engineering'
      ]
    },
    {
      id: 4,
      title: "Process Safety & Environmental",
      color: "orange",
      skills: [
        'Process Safety Management', 'HAZOP Studies', 'LOPA Analysis',
        'Risk Assessment', 'Safety Instrumented Systems', 'Emergency Response',
        'Environmental Regulations', 'Waste Treatment', 'Air Pollution Control',
        'Water Treatment', 'Environmental Impact Assessment', 'Sustainability',
        'Green Engineering', 'Carbon Management', 'Circular Economy'
      ]
    },
    {
      id: 5,
      title: "Materials & Polymers",
      color: "red",
      skills: [
        'Polymer Science', 'Material Science', 'Composite Materials',
        'Catalyst Technology', 'Corrosion Engineering', 'Material Selection',
        'Polymer Processing', 'Rheology', 'Material Characterization',
        'Failure Analysis', 'Surface Science', 'Nanomaterials',
        'Biomaterials', 'Ceramics', 'Metallurgy'
      ]
    },
    {
      id: 6,
      title: "Industry-Specific Processes",
      color: "teal",
      skills: [
        'Refinery Processes', 'Petrochemical Processes', 'Pharmaceutical Manufacturing',
        'Biotechnology Processes', 'Food Processing', 'Beverage Production',
        'Pulp & Paper Processes', 'Fertilizer Production', 'Water Treatment',
        'Waste Management', 'Energy Systems', 'Renewable Energy',
        'Mining & Minerals', 'Cement Production', 'Glass Manufacturing'
      ]
    },
    {
      id: 7,
      title: "Analytical & Laboratory Techniques",
      color: "blue",
      skills: [
        'Laboratory Safety', 'Analytical Chemistry', 'Spectroscopy',
        'Chromatography', 'Microscopy', 'Thermal Analysis',
        'Rheological Testing', 'Material Testing', 'Quality Control',
        'Statistical Analysis', 'Experimental Design', 'Data Analysis',
        'GMP/GLP Practices', 'Validation Methods', 'Documentation Systems'
      ]
    },
    {
      id: 8,
      title: "Regulatory & Quality Systems",
      color: "green",
      skills: [
        'GMP Compliance', 'FDA Regulations', 'Quality Systems',
        'Process Validation', 'Change Control', 'Documentation Control',
        'Auditing', 'Regulatory Submissions', 'Quality by Design',
        'Risk Management', 'CAPA Systems', 'Batch Record Review',
        'Standard Operating Procedures', 'Training Systems', 'Inspection Readiness'
      ]
    },
    {
      id: 9,
      title: "Project & Business Skills",
      color: "purple",
      skills: [
        'Project Management', 'Cost Estimation', 'Feasibility Studies',
        'Business Development', 'Technical Writing', 'Presentation Skills',
        'Team Leadership', 'Client Communication', 'Vendor Management',
        'Contract Management', 'Supply Chain Management', 'Market Analysis',
        'Intellectual Property', 'Patenting Processes', 'Technology Transfer'
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
          <h2 className="skills-title">Chemical Engineering Career Path</h2>
          <p className="skills-subtitle">
            Transform raw materials into valuable products. Select your skills to discover process engineering, plant design, and manufacturing roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Chemical Engineering Skills
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
            Chemical Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which chemical engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Process Engineering', 'Design & Simulation', 'Petrochemical & Refining',
                'Pharmaceutical & Biotechnology', 'Environmental & Sustainability', 'Food & Beverage Processing',
                'Materials & Polymers', 'Energy & Renewable Resources', 'Safety & Risk Management',
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
            Analyze My Chemical Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable chemical engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Chemical Engineering Roles</h3>
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