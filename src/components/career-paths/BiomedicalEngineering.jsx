import { useState } from 'react';
import '../SkillsSection.css'; // Correct path: go up one level from career-paths
import RoadmapViewer from '../RoadmapViewer'; // Correct path: go up one level from career-paths
import SkillTestModal from '../skill-tests/SkillTestModal';

export default function BiomedicalEngineering({ onBack }) {
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
    "Medical Device Design": [
      { role: "Medical Device Design Intern", experienceLevel: "Student", skillsRequired: ["CAD Basics", "Design Principles", "Medical Device Basics", "Prototyping"] },
      { role: "Biomedical Design Intern", experienceLevel: "Student", skillsRequired: ["Product Design", "User Research", "Regulatory Basics", "Testing Methods"] },
      { role: "Device Testing Intern", experienceLevel: "Student", skillsRequired: ["Testing Protocols", "Data Collection", "Quality Control", "Documentation"] },
      { role: "Medical Device Engineer", experienceLevel: "Junior", skillsRequired: ["SolidWorks/CATIA", "Design for Manufacturing", "Risk Analysis", "Prototyping", "Testing", "Regulatory Compliance"] },
      { role: "R&D Engineer (Medical Devices)", experienceLevel: "Junior", skillsRequired: ["Concept Development", "Prototype Testing", "Design Validation", "Clinical Evaluation", "Technical Documentation", "Intellectual Property"] },
      { role: "Biomedical Design Engineer", experienceLevel: "Junior", skillsRequired: ["Human Factors Engineering", "Ergonomics", "User Interface Design", "Clinical Workflow", "Safety Engineering", "Cost Analysis"] }
    ],
    "Biomaterials & Tissue Engineering": [
      { role: "Biomaterials Intern", experienceLevel: "Student", skillsRequired: ["Material Science Basics", "Cell Culture", "Laboratory Techniques", "Testing Methods"] },
      { role: "Tissue Engineering Intern", experienceLevel: "Student", skillsRequired: ["Cell Biology", "Scaffold Design", "Sterile Techniques", "Microscopy"] },
      { role: "Regenerative Medicine Intern", experienceLevel: "Student", skillsRequired: ["Stem Cell Basics", "Tissue Culture", "Bioreactor Systems", "Characterization Methods"] },
      { role: "Biomaterials Engineer", experienceLevel: "Junior", skillsRequired: ["Material Characterization", "Biocompatibility Testing", "Surface Modification", "Degradation Analysis", "Sterilization Methods", "Regulatory Testing"] },
      { role: "Tissue Engineer", experienceLevel: "Junior", skillsRequired: ["Scaffold Design", "Cell-Scaffold Interactions", "Bioreactor Systems", "Tissue Characterization", "Animal Models", "Clinical Translation"] },
      { role: "Regenerative Medicine Engineer", experienceLevel: "Junior", skillsRequired: ["Stem Cell Technology", "Growth Factor Delivery", "3D Bioprinting", "Organ-on-a-Chip", "Preclinical Testing", "Regulatory Pathways"] }
    ],
    "Medical Imaging & Diagnostics": [
      { role: "Medical Imaging Intern", experienceLevel: "Student", skillsRequired: ["Imaging Physics", "Signal Processing", "Image Analysis", "Medical Physics"] },
      { role: "Diagnostics Intern", experienceLevel: "Student", skillsRequired: ["Diagnostic Principles", "Biosensors", "Lab-on-a-Chip", "Data Analysis"] },
      { role: "Biomedical Signal Processing Intern", experienceLevel: "Student", skillsRequired: ["Signal Analysis", "MATLAB/Python", "Filter Design", "Data Collection"] },
      { role: "Medical Imaging Engineer", experienceLevel: "Junior", skillsRequired: ["Image Reconstruction", "Signal Processing", "Instrumentation Design", "Quality Control", "Safety Testing", "Clinical Integration"] },
      { role: "Diagnostic Device Engineer", experienceLevel: "Junior", skillsRequired: ["Biosensor Design", "Microfluidics", "Point-of-Care Testing", "Assay Development", "Clinical Validation", "Regulatory Submission"] },
      { role: "Biomedical Signal Processing Engineer", experienceLevel: "Junior", skillsRequired: ["Signal Analysis Algorithms", "Feature Extraction", "Machine Learning", "Real-time Processing", "Clinical Data Analysis", "Software Development"] }
    ],
    "Biomechanics & Rehabilitation": [
      { role: "Biomechanics Intern", experienceLevel: "Student", skillsRequired: ["Biomechanics Basics", "Motion Analysis", "Force Measurement", "Data Collection"] },
      { role: "Rehabilitation Engineering Intern", experienceLevel: "Student", skillsRequired: ["Assistive Technology", "Prosthetics/Orthotics", "Human Movement", "Patient Assessment"] },
      { role: "Sports Medicine Intern", experienceLevel: "Student", skillsRequired: ["Sports Biomechanics", "Injury Analysis", "Performance Testing", "Wearable Sensors"] },
      { role: "Biomechanics Engineer", experienceLevel: "Junior", skillsRequired: ["Motion Analysis Systems", "Finite Element Analysis", "Biomechanical Modeling", "Injury Analysis", "Gait Analysis", "Clinical Research"] },
      { role: "Rehabilitation Engineer", experienceLevel: "Junior", skillsRequired: ["Prosthetic Design", "Orthotic Systems", "Assistive Technology", "Human-Machine Interface", "Patient Fitting", "Clinical Trials"] },
      { role: "Sports Engineering Specialist", experienceLevel: "Junior", skillsRequired: ["Sports Equipment Design", "Injury Prevention", "Performance Monitoring", "Wearable Technology", "Athlete Assessment", "Biomechanical Testing"] }
    ],
    "Neural Engineering & Neurotechnology": [
      { role: "Neural Engineering Intern", experienceLevel: "Student", skillsRequired: ["Neuroscience Basics", "Electrophysiology", "Signal Processing", "Neural Interfaces"] },
      { role: "Brain-Computer Interface Intern", experienceLevel: "Student", skillsRequired: ["EEG/ECoG", "Signal Acquisition", "Pattern Recognition", "Experimental Design"] },
      { role: "Neuromodulation Intern", experienceLevel: "Student", skillsRequired: ["Stimulation Systems", "Neural Circuits", "Safety Protocols", "Device Testing"] },
      { role: "Neural Interface Engineer", experienceLevel: "Junior", skillsRequired: ["Neural Recording Systems", "Brain-Computer Interfaces", "Signal Processing Algorithms", "Implantable Devices", "Biocompatibility", "Preclinical Testing"] },
      { role: "Neuromodulation Engineer", experienceLevel: "Junior", skillsRequired: ["Deep Brain Stimulation", "Spinal Cord Stimulation", "Vagus Nerve Stimulation", "Dose Optimization", "Safety Systems", "Clinical Protocols"] },
      { role: "Neurodiagnostic Engineer", experienceLevel: "Junior", skillsRequired: ["EEG Systems", "MEG Technology", "fNIRS", "Data Analysis", "Clinical Interpretation", "Device Development"] }
    ],
    "Pharmaceutical Engineering & Drug Delivery": [
      { role: "Drug Delivery Intern", experienceLevel: "Student", skillsRequired: ["Pharmacokinetics", "Drug Formulation", "Delivery Systems", "Laboratory Techniques"] },
      { role: "Biopharmaceutical Intern", experienceLevel: "Student", skillsRequired: ["Biologics Basics", "Protein Engineering", "Cell Culture", "Purification Methods"] },
      { role: "Nanomedicine Intern", experienceLevel: "Student", skillsRequired: ["Nanotechnology", "Drug Carriers", "Targeted Delivery", "Characterization"] },
      { role: "Drug Delivery Engineer", experienceLevel: "Junior", skillsRequired: ["Controlled Release Systems", "Nanoparticle Design", "Implantable Devices", "PK/PD Modeling", "Formulation Development", "Preclinical Testing"] },
      { role: "Biopharmaceutical Engineer", experienceLevel: "Junior", skillsRequired: ["Protein Engineering", "Cell Line Development", "Bioprocess Optimization", "Purification Systems", "Analytical Methods", "Regulatory Compliance"] },
      { role: "Nanomedicine Engineer", experienceLevel: "Junior", skillsRequired: ["Nanoparticle Synthesis", "Surface Functionalization", "Targeting Strategies", "Characterization Techniques", "Toxicity Testing", "Clinical Translation"] }
    ],
    "Clinical Engineering & Healthcare Technology": [
      { role: "Clinical Engineering Intern", experienceLevel: "Student", skillsRequired: ["Medical Equipment", "Hospital Systems", "Safety Standards", "Maintenance Basics"] },
      { role: "Healthcare Technology Intern", experienceLevel: "Student", skillsRequired: ["Hospital IT", "Medical Software", "Data Security", "System Integration"] },
      { role: "Medical Equipment Intern", experienceLevel: "Student", skillsRequired: ["Equipment Testing", "Calibration", "Troubleshooting", "Documentation"] },
      { role: "Clinical Engineer", experienceLevel: "Junior", skillsRequired: ["Medical Equipment Management", "Risk Assessment", "Technology Assessment", "Clinical Training", "Regulatory Compliance", "Hospital Systems"] },
      { role: "Healthcare Technology Manager", experienceLevel: "Junior", skillsRequired: ["Technology Planning", "Vendor Management", "Budgeting", "Staff Training", "Quality Assurance", "Patient Safety"] },
      { role: "Medical Equipment Specialist", experienceLevel: "Junior", skillsRequired: ["Equipment Testing", "Preventive Maintenance", "Repair Procedures", "Calibration Systems", "Inventory Management", "Safety Inspections"] }
    ],
    "Biomedical Data Science & AI": [
      { role: "Biomedical Data Science Intern", experienceLevel: "Student", skillsRequired: ["Python/R Basics", "Data Analysis", "Statistical Methods", "Healthcare Data"] },
      { role: "Medical AI Intern", experienceLevel: "Student", skillsRequired: ["Machine Learning Basics", "Image Analysis", "Feature Extraction", "Algorithm Development"] },
      { role: "Health Informatics Intern", experienceLevel: "Student", skillsRequired: ["Electronic Health Records", "Data Standards", "Healthcare Systems", "Privacy Regulations"] },
      { role: "Biomedical Data Scientist", experienceLevel: "Junior", skillsRequired: ["Python/R Programming", "Statistical Analysis", "Clinical Trial Data", "Predictive Modeling", "Data Visualization", "Regulatory Reporting"] },
      { role: "Medical AI Engineer", experienceLevel: "Junior", skillsRequired: ["Deep Learning", "Medical Image Analysis", "Natural Language Processing", "Algorithm Validation", "Clinical Integration", "Ethical Considerations"] },
      { role: "Health Informatics Specialist", experienceLevel: "Junior", skillsRequired: ["EHR Systems", "HL7/FHIR Standards", "Interoperability", "Data Security", "Clinical Workflow", "System Implementation"] }
    ],
    "Regulatory Affairs & Quality Assurance": [
      { role: "Regulatory Affairs Intern", experienceLevel: "Student", skillsRequired: ["Regulatory Basics", "Documentation", "Quality Systems", "Standards Research"] },
      { role: "Quality Assurance Intern", experienceLevel: "Student", skillsRequired: ["Quality Systems", "Inspection Procedures", "Document Control", "Compliance Checking"] },
      { role: "Clinical Affairs Intern", experienceLevel: "Student", skillsRequired: ["Clinical Trial Basics", "Regulatory Submissions", "Ethical Guidelines", "Document Management"] },
      { role: "Regulatory Affairs Specialist", experienceLevel: "Junior", skillsRequired: ["FDA/EMA Regulations", "510(k)/PMA Submissions", "Technical File Preparation", "Standards Compliance", "Audit Preparation", "Labeling Requirements"] },
      { role: "Quality Assurance Engineer", experienceLevel: "Junior", skillsRequired: ["Quality Management Systems", "Process Validation", "CAPA Systems", "Audit Management", "Supplier Quality", "Risk Management"] },
      { role: "Clinical Affairs Specialist", experienceLevel: "Junior", skillsRequired: ["Clinical Trial Management", "Protocol Development", "Regulatory Submissions", "Ethical Committee Coordination", "Data Monitoring", "Study Reporting"] }
    ],
    "Biomedical Research & Development": [
      { role: "Biomedical Research Intern", experienceLevel: "Student", skillsRequired: ["Laboratory Techniques", "Experimental Design", "Data Collection", "Literature Review"] },
      { role: "Translational Research Intern", experienceLevel: "Student", skillsRequired: ["Bench-to-Bedside", "Preclinical Models", "Clinical Translation", "Technology Transfer"] },
      { role: "Biomedical Innovation Intern", experienceLevel: "Student", skillsRequired: ["Innovation Methods", "Prototype Development", "Intellectual Property", "Market Analysis"] },
      { role: "Biomedical Research Scientist", experienceLevel: "Junior", skillsRequired: ["Experimental Design", "Data Analysis", "Scientific Writing", "Grant Applications", "Collaborative Research", "Publication"] },
      { role: "Translational Scientist", experienceLevel: "Junior", skillsRequired: ["Preclinical Testing", "Clinical Trial Design", "Regulatory Strategy", "Technology Transfer", "Commercialization", "Startup Development"] },
      { role: "Biomedical Innovation Engineer", experienceLevel: "Junior", skillsRequired: ["Design Thinking", "Prototype Development", "Intellectual Property Strategy", "Business Development", "Funding Applications", "Partnership Building"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Medical Device Design & Engineering",
      color: "blue",
      skills: [
        'SolidWorks', 'CATIA', 'AutoCAD', 'Medical Device Design',
        'Design for Manufacturing', 'Risk Analysis', 'Prototyping',
        'Human Factors Engineering', 'Ergonomics', 'Biomechanics',
        'Finite Element Analysis', 'Materials Selection', 'Tolerance Analysis',
        'Design Validation', 'Clinical Evaluation'
      ]
    },
    {
      id: 2,
      title: "Biomaterials & Tissue Engineering",
      color: "green",
      skills: [
        'Biomaterials Science', 'Biocompatibility Testing', 'Tissue Engineering',
        'Scaffold Design', '3D Bioprinting', 'Cell Culture Techniques',
        'Stem Cell Technology', 'Surface Modification', 'Degradation Analysis',
        'Sterilization Methods', 'Animal Models', 'Histology',
        'Immunohistochemistry', 'Molecular Biology', 'Protein Engineering'
      ]
    },
    {
      id: 3,
      title: "Medical Imaging & Signal Processing",
      color: "purple",
      skills: [
        'Medical Imaging (MRI, CT, Ultrasound)', 'Image Processing', 'Signal Processing',
        'MATLAB', 'Python', 'Image Reconstruction', 'Feature Extraction',
        'Machine Learning', 'Deep Learning', 'Pattern Recognition',
        'Biosensors', 'Microfluidics', 'Lab-on-a-Chip', 'Point-of-Care Diagnostics',
        'Clinical Data Analysis'
      ]
    },
    {
      id: 4,
      title: "Regulatory Affairs & Quality Systems",
      color: "orange",
      skills: [
        'FDA Regulations', 'ISO 13485', 'Quality Management Systems',
        '510(k) Submissions', 'PMA Process', 'Clinical Trial Regulations',
        'Risk Management (ISO 14971)', 'Design Controls', 'Process Validation',
        'CAPA Systems', 'Audit Management', 'Technical File Preparation',
        'Labeling Requirements', 'Post-Market Surveillance', 'Medical Device Reporting'
      ]
    },
    {
      id: 5,
      title: "Clinical & Healthcare Systems",
      color: "red",
      skills: [
        'Clinical Engineering', 'Hospital Systems', 'Medical Equipment Management',
        'Patient Safety', 'Healthcare IT', 'Electronic Health Records',
        'HL7/FHIR Standards', 'Interoperability', 'Data Security (HIPAA)',
        'Clinical Workflow', 'Telemedicine', 'Remote Monitoring',
        'Healthcare Analytics', 'Patient Monitoring Systems', 'Medical Software'
      ]
    },
    {
      id: 6,
      title: "Biomechanics & Rehabilitation",
      color: "teal",
      skills: [
        'Biomechanical Analysis', 'Motion Capture Systems', 'Gait Analysis',
        'Prosthetic Design', 'Orthotic Systems', 'Assistive Technology',
        'Rehabilitation Engineering', 'Sports Biomechanics', 'Injury Analysis',
        'Wearable Sensors', 'Human-Machine Interface', 'Robotic Rehabilitation',
        'Force Measurement', 'Pressure Mapping', 'Motion Analysis'
      ]
    },
    {
      id: 7,
      title: "Neural Engineering & Neurotechnology",
      color: "blue",
      skills: [
        'Neural Interfaces', 'Brain-Computer Interfaces', 'EEG/ECoG',
        'Deep Brain Stimulation', 'Neuromodulation', 'Neural Recording',
        'Signal Processing Algorithms', 'Implantable Devices', 'Neurostimulation',
        'Neurodiagnostics', 'Neural Prosthetics', 'Cognitive Neuroscience',
        'Neuroimaging Analysis', 'Closed-loop Systems', 'Neural Circuit Analysis'
      ]
    },
    {
      id: 8,
      title: "Drug Delivery & Pharmaceutical Engineering",
      color: "green",
      skills: [
        'Drug Delivery Systems', 'Controlled Release', 'Nanomedicine',
        'Pharmacokinetics/Pharmacodynamics', 'Formulation Development',
        'Bioprocess Engineering', 'Protein Therapeutics', 'Cell Therapy',
        'Gene Delivery', 'Implantable Devices', 'Transdermal Systems',
        'Inhalation Technology', 'Targeted Delivery', 'Preclinical Testing',
        'Clinical Trial Design'
      ]
    },
    {
      id: 9,
      title: "Research & Laboratory Techniques",
      color: "purple",
      skills: [
        'Cell Culture', 'Molecular Biology', 'Immunology', 'Histology',
        'Microscopy', 'Flow Cytometry', 'ELISA', 'PCR', 'Western Blot',
        'Animal Handling', 'Surgical Techniques', 'Statistical Analysis',
        'Experimental Design', 'Scientific Writing', 'Grant Writing',
        'Intellectual Property', 'Technology Transfer'
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
          <h2 className="skills-title">Biomedical Engineering Career Path</h2>
          <p className="skills-subtitle">
            Bridge engineering and medicine to improve healthcare. Select your skills to discover medical device, biotechnology, and healthcare technology roles.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Biomedical Engineering Skills
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
            Biomedical Engineering Specializations
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Which biomedical engineering areas interest you? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Medical Device Design', 'Biomaterials & Tissue Engineering', 'Medical Imaging & Diagnostics',
                'Biomechanics & Rehabilitation', 'Neural Engineering & Neurotechnology', 'Pharmaceutical Engineering & Drug Delivery',
                'Clinical Engineering & Healthcare Technology', 'Biomedical Data Science & AI', 'Regulatory Affairs & Quality Assurance',
                'Biomedical Research & Development'
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
            Analyze My Biomedical Engineering Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable biomedical engineering roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Biomedical Engineering Roles</h3>
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