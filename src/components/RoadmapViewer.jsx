import { useState, useEffect } from 'react';
import './RoadmapViewer.css';

export default function RoadmapViewer({ role, onBack }) {
  const [imageExists, setImageExists] = useState(true);
  const [loading, setLoading] = useState(true);

  // Map role names to single image filenames
  const roadmapImages = {
    // Web Development Interns
    "Frontend Developer Intern": "roadmaps/frontend-intern-1.jpeg",
    "Backend Developer Intern": "/roadmaps/backend-intern-1.jpeg",
    "Full Stack Developer Intern": "/roadmaps/fullstack-intern-1.jpeg",
    // Junior Web Dev
    "Frontend Developer": "/roadmaps/frontend-1.jpeg",
    "Backend Developer": "/roadmaps/backend-1.jpeg",
    "Full Stack Developer": "/roadmaps/fullstack-developer-1.jpg",

    // Mobile Development Interns
    "Mobile App Developer Intern": "/roadmaps/mobile-intern-1.jpg",
    "Flutter Developer Intern": "/roadmaps/flutter-intern-1.jpg",
    "React Native Developer Intern": "/roadmaps/react-native-intern-1.jpg",
    // Junior Mobile Dev
    "Mobile App Developer": "/roadmaps/mobile-developer-1.jpg",
    "Flutter Developer": "/roadmaps/flutter-developer-1.jpg",
    "React Native Developer": "/roadmaps/react-native-developer-1.jpg",
    "Android Developer": "/roadmaps/android-developer-1.jpg",
    "iOS Developer": "/roadmaps/ios-developer-1.jpg",

    // Data Science Interns
    "Data Analyst Intern": "/roadmaps/data-analyst-intern-1.jpg",
    "Data Scientist Intern": "/roadmaps/data-scientist-intern-1.jpg",
    "BI Analyst Intern": "/roadmaps/bi-analyst-intern-1.jpg",
    // Junior Data Science
    "Junior Data Analyst": "/roadmaps/data-analyst-1.jpg",
    "Junior Data Scientist": "/roadmaps/data-scientist-1.jpg",
    "Business Intelligence Analyst": "/roadmaps/bi-analyst-1.jpg",
    "Data Engineer": "/roadmaps/data-engineer-1.jpg",

    // AI Interns
    "AI Intern": "/roadmaps/ai-intern-1.jpg",
    "ML Intern": "/roadmaps/ml-intern-1.jpg",
    "Research Assistant Intern": "/roadmaps/ai-research-intern-1.jpg",
    // Junior AI
    "AI Engineer": "/roadmaps/ai-engineer-1.jpg",
    "Research Assistant (AI/ML)": "/roadmaps/ai-research-1.jpg",
    "Machine Learning Engineer": "/roadmaps/ml-engineer-1.jpg",
    "MLOps Engineer": "/roadmaps/mlops-engineer-1.jpg",

    // Cloud Interns
    "Cloud Intern": "/roadmaps/cloud-intern-1.jpg",
    "DevOps Intern": "/roadmaps/devops-intern-1.jpg",
    "Cloud Security Intern": "/roadmaps/cloud-security-intern-1.jpg",
    // Junior Cloud
    "Cloud Engineer": "/roadmaps/cloud-engineer-1.jpg",
    "DevOps Engineer": "/roadmaps/devops-engineer-1.jpg",
    "Cloud Security Engineer": "/roadmaps/cloud-security-1.jpg",

    // Cybersecurity Interns
    "Security Analyst Intern": "/roadmaps/security-intern-1.jpg",
    "Penetration Tester Intern": "/roadmaps/pen-test-intern-1.jpg",
    "SOC Analyst Intern": "/roadmaps/soc-intern-1.jpg",
    // Junior Cybersecurity
    "SOC Analyst": "/roadmaps/soc-analyst-1.jpg",
    "Cybersecurity Analyst": "/roadmaps/cybersecurity-analyst-1.jpg",
    "Ethical Hacker": "/roadmaps/ethical-hacker-1.jpg",

    // UI/UX Interns
    "UI/UX Intern": "/roadmaps/uiux-intern-1.jpg",
    "Visual Designer Intern": "/roadmaps/visual-designer-intern-1.jpg",
    "Product Designer Intern": "/roadmaps/product-designer-intern-1.jpg",
    // Junior UI/UX
    "UI Designer": "/roadmaps/ui-designer-1.jpg",
    "Product Designer": "/roadmaps/product-designer-1.jpg",

    // Project Management Interns
    "Project Coordinator Intern": "/roadmaps/project-coordinator-1.jpg",
    "Junior Project Manager Intern": "/roadmaps/junior-project-manager-intern-1.jpg",
    "Business Analyst Intern": "/roadmaps/business-analyst-intern-1.jpg",
    // Junior PM
    "Junior Project Manager": "/roadmaps/project-manager-1.jpg",
    "Business Analyst": "/roadmaps/business-analyst-1.jpg",

    // Blockchain Interns
    "Blockchain Intern": "/roadmaps/blockchain-intern-1.jpg",
    "Smart Contract Intern": "/roadmaps/smart-contract-intern-1.jpg",
    "Web3 Intern": "/roadmaps/web3-intern-1.jpg",
    // Junior Blockchain
    "Blockchain Developer": "/roadmaps/blockchain-developer-1.jpg",
    "Smart Contract Auditor": "/roadmaps/smart-contract-auditor-1.jpg",

    // Machine Learning Interns
    "ML Intern": "/roadmaps/ml-intern-1.jpg",
    "AI/ML Intern": "/roadmaps/ai-ml-intern-1.jpg",
    "Data Science Intern": "/roadmaps/data-science-intern-1.jpg",
    // Junior ML
    "Machine Learning Engineer": "/roadmaps/ml-engineer-1.jpg",
    "MLOps Engineer": "/roadmaps/mlops-engineer-1.jpg"
  };

  const image = roadmapImages[role];

  useEffect(() => {
    if (!image) {
      setImageExists(false);
      setLoading(false);
      return;
    }

    const checkImageExists = () => {
      const img = new Image();
      img.onload = () => { setImageExists(true); setLoading(false); };
      img.onerror = () => { setImageExists(false); setLoading(false); };
      img.src = image;
    };

    setLoading(true);
    checkImageExists();
  }, [image, role]);

  const downloadImage = () => {
    if (image && imageExists) {
      const link = document.createElement('a');
      link.href = image;
      link.download = `${role.replace(/\s+/g, '-').toLowerCase()}-roadmap.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="roadmap-viewer-container">
        <div className="roadmap-header">
          <button onClick={onBack} className="back-button">← Back to Results</button>
          <h1>Loading Roadmap...</h1>
        </div>
      </div>
    );
  }

  if (!image || !imageExists) {
    return (
      <div className="roadmap-viewer-container">
        <div className="roadmap-header">
          <button onClick={onBack} className="back-button">← Back to Results</button>
          <h1>Roadmap Not Available</h1>
          <p>Roadmap for {role} is currently under development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-viewer-container">
      <div className="roadmap-header">
        <button onClick={onBack} className="back-button">← Back to Results</button>
        <div className="header-content">
          <h1 className="roadmap-title">{role} Roadmap</h1>
          <div className="header-actions">
            <button onClick={downloadImage} className="download-btn">Download Roadmap</button>
          </div>
        </div>
      </div>
      <div className="roadmap-content">
        <div className="image-container">
          <img src={image} alt={`${role} Roadmap`} className="roadmap-image" />
        </div>
      </div>
      <div className="roadmap-info">
        <h3>About this Roadmap</h3>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <div>
              <h4>Learning Path</h4>
              <p>Step-by-step guide to become a {role}</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">⏱️</span>
            <div>
              <h4>Time Commitment</h4>
              <p>Estimated 6-12 months for mastery</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">💡</span>
            <div>
              <h4>Pro Tips</h4>
              <p>Follow the sequence and build projects</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button onClick={onBack} className="back-button bottom">← Back to Results</button>
      </div>
    </div>
  );
}
