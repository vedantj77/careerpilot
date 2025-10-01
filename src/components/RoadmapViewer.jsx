import { useState } from 'react';
import './RoadmapViewer.css';

export default function RoadmapViewer({ role, onBack }) {
  // Map role names to single image filenames
  const roadmapImages = {
    "Frontend Developer Intern": "/roadmaps/frontend-intern-1.jpeg",
    "Frontend Developer": "/roadmaps/frontend-developer-1.jpg",
    "Full Stack Developer": "/roadmaps/fullstack-developer-1.jpg",
    "Mobile App Intern": "/roadmaps/mobile-intern-1.jpg",
    "Android Developer": "/roadmaps/android-developer-1.jpg",
    "iOS Developer": "/roadmaps/ios-developer-1.jpg",
    "Flutter Developer": "/roadmaps/flutter-developer-1.jpg",
    "React Native Developer": "/roadmaps/react-native-developer-1.jpg",
    "Data Analyst Intern": "/roadmaps/data-analyst-intern-1.jpg",
    "Junior Data Analyst": "/roadmaps/data-analyst-1.jpg",
    "Junior Data Scientist": "/roadmaps/data-scientist-1.jpg",
    "Business Intelligence Analyst": "/roadmaps/bi-analyst-1.jpg",
    "Data Engineer": "/roadmaps/data-engineer-1.jpg",
    "AI Intern": "/roadmaps/ai-intern-1.jpg",
    "AI Engineer": "/roadmaps/ai-engineer-1.jpg",
    "Research Assistant (AI/ML)": "/roadmaps/ai-research-1.jpg",
    "Cloud Intern": "/roadmaps/cloud-intern-1.jpg",
    "Cloud Engineer": "/roadmaps/cloud-engineer-1.jpg",
    "DevOps Engineer": "/roadmaps/devops-engineer-1.jpg",
    "Cloud Security Engineer": "/roadmaps/cloud-security-1.jpg",
    "Security Analyst Intern": "/roadmaps/security-intern-1.jpg",
    "SOC Analyst": "/roadmaps/soc-analyst-1.jpg",
    "Cybersecurity Analyst": "/roadmaps/cybersecurity-analyst-1.jpg",
    "Ethical Hacker": "/roadmaps/ethical-hacker-1.jpg",
    "UI/UX Intern": "/roadmaps/uiux-intern-1.jpg",
    "UI Designer": "/roadmaps/ui-designer-1.jpg",
    "Product Designer": "/roadmaps/product-designer-1.jpg",
    "Project Coordinator Intern": "/roadmaps/project-coordinator-1.jpg",
    "Junior Project Manager": "/roadmaps/project-manager-1.jpg",
    "Business Analyst": "/roadmaps/business-analyst-1.jpg",
    "Blockchain Intern": "/roadmaps/blockchain-intern-1.jpg",
    "Blockchain Developer": "/roadmaps/blockchain-developer-1.jpg",
    "Smart Contract Auditor": "/roadmaps/smart-contract-auditor-1.jpg",
    "ML Intern": "/roadmaps/ml-intern-1.jpg",
    "Machine Learning Engineer": "/roadmaps/ml-engineer-1.jpg",
    "MLOps Engineer": "/roadmaps/mlops-engineer-1.jpg"
  };

  const image = roadmapImages[role];

  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = `${role.replace(/\s+/g, '-').toLowerCase()}-roadmap.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!image) {
    return (
      <div className="roadmap-viewer-container">
        <div className="roadmap-header">
          <button onClick={onBack} className="back-button">
            ← Back to Results
          </button>
          <h1>Roadmap Not Available</h1>
          <p>Roadmap for {role} is currently under development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-viewer-container">
      <div className="roadmap-header">
        <button onClick={onBack} className="back-button">
          ← Back to Results
        </button>
        <div className="header-content">
          <h1 className="roadmap-title">{role} Roadmap</h1>
          <div className="header-actions">
            <button onClick={downloadImage} className="download-btn">
               Download Roadmap
            </button>
          </div>
        </div>
      </div>

      <div className="roadmap-content">
        <div className="image-container">
          <img
            src={image}
            alt={`${role} Roadmap`}
            className="roadmap-image"
            onError={(e) => {
              e.target.src = '/roadmaps/placeholder.jpg'; // Fallback image
            }}
          />
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

      {/* Back Button at the End */}
      <div className="bottom-actions">
        <button onClick={onBack} className="back-button bottom">
          ← Back to Results
        </button>
      </div>
    </div>
  );
}