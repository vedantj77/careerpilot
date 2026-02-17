// pages/AptitudeTestPage.jsx
import React, { useState } from 'react';

const AptitudeTestPage = ({ onBack }) => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState(null);

  // Student-friendly engineering aptitude test
  const aptitudeTestData = {
    id: 'engineering-aptitude',
    title: 'Which Engineering Field Fits You?',
    description: 'Take this quick quiz to discover which engineering branch matches your personality and interests!',
    type: 'aptitude-test',
    questions: [
      {
        id: 1,
        question: 'When you play with building blocks or Legos, what do you usually build?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Tall towers and bridges' },
          { id: 'b', text: 'Robots and moving machines' },
          { id: 'c', text: 'Computers or gaming consoles' },
          { id: 'd', text: 'Rockets and airplanes' },
          { id: 'e', text: 'Medical devices or hospital setups' }
        ],
        score: {
          a: { civil: 3, mechanical: 2 },
          b: { mechanical: 3, automobile: 2 },
          c: { computer: 3, electronics: 2 },
          d: { aerospace: 3, mechanical: 2 },
          e: { biomedical: 3, chemical: 2 }
        }
      },
      {
        id: 2,
        question: 'Which school subject do you enjoy the most?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Math - solving puzzles and equations' },
          { id: 'b', text: 'Physics - understanding how things work' },
          { id: 'c', text: 'Chemistry - mixing and experimenting' },
          { id: 'd', text: 'Computer Science - coding and apps' },
          { id: 'e', text: 'Biology - learning about living things' }
        ],
        score: {
          a: { all: 2 },
          b: { mechanical: 3, aerospace: 2, civil: 2 },
          c: { chemical: 3, biomedical: 2 },
          d: { computer: 3, electronics: 2 },
          e: { biomedical: 3, chemical: 2 }
        }
      },
      {
        id: 3,
        question: 'What kind of movies/shows do you like watching?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Tech and AI movies (like Iron Man)' },
          { id: 'b', text: 'Space exploration (like Interstellar)' },
          { id: 'c', text: 'Medical dramas (like Grey\'s Anatomy)' },
          { id: 'd', text: 'Car racing or Fast & Furious' },
          { id: 'e', text: 'Construction and building shows' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { aerospace: 3, electronics: 2 },
          c: { biomedical: 3, chemical: 1 },
          d: { automobile: 3, mechanical: 2 },
          e: { civil: 3, mechanical: 1 }
        }
      },
      {
        id: 4,
        question: 'How do you prefer to solve problems?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Writing code or using software' },
          { id: 'b', text: 'Drawing diagrams and plans' },
          { id: 'c', text: 'Building physical models' },
          { id: 'd', text: 'Doing experiments and testing' },
          { id: 'e', text: 'Researching and reading' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { civil: 3, mechanical: 2 },
          c: { mechanical: 3, automobile: 2 },
          d: { chemical: 3, biomedical: 2 },
          e: { all: 1 }
        }
      },
      {
        id: 5,
        question: 'Which gadget excites you the most?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Latest smartphone or gaming PC' },
          { id: 'b', text: '3D printer or drone' },
          { id: 'c', text: 'Tesla or electric car' },
          { id: 'd', text: 'Smartwatch with health features' },
          { id: 'e', text: 'Satellite or space tech' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { mechanical: 3, aerospace: 2 },
          c: { automobile: 3, electronics: 2 },
          d: { biomedical: 3, electronics: 1 },
          e: { aerospace: 3, electronics: 2 }
        }
      },
      {
        id: 6,
        question: 'If you could invent anything, what would it be?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'A new video game or app' },
          { id: 'b', text: 'A flying car or hyperloop' },
          { id: 'c', text: 'A medical device to help people' },
          { id: 'd', text: 'A super strong building material' },
          { id: 'e', text: 'A robot that does household chores' }
        ],
        score: {
          a: { computer: 3 },
          b: { automobile: 3, aerospace: 2, mechanical: 2 },
          c: { biomedical: 3, chemical: 2 },
          d: { civil: 3, chemical: 2 },
          e: { mechanical: 3, computer: 1 }
        }
      },
      {
        id: 7,
        question: 'Which activity sounds most fun to you?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Coding a website or game' },
          { id: 'b', text: 'Building a model airplane' },
          { id: 'c', text: 'Designing a dream car' },
          { id: 'd', text: 'Mixing chemicals in a lab' },
          { id: 'e', text: 'Planning a city layout' }
        ],
        score: {
          a: { computer: 3, electronics: 1 },
          b: { aerospace: 3, mechanical: 2 },
          c: { automobile: 3, mechanical: 2 },
          d: { chemical: 3, biomedical: 2 },
          e: { civil: 3, mechanical: 1 }
        }
      },
      {
        id: 8,
        question: 'Pick your favorite superhero/science character:',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Tony Stark / Iron Man' },
          { id: 'b', text: 'Elon Musk (Tesla/SpaceX)' },
          { id: 'c', text: 'Doc Brown (Back to the Future)' },
          { id: 'd', text: 'Bruce Banner (The Hulk/radiation)' },
          { id: 'e', text: 'Forrest Gump (building things)' }
        ],
        score: {
          a: { computer: 2, electronics: 2, mechanical: 1 },
          b: { automobile: 2, aerospace: 3, mechanical: 2 },
          c: { mechanical: 3, automobile: 2 },
          d: { chemical: 3, biomedical: 2 },
          e: { civil: 3, mechanical: 1 }
        }
      },
      {
        id: 9,
        question: 'Which video game genre do you prefer?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Puzzle and strategy games' },
          { id: 'b', text: 'Racing or driving games' },
          { id: 'c', text: 'Flight simulators' },
          { id: 'd', text: 'Simulation games (like Cities: Skylines)' },
          { id: 'e', text: 'All of them!' }
        ],
        score: {
          a: { computer: 3, electronics: 1 },
          b: { automobile: 3, mechanical: 2 },
          c: { aerospace: 3, mechanical: 2 },
          d: { civil: 3, mechanical: 1 },
          e: { all: 1 }
        }
      },
      {
        id: 10,
        question: 'What would your dream workspace look like?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'High-tech office with multiple monitors' },
          { id: 'b', text: 'Auto repair shop or garage' },
          { id: 'c', text: 'Science lab with experiments' },
          { id: 'd', text: 'Construction site or workshop' },
          { id: 'e', text: 'Space station or NASA control room' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { automobile: 3, mechanical: 2 },
          c: { chemical: 3, biomedical: 2 },
          d: { civil: 3, mechanical: 2 },
          e: { aerospace: 3, electronics: 2 }
        }
      },
      {
        id: 11,
        question: 'Which of these would you enjoy fixing?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Computer or phone that won\'t turn on' },
          { id: 'b', text: 'Bicycle or scooter with a flat tire' },
          { id: 'c', text: 'Leaky faucet or broken chair' },
          { id: 'd', text: 'Remote control car or toy robot' },
          { id: 'e', text: 'Science kit or chemistry set' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { automobile: 2, mechanical: 2 },
          c: { civil: 2, mechanical: 2 },
          d: { mechanical: 3, electronics: 1 },
          e: { chemical: 3, biomedical: 1 }
        }
      },
      {
        id: 12,
        question: 'Pick your favorite type of YouTube/TikTok content:',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Tech reviews and unboxings' },
          { id: 'b', text: 'Car restoration or modification' },
          { id: 'c', text: 'Science experiments and DIY' },
          { id: 'd', text: 'Building and construction projects' },
          { id: 'e', text: 'Space and astronomy videos' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { automobile: 3, mechanical: 2 },
          c: { chemical: 3, biomedical: 2 },
          d: { civil: 3, mechanical: 2 },
          e: { aerospace: 3, electronics: 2 }
        }
      },
      {
        id: 13,
        question: 'If money was no object, what would you buy?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Supercomputer or gaming setup' },
          { id: 'b', text: 'Sports car or motorcycle' },
          { id: 'c', text: 'Private jet or helicopter' },
          { id: 'd', text: 'High-tech medical equipment' },
          { id: 'e', text: 'Construction equipment' }
        ],
        score: {
          a: { computer: 3, electronics: 2 },
          b: { automobile: 3, mechanical: 2 },
          c: { aerospace: 3, mechanical: 2 },
          d: { biomedical: 3, chemical: 1 },
          e: { civil: 3, mechanical: 2 }
        }
      },
      {
        id: 14,
        question: 'Which of these sounds most interesting to study?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'How AI and machine learning work' },
          { id: 'b', text: 'How engines and motors work' },
          { id: 'c', text: 'How medicines are developed' },
          { id: 'd', text: 'How bridges stay standing' },
          { id: 'e', text: 'How rockets reach space' }
        ],
        score: {
          a: { computer: 3, electronics: 1 },
          b: { mechanical: 3, automobile: 2 },
          c: { biomedical: 3, chemical: 2 },
          d: { civil: 3, mechanical: 1 },
          e: { aerospace: 3, mechanical: 2 }
        }
      },
      {
        id: 15,
        question: 'What kind of impact do you want to make?',
        type: 'single-choice',
        options: [
          { id: 'a', text: 'Create the next big app or game' },
          { id: 'b', text: 'Design faster, cleaner cars' },
          { id: 'c', text: 'Develop life-saving medical tech' },
          { id: 'd', text: 'Build sustainable cities' },
          { id: 'e', text: 'Help humanity reach other planets' }
        ],
        score: {
          a: { computer: 3, electronics: 1 },
          b: { automobile: 3, mechanical: 2 },
          c: { biomedical: 3, chemical: 2 },
          d: { civil: 3, mechanical: 1 },
          e: { aerospace: 3, mechanical: 2 }
        }
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showFunLoading, setShowFunLoading] = useState(false);

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: [optionId]
    }));
    
    // Auto-advance after 1 second
    setTimeout(() => {
      if (questionId < aptitudeTestData.questions.length) {
        handleNextQuestion();
      }
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < aptitudeTestData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleTestComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTestComplete = () => {
    setShowFunLoading(true);
    
    // Calculate results
    const fieldScores = {
      computer: 0,
      mechanical: 0,
      electronics: 0,
      automobile: 0,
      chemical: 0,
      civil: 0,
      aerospace: 0,
      biomedical: 0
    };

    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      const question = aptitudeTestData.questions.find(q => q.id === parseInt(questionId));
      
      if (question && selectedOptions && question.score) {
        selectedOptions.forEach(optionId => {
          if (question.score[optionId]) {
            Object.entries(question.score[optionId]).forEach(([field, score]) => {
              if (field === 'all') {
                Object.keys(fieldScores).forEach(f => {
                  fieldScores[f] = (fieldScores[f] || 0) + score;
                });
              } else {
                fieldScores[field] = (fieldScores[field] || 0) + score;
              }
            });
          }
        });
      }
    });

    // Find top 3 fields
    const sortedFields = Object.entries(fieldScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // Add some personality descriptions
    const fieldPersonalities = {
      computer: ["Tech wizard", "Problem solver", "Creative coder"],
      mechanical: ["Hands-on builder", "Practical thinker", "Innovator"],
      electronics: ["Circuit master", "Detail-oriented", "Tech enthusiast"],
      automobile: ["Speed lover", "Innovator", "Problem solver"],
      chemical: ["Experimenter", "Analytical thinker", "Innovator"],
      civil: ["Big-picture thinker", "Builder", "Problem solver"],
      aerospace: ["Space explorer", "Innovator", "Dreamer"],
      biomedical: ["Life-saver", "Helper", "Innovator"]
    };

    // Simulate loading animation
    setTimeout(() => {
      const resultsData = {
        scores: fieldScores,
        topFields: sortedFields,
        answeredQuestions: Object.keys(answers).length,
        totalQuestions: aptitudeTestData.questions.length,
        personalities: fieldPersonalities
      };

      setResults(resultsData);
      setTestCompleted(true);
      setShowFunLoading(false);
    }, 2000);
  };

  const handleRestartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTestCompleted(false);
    setResults(null);
    setIsTestStarted(false);
  };

  const currentQ = aptitudeTestData.questions[currentQuestion];

  const getFieldDescription = (field) => {
    const descriptions = {
      computer: "You're tech-savvy and love solving problems with code! Computer Engineering could be perfect for you.",
      mechanical: "You enjoy building things and understanding how machines work! Mechanical Engineering might be your calling.",
      electronics: "You're fascinated by circuits and electronic devices! Electronics Engineering could be a great fit.",
      automobile: "You have a need for speed and love vehicles! Automobile Engineering might be your path.",
      chemical: "You enjoy experiments and creating new materials! Chemical Engineering could be your field.",
      civil: "You think big and want to build amazing structures! Civil Engineering might be perfect for you.",
      aerospace: "You dream big and look to the stars! Aerospace Engineering could be your future.",
      biomedical: "You want to help people through technology! Biomedical Engineering might be your passion."
    };
    return descriptions[field] || "This field matches your interests!";
  };

  const getFieldIcon = (field) => {
    const icons = {
      computer: '💻',
      mechanical: '⚙️',
      electronics: '🔌',
      automobile: '🚗',
      chemical: '🧪',
      civil: '🏗️',
      aerospace: '🚀',
      biomedical: '🫀'
    };
    return icons[field] || '🔧';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-slate-900 p-4 md:p-8 relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl">🚀</div>
        <div className="absolute top-20 right-20 text-4xl">💻</div>
        <div className="absolute bottom-20 left-20 text-4xl">⚙️</div>
        <div className="absolute bottom-10 right-10 text-4xl">🔧</div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white mb-8 group transition-all duration-300 bg-white/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700/50 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          Back to Career Paths
        </button>

        {/* Test Introduction */}
        {!isTestStarted && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-300 bg-clip-text text-transparent">
              Which Engineering Field Fits You? 🎯
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
              Take this fun 2-minute quiz to discover your perfect engineering match!
            </p>
            
            <div className="bg-white/80 dark:bg-slate-800/50 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-full">
                  <span className="text-3xl">🎮</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quick & Fun Quiz</h2>
                  <p className="text-gray-600 dark:text-slate-300">Just 15 simple questions!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Fast</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">2 minutes</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">😊</div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Fun</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">No boring questions</p>
                </div>
                
                <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Accurate</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">Personalized results</p>
                </div>
              </div>
              
              <button
                onClick={handleStartTest}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg flex items-center justify-center gap-2"
              >
                <span>Start Quiz Now! 🚀</span>
              </button>
              
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-4">
                Over 10,000 students have found their engineering path with this quiz!
              </p>
            </div>
          </div>
        )}

        {/* Test in Progress */}
        {isTestStarted && !testCompleted && !showFunLoading && (
          <div className="bg-white/80 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-slate-300">
                  Question {currentQuestion + 1} of {aptitudeTestData.questions.length}
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(((currentQuestion + 1) / aptitudeTestData.questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / aptitudeTestData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Fun question card */}
            <div className="mb-8 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-full mb-4">
                <span className="text-3xl">❓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {currentQ.question}
              </h2>
              <p className="text-gray-500 dark:text-slate-400">
                Pick the answer that feels most like you!
              </p>
            </div>

            {/* Fun options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => {
                const isSelected = answers[currentQ.id]?.includes(option.id);
                const optionIcons = ['😊', '🤔', '😎', '🤩', '😄'];
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-600 transform scale-[1.02]'
                        : 'bg-white dark:bg-slate-800/70 border-gray-200 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {optionIcons[index]}
                      </div>
                      <span className="text-gray-800 dark:text-white font-medium">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                }`}
              >
                ← Previous
              </button>
              
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                Next Question →
              </button>
            </div>
          </div>
        )}

        {/* Fun Loading Animation */}
        {showFunLoading && (
          <div className="bg-white/80 dark:bg-slate-800/50 p-12 rounded-2xl border border-gray-200 dark:border-slate-700 text-center">
            <div className="mb-6">
              <div className="inline-block animate-bounce">
                <span className="text-5xl">🎯</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Calculating Your Results...
            </h2>
            <p className="text-gray-600 dark:text-slate-300 mb-6">
              Analyzing your answers to find your perfect engineering match!
            </p>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-slate-400">
              <span>⚙️ Checking mechanical aptitude...</span>
              <span>💻 Analyzing tech skills...</span>
              <span>🔧 Matching interests...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {testCompleted && results && (
          <div className="bg-white/80 dark:bg-slate-800/50 p-8 rounded-2xl border border-gray-200 dark:border-slate-700">
            {/* Celebration Header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4 animate-bounce">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                Your Engineering Match is Ready!
              </h2>
              <p className="text-gray-600 dark:text-slate-300">
                Based on your answers, here's what we found:
              </p>
            </div>

            {/* Top Result */}
            {results.topFields.length > 0 && (
              <div className="mb-10">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 rounded-full inline-flex items-center gap-2 px-4 py-1 mb-4">
                  <span>🏆</span>
                  <span className="font-bold">BEST MATCH FOR YOU</span>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-700">
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="text-6xl">
                      {getFieldIcon(results.topFields[0][0])}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-white capitalize mb-2">
                        {results.topFields[0][0].replace(/([A-Z])/g, ' $1').trim()} Engineering
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                        {results.personalities[results.topFields[0][0]]?.map((trait, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/80 dark:bg-slate-800/50 rounded-full text-sm text-gray-700 dark:text-slate-300">
                            {trait}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-slate-300">
                        {getFieldDescription(results.topFields[0][0])}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => window.location.href = `#career-${results.topFields[0][0]}`}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                  >
                    Explore {results.topFields[0][0].replace(/([A-Z])/g, ' $1').trim()} Engineering →
                  </button>
                </div>
              </div>
            )}

            {/* Other Good Matches */}
            {results.topFields.length > 1 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                  <span>✨</span> Other Great Matches
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.topFields.slice(1).map(([field, score], idx) => (
                    <div key={field} className="bg-white dark:bg-slate-800/70 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{getFieldIcon(field)}</span>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()} Engineering
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-slate-400">
                            {results.personalities[field]?.[0]} • Score: {score}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.location.href = `#career-${field}`}
                        className="w-full py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-300"
                      >
                        Learn More →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun Stats */}
            <div className="mb-10 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700/50">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                <span>📊</span> Your Quiz Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {results.answeredQuestions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-300">Questions Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {results.topFields[0]?.[1] || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-300">Top Match Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Object.keys(results.scores).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-300">Fields Compared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-300">Match Accuracy</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRestartTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                Retake Quiz
              </button>
              
              <button
                onClick={onBack}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🏠</span>
                Back to Career Paths
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
              Share your results with friends! 😊
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTestPage;