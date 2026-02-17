import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function CivilEngineering({ onBack }) {
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
    "Structural Engineering": [
      { role: "Structural Engineering Intern", experienceLevel: "Student", skillsRequired: ["Structural Analysis Basics", "CAD Basics", "Load Calculations", "Material Properties"] },
      { role: "Bridge Design Intern", experienceLevel: "Student", skillsRequired: ["Bridge Engineering Basics", "Design Codes", "CAD Drafting", "Material Selection"] },
      { role: "Building Design Intern", experienceLevel: "Student", skillsRequired: ["Building Systems", "Architectural Coordination", "Structural Concepts", "Drafting Skills"] },
      { role: "Structural Design Engineer", experienceLevel: "Junior", skillsRequired: ["Structural Analysis", "ETABS/STAAD.Pro", "Reinforced Concrete Design", "Steel Design", "Seismic Design", "Load Calculations"] },
      { role: "Bridge Engineer", experienceLevel: "Junior", skillsRequired: ["Bridge Design", "AASHTO Codes", "Pre-stressed Concrete", "Construction Methods", "Inspection Techniques", "CAD Software"] },
      { role: "Building Structures Engineer", experienceLevel: "Junior", skillsRequired: ["Building Codes", "Structural Systems", "Foundation Design", "Lateral Load Analysis", "Construction Documents", "Coordination"] }
    ],
    "Geotechnical Engineering": [
      { role: "Geotechnical Engineering Intern", experienceLevel: "Student", skillsRequired: ["Soil Mechanics Basics", "Lab Testing", "Field Investigation", "Data Collection"] },
      { role: "Foundation Design Intern", experienceLevel: "Student", skillsRequired: ["Foundation Types", "Soil Properties", "Bearing Capacity", "Site Investigation"] },
      { role: "Slope Stability Intern", experienceLevel: "Student", skillsRequired: ["Slope Analysis", "Soil Testing", "Geological Mapping", "Risk Assessment"] },
      { role: "Geotechnical Engineer", experienceLevel: "Junior", skillsRequired: ["Soil Testing", "Foundation Design", "Slope Stability", "Settlement Analysis", "Ground Improvement", "Field Investigation"] },
      { role: "Foundation Engineer", experienceLevel: "Junior", skillsRequired: ["Deep Foundations", "Shallow Foundations", "Pile Design", "Retaining Walls", "Soil-Structure Interaction", "Construction Monitoring"] },
      { role: "Geotechnical Analyst", experienceLevel: "Junior", skillsRequired: ["Finite Element Analysis", "Soil Modeling", "Seismic Analysis", "Risk Assessment", "Laboratory Testing", "Report Writing"] }
    ],
    "Transportation Engineering": [
      { role: "Transportation Engineering Intern", experienceLevel: "Student", skillsRequired: ["Traffic Engineering Basics", "CAD Basics", "Transportation Planning", "Data Collection"] },
      { role: "Highway Design Intern", experienceLevel: "Student", skillsRequired: ["Highway Geometry", "Design Standards", "Drafting Skills", "Safety Principles"] },
      { role: "Traffic Engineering Intern", experienceLevel: "Student", skillsRequired: ["Traffic Analysis", "Signal Timing", "Data Collection", "Simulation Basics"] },
      { role: "Highway Design Engineer", experienceLevel: "Junior", skillsRequired: ["Highway Geometric Design", "CAD/CAE Software", "Drainage Design", "Pavement Design", "Safety Standards", "Construction Documentation"] },
      { role: "Traffic Engineer", experienceLevel: "Junior", skillsRequired: ["Traffic Analysis", "Signal Design", "Transportation Planning", "Simulation Software", "Capacity Analysis", "Safety Studies"] },
      { role: "Transportation Planner", experienceLevel: "Junior", skillsRequired: ["Transportation Modeling", "GIS Applications", "Public Transit Planning", "Demand Forecasting", "Environmental Assessment", "Stakeholder Engagement"] }
    ],
    "Water Resources Engineering": [
      { role: "Water Resources Intern", experienceLevel: "Student", skillsRequired: ["Hydrology Basics", "Hydraulics Basics", "Water Systems", "Data Analysis"] },
      { role: "Hydrology Intern", experienceLevel: "Student", skillsRequired: ["Rainfall Analysis", "Runoff Calculation", "Flood Mapping", "GIS Basics"] },
      { role: "Hydraulic Modeling Intern", experienceLevel: "Student", skillsRequired: ["Hydraulic Models", "Pipe Networks", "Flow Analysis", "Software Basics"] },
      { role: "Hydrology Engineer", experienceLevel: "Junior", skillsRequired: ["Hydrologic Analysis", "Floodplain Mapping", "Stormwater Management", "Water Balance", "GIS Applications", "Regulatory Compliance"] },
      { role: "Hydraulic Engineer", experienceLevel: "Junior", skillsRequired: ["Hydraulic Modeling", "Pipe Network Design", "Pump Systems", "Open Channel Flow", "Water Distribution", "System Optimization"] },
      { role: "Water Resources Planner", experienceLevel: "Junior", skillsRequired: ["Water Management", "Climate Adaptation", "Sustainability Planning", "Stakeholder Coordination", "Policy Analysis", "Project Development"] }
    ],
    "Environmental Engineering": [
      { role: "Environmental Engineering Intern", experienceLevel: "Student", skillsRequired: ["Environmental Science", "Water Quality", "Waste Management", "Regulatory Basics"] },
      { role: "Water Treatment Intern", experienceLevel: "Student", skillsRequired: ["Water Treatment Processes", "Laboratory Testing", "Process Monitoring", "Quality Control"] },
      { role: "Wastewater Intern", experienceLevel: "Student", skillsRequired: ["Wastewater Systems", "Treatment Processes", "Environmental Monitoring", "Data Collection"] },
      { role: "Water/Wastewater Engineer", experienceLevel: "Junior", skillsRequired: ["Treatment Plant Design", "Process Engineering", "Pump Systems", "Disinfection Systems", "Regulatory Compliance", "Operation & Maintenance"] },
      { role: "Environmental Compliance Engineer", experienceLevel: "Junior", skillsRequired: ["Environmental Regulations", "Permitting", "Impact Assessment", "Monitoring Programs", "Reporting", "Auditing"] },
      { role: "Solid Waste Engineer", experienceLevel: "Junior", skillsRequired: ["Waste Management", "Landfill Design", "Recycling Systems", "Environmental Protection", "Facility Design", "Regulatory Compliance"] }
    ],
    "Construction Engineering & Management": [
      { role: "Construction Management Intern", experienceLevel: "Student", skillsRequired: ["Construction Methods", "Site Safety", "Basic Scheduling", "Quality Control"] },
      { role: "Field Engineering Intern", experienceLevel: "Student", skillsRequired: ["Site Layout", "Surveying Basics", "Inspection Procedures", "Documentation"] },
      { role: "Cost Estimating Intern", experienceLevel: "Student", skillsRequired: ["Quantity Takeoff", "Cost Analysis", "Material Pricing", "Bid Preparation"] },
      { role: "Construction Engineer", experienceLevel: "Junior", skillsRequired: ["Construction Methods", "Quality Control", "Safety Management", "Schedule Management", "Cost Control", "Subcontractor Coordination"] },
      { role: "Project Engineer", experienceLevel: "Junior", skillsRequired: ["Project Coordination", "Document Control", "Change Management", "Progress Reporting", "Quality Assurance", "Client Communication"] },
      { role: "Cost Estimator", experienceLevel: "Junior", skillsRequired: ["Quantity Takeoff", "Cost Analysis", "Bid Preparation", "Value Engineering", "Market Analysis", "Risk Assessment"] }
    ],
    "Surveying & Geomatics": [
      { role: "Surveying Intern", experienceLevel: "Student", skillsRequired: ["Surveying Basics", "Equipment Operation", "Field Measurements", "Data Recording"] },
      { role: "GIS Intern", experienceLevel: "Student", skillsRequired: ["GIS Software", "Data Collection", "Map Creation", "Spatial Analysis"] },
      { role: "Drone Surveying Intern", experienceLevel: "Student", skillsRequired: ["Drone Operations", "Aerial Mapping", "Photogrammetry", "Data Processing"] },
      { role: "Land Surveyor", experienceLevel: "Junior", skillsRequired: ["Boundary Surveys", "Topographic Surveys", "Construction Staking", "GPS Equipment", "Legal Principles", "CAD Drafting"] },
      { role: "GIS Specialist", experienceLevel: "Junior", skillsRequired: ["GIS Software", "Database Management", "Spatial Analysis", "Cartography", "Remote Sensing", "Data Integration"] },
      { role: "Geomatics Engineer", experienceLevel: "Junior", skillsRequired: ["Geodetic Surveying", "Photogrammetry", "LiDAR Processing", "3D Modeling", "Precision Surveying", "Data Analysis"] }
    ],
    "Urban Planning & Development": [
      { role: "Urban Planning Intern", experienceLevel: "Student", skillsRequired: ["Planning Principles", "Land Use", "Community Engagement", "Research Methods"] },
      { role: "Site Development Intern", experienceLevel: "Student", skillsRequired: ["Site Planning", "Grading Design", "Utility Layout", "Environmental Considerations"] },
      { role: "Infrastructure Planning Intern", experienceLevel: "Student", skillsRequired: ["Infrastructure Systems", "Capacity Analysis", "Growth Planning", "Sustainability Principles"] },
      { role: "Urban Planner", experienceLevel: "Junior", skillsRequired: ["Land Use Planning", "Zoning Regulations", "Community Development", "Transportation Planning", "Environmental Planning", "Public Engagement"] },
      { role: "Site Development Engineer", experienceLevel: "Junior", skillsRequired: ["Site Design", "Grading Plans", "Utility Design", "Stormwater Management", "Access Planning", "Environmental Compliance"] },
      { role: "Infrastructure Planner", experienceLevel: "Junior", skillsRequired: ["Infrastructure Assessment", "Capacity Planning", "Asset Management", "Renewal Planning", "Funding Strategies", "Risk Management"] }
    ],
    "Coastal & Marine Engineering": [
      { role: "Coastal Engineering Intern", experienceLevel: "Student", skillsRequired: ["Coastal Processes", "Wave Mechanics", "Sediment Transport", "Environmental Basics"] },
      { role: "Marine Structures Intern", experienceLevel: "Student", skillsRequired: ["Marine Construction", "Structural Basics", "Corrosion Protection", "Material Selection"] },
      { role: "Port Engineering Intern", experienceLevel: "Student", skillsRequired: ["Port Operations", "Navigation Systems", "Marine Facilities", "Safety Requirements"] },
      { role: "Coastal Engineer", experienceLevel: "Junior", skillsRequired: ["Coastal Processes", "Shoreline Protection", "Beach Nourishment", "Wave Analysis", "Sediment Management", "Environmental Impact"] },
      { role: "Marine Structures Engineer", experienceLevel: "Junior", skillsRequired: ["Marine Construction", "Offshore Structures", "Corrosion Engineering", "Wave Load Analysis", "Foundation Design", "Maintenance Planning"] },
      { role: "Port Engineer", experienceLevel: "Junior", skillsRequired: ["Port Planning", "Navigation Design", "Marine Facilities", "Dredging Engineering", "Operations Planning", "Safety Management"] }
    ],
    "Project Management & Consulting": [
      { role: "Engineering Consulting Intern", experienceLevel: "Student", skillsRequired: ["Technical Analysis", "Report Writing", "Client Communication", "Project Documentation"] },
      { role: "Project Coordination Intern", experienceLevel: "Student", skillsRequired: ["Schedule Tracking", "Meeting Coordination", "Document Control", "Progress Reporting"] },
      { role: "Quality Assurance Intern", experienceLevel: "Student", skillsRequired: ["Quality Standards", "Inspection Procedures", "Documentation Review", "Compliance Checking"] },
      { role: "Engineering Consultant", experienceLevel: "Junior", skillsRequired: ["Technical Analysis", "Client Management", "Proposal Writing", "Project Delivery", "Quality Assurance", "Business Development"] },
      { role: "Project Manager", experienceLevel: "Junior", skillsRequired: ["Project Planning", "Budget Management", "Risk Management", "Team Leadership", "Stakeholder Communication", "Contract Management"] },
      { role: "Quality Control Manager", experienceLevel: "Junior", skillsRequired: ["Quality Systems", "Inspection Procedures", "Compliance Auditing", "Documentation Control", "Corrective Actions", "Training"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Structural Analysis & Design",
      color: "blue",
      skills: [
        'Structural Analysis', 'Reinforced Concrete Design', 'Steel Structure Design',
        'ETABS', 'STAAD.Pro', 'SAP2000', 'RAM Structural System',
        'Seismic Design', 'Wind Load Analysis', 'Foundation Design',
        'Building Information Modeling (BIM)', 'Finite Element Analysis',
        'Load Calculations', 'Structural Dynamics', 'Composite Structures'
      ]
    },
    {
      id: 2,
      title: "Geotechnical & Foundation Engineering",
      color: "green",
      skills: [
        'Soil Mechanics', 'Foundation Engineering', 'Slope Stability Analysis',
        'Geotechnical Investigation', 'Retaining Wall Design', 'Pile Foundation Design',
        'Settlement Analysis', 'Soil Testing', 'Ground Improvement Techniques',
        'Geotechnical Software (PLAXIS, GeoStudio)', 'Earthquake Engineering',
        'Rock Mechanics', 'Geosynthetics', 'Foundation Settlement', 'Soil-Structure Interaction'
      ]
    },
    {
      id: 3,
      title: "Transportation & Highway Engineering",
      color: "purple",
      skills: [
        'Highway Geometric Design', 'Traffic Engineering', 'Transportation Planning',
        'Pavement Design', 'Intersection Design', 'Road Safety Analysis',
        'Microsimulation (VISSIM, Synchro)', 'Transportation Modeling',
        'Intelligent Transportation Systems', 'Public Transit Planning',
        'Parking Design', 'Pedestrian & Bicycle Facilities', 'Transportation Impact Studies',
        'Roadway Drainage', 'Construction Staging'
      ]
    },
    {
      id: 4,
      title: "Water Resources & Environmental",
      color: "orange",
      skills: [
        'Hydrology & Hydraulics', 'Water Distribution Systems', 'Stormwater Management',
        'Floodplain Analysis', 'Wastewater Treatment', 'Water Treatment Processes',
        'Environmental Impact Assessment', 'Water Quality Analysis',
        'Hydraulic Modeling (HEC-RAS, SWMM)', 'Groundwater Hydrology',
        'Sustainable Drainage Systems', 'Water Conservation', 'Environmental Regulations',
        'GIS Applications', 'Climate Change Adaptation'
      ]
    },
    {
      id: 5,
      title: "CAD & Design Software",
      color: "red",
      skills: [
        'AutoCAD Civil 3D', 'MicroStation', 'Revit', 'BIM 360',
        'ArcGIS', 'QGIS', 'SketchUp', 'Navisworks',
        'Tekla Structures', 'Advance Steel', 'InfraWorks',
        'Digital Terrain Modeling', '3D Visualization', 'Quantity Takeoff',
        'Construction Documentation', 'Coordination Drawings'
      ]
    },
    {
      id: 6,
      title: "Construction Management",
      color: "teal",
      skills: [
        'Project Planning & Scheduling', 'Cost Estimation', 'Contract Management',
        'Construction Methods', 'Quality Control & Assurance', 'Safety Management',
        'Primavera P6', 'Microsoft Project', 'Lean Construction',
        'Value Engineering', 'Risk Management', 'Claims Management',
        'Building Codes & Standards', 'Change Order Management', 'Subcontractor Management'
      ]
    },
    {
      id: 7,
      title: "Surveying & Geomatics",
      color: "blue",
      skills: [
        'Land Surveying', 'GPS/GNSS Surveying', 'Total Station Operation',
        'Drone Surveying', 'Photogrammetry', 'LiDAR Data Processing',
        'Boundary Surveying', 'Topographic Surveying', 'Construction Staking',
        'As-built Surveys', 'Monitoring Surveys', 'Hydrographic Surveying',
        'Survey Data Processing', 'CAD Mapping', 'Legal Survey Principles'
      ]
    },
    {
      id: 8,
      title: "Materials & Testing",
      color: "green",
      skills: [
        'Concrete Technology', 'Construction Materials Testing', 'Soil Testing',
        'Asphalt Mix Design', 'Material Specifications', 'Non-destructive Testing',
        'Quality Control Testing', 'Laboratory Management', 'Field Testing',
        'Corrosion Protection', 'Durability Analysis', 'Sustainability Assessment',
        'LEED Certification', 'Green Building Materials', 'Recycled Materials'
      ]
    },
    {
      id: 9,
      title: "Regulatory & Professional Skills",
      color: "purple",
      skills: [
        'Building Codes & Standards', 'Environmental Regulations', 'Permitting Processes',
        'Professional Ethics', 'Project Feasibility Studies', 'Technical Report Writing',
        'Client Communication', 'Stakeholder Engagement', 'Public Speaking',
        'Team Leadership', 'Problem Solving', 'Decision Making',
        'Budget Preparation', 'Proposal Writing', 'Business Development'
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
          <h2 className="skills-title">Civil Engineering Career Path</h2>
          <p className="skills-subtitle">
            Design, build, and maintain the infrastructure of our world. Select your skills to discover structural, transportation, and environmental engineering roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Civil Engineering Skills
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
            Civil Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which civil engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering',
                'Water Resources Engineering', 'Environmental Engineering', 'Construction Engineering & Management',
                'Surveying & Geomatics', 'Urban Planning & Development', 'Coastal & Marine Engineering',
                'Project Management & Consulting'
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
            Analyze My Civil Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable civil engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Civil Engineering Roles</h3>
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