import React, { useState } from 'react';

const engineeringAptitudeTest = {
  title: "Engineering Aptitude Test",
  description: "Discover which engineering field matches your interests, skills, and personality",
  questions: [
    {
      id: 1,
      question: "Which of these activities do you enjoy the most?",
      options: [
        { text: "Building and creating physical things", value: "mechanical" },
        { text: "Programming and solving logic problems", value: "computer" },
        { text: "Working with circuits and electronic devices", value: "electronics" },
        { text: "Designing processes for manufacturing", value: "chemical" },
        { text: "Planning and organizing large projects", value: "civil" },
      ]
    },
    {
      id: 2,
      question: "What type of problems do you enjoy solving?",
      options: [
        { text: "Optimizing systems for efficiency", value: "industrial" },
        { text: "Finding patterns in data", value: "data" },
        { text: "Improving human health and medical devices", value: "biomedical" },
        { text: "Designing transportation systems", value: "automobile" },
        { text: "Working with aerospace technology", value: "aerospace" },
      ]
    },
    {
      id: 3,
      question: "Which school subjects were/are you strongest in?",
      options: [
        { text: "Mathematics and Physics", value: "all" },
        { text: "Chemistry and Biology", value: "chemical_biomedical" },
        { text: "Computer Science", value: "computer" },
        { text: "Technical Drawing", value: "mechanical_civil" },
        { text: "Electronics", value: "electronics" },
      ]
    },
    {
      id: 4,
      question: "What kind of work environment do you prefer?",
      options: [
        { text: "Office with computers and software", value: "computer_data" },
        { text: "Laboratory or research facility", value: "chemical_biomedical" },
        { text: "Construction site or field work", value: "civil" },
        { text: "Manufacturing plant or workshop", value: "mechanical_automobile" },
        { text: "Design studio", value: "electronics_aerospace" },
      ]
    },
    {
      id: 5,
      question: "Which emerging technology excites you the most?",
      options: [
        { text: "Artificial Intelligence and Machine Learning", value: "computer" },
        { text: "Electric Vehicles and Autonomous Driving", value: "automobile" },
        { text: "Renewable Energy and Sustainability", value: "civil_environmental" },
        { text: "Space Exploration and Satellites", value: "aerospace" },
        { text: "Medical Robotics and Biotechnology", value: "biomedical" },
      ]
    },
    {
      id: 6,
      question: "How do you approach problem-solving?",
      options: [
        { text: "Systematically, step by step", value: "civil_chemical" },
        { text: "Creatively, thinking outside the box", value: "computer_data" },
        { text: "Hands-on, by building prototypes", value: "mechanical_automobile" },
        { text: "Analytically, with data and models", value: "electronics" },
        { text: "Collaboratively, in teams", value: "industrial" },
      ]
    },
    {
      id: 7,
      question: "What kind of projects interest you?",
      options: [
        { text: "Developing software applications", value: "computer" },
        { text: "Building infrastructure (bridges, roads)", value: "civil" },
        { text: "Designing consumer products", value: "mechanical" },
        { text: "Creating medical devices", value: "biomedical" },
        { text: "Working on power systems", value: "electrical" },
      ]
    },
    {
      id: 8,
      question: "Which professional achievement would you value most?",
      options: [
        { text: "Developing life-saving technology", value: "biomedical" },
        { text: "Creating innovative software", value: "computer" },
        { text: "Building sustainable infrastructure", value: "civil_environmental" },
        { text: "Designing efficient manufacturing processes", value: "chemical_industrial" },
        { text: "Contributing to space exploration", value: "aerospace" },
      ]
    },
  ],
  careerMatches: {
    computer: {
      title: "Computer/IT Engineering",
      score: 0,
      description: "You enjoy logical thinking and technology. Perfect for software development, AI, and cybersecurity.",
      icon: "💻",
      color: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
    },
    mechanical: {
      title: "Mechanical Engineering",
      score: 0,
      description: "You like creating physical solutions. Great for automotive, aerospace, and manufacturing industries.",
      icon: "⚙️",
      color: "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30"
    },
    civil: {
      title: "Civil Engineering",
      score: 0,
      description: "You enjoy large-scale projects. Ideal for construction, urban planning, and infrastructure development.",
      icon: "🏗️",
      color: "from-stone-50 to-stone-100 dark:from-stone-800/30 dark:to-stone-700/30"
    },
    electronics: {
      title: "Electronics Engineering",
      score: 0,
      description: "You're fascinated by circuits and devices. Perfect for semiconductor, telecommunications, and IoT.",
      icon: "🔌",
      color: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
    },
    chemical: {
      title: "Chemical Engineering",
      score: 0,
      description: "You're interested in processes and materials. Great for pharmaceuticals, energy, and manufacturing.",
      icon: "🧪",
      color: "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30"
    },
    automobile: {
      title: "Automobile Engineering",
      score: 0,
      description: "You love vehicles and mobility. Perfect for automotive design, EV technology, and transportation.",
      icon: "🚗",
      color: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30"
    },
    aerospace: {
      title: "Aerospace Engineering",
      score: 0,
      description: "You're drawn to flight and space. Ideal for aircraft design, space exploration, and defense.",
      icon: "🚀",
      color: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30"
    },
    biomedical: {
      title: "Biomedical Engineering",
      score: 0,
      description: "You want to improve healthcare. Perfect for medical devices, biotechnology, and healthcare tech.",
      icon: "🫀",
      color: "from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30"
    },
  }
};

const AptitudeTest = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion + 1]: value };
    setAnswers(newAnswers);

    if (currentQuestion < engineeringAptitudeTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (answers) => {
    const scores = { ...engineeringAptitudeTest.careerMatches };
    
    // Reset scores
    Object.keys(scores).forEach(key => {
      scores[key].score = 0;
    });

    // Calculate scores based on answers
    Object.values(answers).forEach(answer => {
      const fields = answer.split('_');
      fields.forEach(field => {
        if (scores[field]) {
          scores[field].score += 1;
        } else if (field === 'all') {
          // Add to all fields
          Object.keys(scores).forEach(key => {
            scores[key].score += 0.5;
          });
        }
      });
    });

    // Sort by score
    const sortedResults = Object.values(scores).sort((a, b) => b.score - a.score);
    
    setResults(sortedResults);
    setShowResults(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const currentQ = engineeringAptitudeTest.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white mb-4 group transition-all duration-300"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            Back to Career Paths
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              {engineeringAptitudeTest.title}
            </h1>
            <p className="text-gray-600 dark:text-slate-300">
              {engineeringAptitudeTest.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
              <span>Question {currentQuestion + 1} of {engineeringAptitudeTest.questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / engineeringAptitudeTest.questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / engineeringAptitudeTest.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {!showResults ? (
          /* Test Questions */
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {option.text}
                    </span>
                    <span className="text-gray-400 group-hover:text-blue-500">→</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className={`px-6 py-2 rounded-lg border ${currentQuestion === 0 
                  ? 'border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-600 cursor-not-allowed' 
                  : 'border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
              >
                ← Previous
              </button>
              
              <div className="text-sm text-gray-500 dark:text-slate-500">
                Select an option to continue
              </div>
            </div>
          </div>
        ) : (
          /* Results Page */
          <div className="space-y-8">
            {/* Top Result */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                🎉 Your Top Match: {results[0].title}
              </h2>
              <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Based on your answers, this engineering field aligns best with your interests and strengths.
              </p>
            </div>

            {/* Top Match Card */}
            <div className={`bg-gradient-to-br ${results[0].color} rounded-2xl p-8 border border-gray-200 dark:border-slate-700`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{results[0].icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{results[0].title}</h3>
                    <p className="text-gray-600 dark:text-slate-300">Match Score: {Math.round((results[0].score / engineeringAptitudeTest.questions.length) * 100)}%</p>
                  </div>
                </div>
                <span className="text-3xl">🥇</span>
              </div>
              
              <p className="text-gray-700 dark:text-slate-300 mb-6">{results[0].description}</p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => onComplete(results[0])}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Explore {results[0].title} →
                </button>
                <button
                  onClick={resetTest}
                  className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Retake Test
                </button>
              </div>
            </div>

            {/* All Results */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                All Engineering Matches
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.slice(1).map((result, index) => (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${result.color} p-6 rounded-xl border border-gray-200 dark:border-slate-700`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.icon}</span>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{result.title}</h4>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                        {Math.round((result.score / engineeringAptitudeTest.questions.length) * 100)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                        style={{ width: `${(result.score / results[0].score) * 100}%` }}
                      ></div>
                    </div>
                    
                    <button
                      onClick={() => onComplete(result)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Explore this path →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-8 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={resetTest}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Take Test Again
              </button>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
              >
                Back to Career Paths
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;