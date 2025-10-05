import { useState } from 'react';
import './SkillsSection.css';
import RoadmapViewer from './RoadmapViewer';
import SkillTestModal from '../components/skill-tests/SkillTestModal'

export default function SkillsSection({ onBack }) {
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
    "Web Development": [
      { role: "Frontend Developer Intern", experienceLevel: "Student", skillsRequired: ["HTML", "CSS", "JavaScript", "React"] },
      { role: "Backend Developer Intern", experienceLevel: "Student", skillsRequired: ["Node.js", "Express.js", "MongoDB"] },
      { role: "Full Stack Developer Intern", experienceLevel: "Student", skillsRequired: ["HTML", "CSS", "JavaScript", "Node.js", "React"] },
      { role: "Frontend Developer", experienceLevel: "Junior", skillsRequired: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js", "REST APIs", "Git", "Testing"] },
      { role: "Backend Developer", experienceLevel: "Junior", skillsRequired: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "GraphQL", "Authentication", "Docker", "Testing"] },
      { role: "Full Stack Developer", experienceLevel: "Junior", skillsRequired: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "GraphQL", "Docker", "TypeScript"] }
    ],
    "Mobile Development": [
      { role: "Mobile App Developer Intern", experienceLevel: "Student", skillsRequired: ["Java", "Kotlin", "Swift"] },
      { role: "Flutter Developer Intern", experienceLevel: "Student", skillsRequired: ["Dart", "Flutter"] },
      { role: "React Native Developer Intern", experienceLevel: "Student", skillsRequired: ["JavaScript", "React Native"] },
      { role: "Mobile App Developer", experienceLevel: "Junior", skillsRequired: ["Java", "Kotlin", "Swift", "Dart", "Firebase", "UI/UX Basics", "Testing"] },
      { role: "Android Developer", experienceLevel: "Junior", skillsRequired: ["Java", "Kotlin", "Android Studio", "REST APIs", "Firebase", "Unit Testing"] },
      { role: "iOS Developer", experienceLevel: "Junior", skillsRequired: ["Swift", "Xcode", "REST APIs", "Mobile UI/UX", "Unit Testing"] },
      { role: "Flutter Developer", experienceLevel: "Junior", skillsRequired: ["Dart", "Flutter", "Firebase", "App Publishing", "Testing"] },
      { role: "React Native Developer", experienceLevel: "Junior", skillsRequired: ["JavaScript", "React Native", "Expo", "Mobile UI/UX", "Testing"] }
    ],
    "Data Science": [
      { role: "Data Analyst Intern", experienceLevel: "Student", skillsRequired: ["Python", "SQL", "Pandas"] },
      { role: "Junior Data Analyst Intern", experienceLevel: "Student", skillsRequired: ["Python", "Excel", "Data Visualization"] },
      { role: "Machine Learning Intern", experienceLevel: "Student", skillsRequired: ["Python", "NumPy", "Pandas"] },
      { role: "Junior Data Analyst", experienceLevel: "Junior", skillsRequired: ["Python", "SQL", "Excel", "Tableau", "Power BI", "Data Cleaning", "Data Visualization", "Statistics"] },
      { role: "Junior Data Scientist", experienceLevel: "Junior", skillsRequired: ["Python", "R", "SQL", "Scikit-learn", "Data Preprocessing", "Statistics", "Machine Learning"] },
      { role: "Business Intelligence Analyst", experienceLevel: "Junior", skillsRequired: ["SQL", "Power BI", "Tableau", "Data Visualization", "Reporting", "ETL"] },
      { role: "Data Engineer", experienceLevel: "Junior", skillsRequired: ["Python", "SQL", "ETL", "BigQuery", "Airflow", "Data Pipelines", "Cloud Platforms"] }
    ],
    "Artificial Intelligence": [
      { role: "AI Intern", experienceLevel: "Student", skillsRequired: ["Python", "Neural Networks", "NLP Basics"] },
      { role: "ML Research Intern", experienceLevel: "Student", skillsRequired: ["Python", "Data Preprocessing", "Statistics"] },
      { role: "Deep Learning Intern", experienceLevel: "Student", skillsRequired: ["Python", "TensorFlow", "PyTorch Basics"] },
      { role: "AI Engineer", experienceLevel: "Junior", skillsRequired: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "FastAPI", "Data Preprocessing"] },
      { role: "Research Assistant (AI/ML)", experienceLevel: "Junior", skillsRequired: ["Python", "Deep Learning", "Reinforcement Learning", "Data Preprocessing", "ML"] }
    ],
    "Cloud Computing": [
      { role: "Cloud Intern", experienceLevel: "Student", skillsRequired: ["AWS", "Azure", "GCP Basics"] },
      { role: "DevOps Intern", experienceLevel: "Student", skillsRequired: ["Docker Basics", "CI/CD Basics", "Cloud Concepts"] },
      { role: "Junior Cloud Intern", experienceLevel: "Student", skillsRequired: ["AWS Basics", "Networking", "Security Basics"] },
      { role: "Cloud Engineer", experienceLevel: "Junior", skillsRequired: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { role: "DevOps Engineer", experienceLevel: "Junior", skillsRequired: ["Python", "Bash", "Docker", "Jenkins", "Kubernetes", "CI/CD"] },
      { role: "Cloud Security Engineer", experienceLevel: "Junior", skillsRequired: ["AWS", "IAM", "Cloud Security", "Penetration Testing", "Encryption", "Monitoring"] }
    ],
    "Cybersecurity": [
      { role: "Security Analyst Intern", experienceLevel: "Student", skillsRequired: ["Network Security", "Wireshark", "Nmap"] },
      { role: "Junior Security Intern", experienceLevel: "Student", skillsRequired: ["Python Basics", "Cryptography Basics", "Log Monitoring"] },
      { role: "Cybersecurity Intern", experienceLevel: "Student", skillsRequired: ["Penetration Testing Basics", "Kali Linux", "Wireshark"] },
      { role: "SOC Analyst", experienceLevel: "Junior", skillsRequired: ["Incident Response", "Log Monitoring", "SIEM Tools", "Wireshark", "Python"] },
      { role: "Cybersecurity Analyst", experienceLevel: "Junior", skillsRequired: ["Python", "Penetration Testing", "Burp Suite", "Metasploit", "Cloud Security"] },
      { role: "Ethical Hacker", experienceLevel: "Junior", skillsRequired: ["Kali Linux", "Nmap", "Metasploit", "Vulnerability Scanning", "Reporting"] }
    ],
    "UI/UX Design": [
      { role: "UI/UX Intern", experienceLevel: "Student", skillsRequired: ["Figma", "Wireframing", "Prototyping"] },
      { role: "Product Design Intern", experienceLevel: "Student", skillsRequired: ["Figma Basics", "User Research", "Prototyping Basics"] },
      { role: "UI Designer", experienceLevel: "Junior", skillsRequired: ["Figma", "Adobe XD", "Sketch", "Responsive Design"] },
      { role: "Product Designer", experienceLevel: "Junior", skillsRequired: ["Figma", "Adobe XD", "Accessibility", "Prototyping", "User Testing"] }
    ],
    "Project Management": [
      { role: "Project Coordinator Intern", experienceLevel: "Student", skillsRequired: ["Agile", "Scrum", "Jira"] },
      { role: "Business Analyst Intern", experienceLevel: "Student", skillsRequired: ["Documentation", "Communication Basics", "Requirement Gathering Basics"] },
      { role: "Junior Project Manager", experienceLevel: "Junior", skillsRequired: ["Agile", "Scrum", "Jira", "Trello", "Risk Management", "Communication"] },
      { role: "Business Analyst", experienceLevel: "Junior", skillsRequired: ["Requirement Gathering", "Documentation", "Stakeholder Communication", "Agile"] }
    ],
    "Blockchain": [
      { role: "Blockchain Intern", experienceLevel: "Student", skillsRequired: ["Solidity", "Ethereum", "Smart Contracts"] },
      { role: "Smart Contract Intern", experienceLevel: "Student", skillsRequired: ["Solidity Basics", "Ethereum Basics", "Testing"] },
      { role: "Blockchain Developer", experienceLevel: "Junior", skillsRequired: ["Solidity", "Ethereum", "Hyperledger", "Smart Contracts", "Web3.js"] },
      { role: "Smart Contract Auditor", experienceLevel: "Junior", skillsRequired: ["Solidity", "Security Testing", "Smart Contract Auditing", "Cryptography"] }
    ],
    "Machine Learning": [
      { role: "ML Intern", experienceLevel: "Student", skillsRequired: ["Python", "Scikit-learn", "Pandas"] },
      { role: "Data Science Intern", experienceLevel: "Student", skillsRequired: ["Python Basics", "NumPy Basics", "Pandas Basics"] },
      { role: "Machine Learning Engineer", experienceLevel: "Junior", skillsRequired: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "Model Deployment", "Feature Engineering"] },
      { role: "MLOps Engineer", experienceLevel: "Junior", skillsRequired: ["Python", "MLflow", "Docker", "Kubernetes", "CI/CD", "Cloud Platforms"] }
    ]
  };

  const skillCategories = [ 
    {
      id: 1,
      title: "Programming Languages",
      color: "blue",
      skills: [
        'HTML', 'CSS', 'JavaScript', 'TypeScript',
        'Java', 'Kotlin', 'Swift', 'Dart',
        'Python', 'R', 'SQL', 'C++', 'Go', 'Rust', 'Solidity'
      ]
    },
    {
      id: 2,
      title: "Backend Technologies",
      color: "green",
      skills: [
        'Node.js', 'Express.js', 'Django', 'Flask',
        'Spring Boot', 'FastAPI', 'GraphQL',
        'Firebase', 'Supabase', 'Serverless', 'MongoDB', 'PostgreSQL'
      ]
    },
    {
      id: 3,
      title: "APIs & Web Services",
      color: "purple",
      skills: [
        'REST', 'GraphQL', 'gRPC',
        'OAuth', 'JWT Authentication',
        'WebSockets', 'Stripe API', 'Payment Gateways',
        'OpenAI API', 'Hugging Face API'
      ]
    },
    {
      id: 4,
      title: "Core Development Skills",
      color: "orange",
      skills: [
        'Responsive Design', 'Cross-Platform Development', 'PWAs', 
        'Data Cleaning', 'Data Visualization', 'Statistics',
        'Neural Networks', 'NLP', 'Computer Vision', 'Reinforcement Learning',
        'Network Security', 'Cloud Security', 'Penetration Testing', 'Cryptography',
        'Wireframing', 'Prototyping', 'User Research', 'Accessibility',
        'Agile', 'Scrum', 'Kanban', 'Risk Management', 'Communication'
      ]
    },
    {
      id: 5,
      title: "Development Tools & Platforms",
      color: "red",
      skills: [
        'Git', 'GitHub', 'VS Code', 'Postman',
        'Android Studio', 'Xcode', 'React Native', 'Flutter',
        'Jupyter', 'Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Power BI',
        'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn',
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
        'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit',
        'Figma', 'Adobe XD', 'Sketch',
        'Jira', 'Trello', 'Asana', 'MS Project',
        'Ethereum', 'Hyperledger', 'Truffle', 'Metamask'
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
    red: 'bg-red-500'
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
          <span>Back to Home</span>
        </button>

        <div className="skills-header">
          <h2 className="skills-title">Tell Us About Yourself</h2>
          <p className="skills-subtitle">
            Let's personalize your career journey. Add your skills and interests to get tailored recommendations.
          </p>
        </div>

        {/* Skills Input */}
        <div className="skills-card">
          <h3 className="skills-main-title">
            <span className="title-badge">1</span>
            Your Skills
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
            Career Interests
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What career paths are you interested in? (Select multiple)
            </label>
            <div className="interests-grid">
              {[
                'Web Development','Mobile Development','Data Science','Artificial Intelligence',
                'Cloud Computing','Cybersecurity','UI/UX Design','Project Management',
                'Machine Learning','Blockchain'
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
            Analyze My Career Path ›
          </button>
          <p className="submit-note">
            {selectedSkills.length === 0 
              ? 'Select some skills to analyze career paths' 
              : 'We\'ll match your skills with suitable job roles'}
          </p>
        </div>

        {/* Job Recommendations Section */}
        {showJobRecommendations && (
          <div className="job-recommendations-card">
            <h3 className="section-title">Recommended Job Roles</h3>
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
                        <span className="experience-level-tag">{job.originalExperienceLevel}</span>
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
          <span>Return to Home</span>
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