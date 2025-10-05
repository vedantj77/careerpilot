// src/components/skill-tests/SkillTestModal.jsx
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function SkillTestModal({ job, isOpen, onClose, onTestComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [results, setResults] = useState(null);

  const generateTest = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      
      // Use the correct model name and configuration
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", // Updated model name
      });

      const prompt = `
        Create a comprehensive skill assessment test for a ${job.role} position at ${job.originalExperienceLevel} level.
        Focus on these key skills: ${job.skillsRequired.join(', ')}.
        
        Generate EXACTLY 10 practical, interview-style questions that test both theoretical knowledge and practical application.

        IMPORTANT: Return ONLY valid JSON in this exact structure:
        {
          "test": {
            "title": "Skill Assessment: ${job.role}",
            "description": "Comprehensive test covering ${job.skillsRequired.slice(0, 3).join(', ')} and more",
            "estimatedTime": 30,
            "questions": [
              {
                "id": "q1",
                "type": "multiple_choice",
                "question": "Clear and concise question text",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Exact text of correct option",
                "explanation": "Detailed explanation why this is correct",
                "skillTags": ["skill1", "skill2"],
                "points": 10,
                "timeLimit": 3
              }
              // ... EXACTLY 10 questions total
            ]
          }
        }

        Guidelines for 10 questions:
        - Questions 1-3: Basic concepts and fundamentals
        - Questions 4-7: Intermediate practical applications  
        - Questions 8-10: Advanced scenarios and problem-solving
        - Include a mix of multiple choice, scenario-based, and coding questions
        - Make questions progressively more challenging
        - Ensure all ${job.skillsRequired.join(', ')} are covered
        - Make explanations educational and helpful for learning
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }
      
      const testData = JSON.parse(jsonMatch[0]);
      setTest(testData.test);
      setIsTakingTest(true);
    } catch (error) {
      console.error('Error generating test:', error);
      // Fallback to mock test if API fails
      generateMockTest();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback mock test generator with realistic options
  const generateMockTest = () => {
    const mockTest = {
      title: `Skill Assessment: ${job.role}`,
      description: `Comprehensive test covering ${job.skillsRequired.slice(0, 3).join(', ')}`,
      estimatedTime: 30,
      questions: []
    };

    // Generate 10 mock questions with unique options
    for (let i = 1; i <= 10; i++) {
      const skill = job.skillsRequired[i % job.skillsRequired.length] || job.skillsRequired[0];
      const difficulty = i <= 3 ? 'basic' : i <= 7 ? 'intermediate' : 'advanced';
      
      const { question, options, correctAnswer, explanation } = generateRealisticQuestion(i, skill, job.role, difficulty);
      
      mockTest.questions.push({
        id: `q${i}`,
        type: 'multiple_choice',
        question,
        options,
        correctAnswer,
        explanation,
        skillTags: [skill],
        points: i <= 3 ? 8 : i <= 7 ? 10 : 12, // More points for harder questions
        timeLimit: 3
      });
    }

    setTest(mockTest);
    setIsTakingTest(true);
  };

  const generateRealisticQuestion = (questionNumber, skill, role, difficulty) => {
    // Question templates for different skills
    const questionTemplates = {
      'React': [
        "What is the primary advantage of using React hooks over class components?",
        "How does React's virtual DOM improve performance?",
        "What is the purpose of keys in React lists?",
        "How would you optimize a React component that re-renders too frequently?",
        "What is the difference between useEffect and useLayoutEffect?",
        "How do you handle state management in large React applications?",
        "What are React error boundaries and how do you implement them?",
        "How does React's reconciliation algorithm work?",
        "What are the benefits of using React.memo?",
        "How do you implement code splitting in React?"
      ],
      'JavaScript': [
        "What is the difference between let, const, and var?",
        "How does JavaScript's event loop work?",
        "What are closures and how are they useful?",
        "How do you handle asynchronous operations in JavaScript?",
        "What is the difference between == and ===?",
        "How does prototypal inheritance work in JavaScript?",
        "What are promises and how do they differ from callbacks?",
        "How do you handle memory leaks in JavaScript?",
        "What are generators and when would you use them?",
        "How does the 'this' keyword work in different contexts?"
      ],
      'Node.js': [
        "What is the difference between Node.js and traditional web servers?",
        "How does Node.js handle concurrent requests?",
        "What is the purpose of the package.json file?",
        "How do you handle environment variables in Node.js?",
        "What are streams and why are they important in Node.js?",
        "How do you debug a memory leak in a Node.js application?",
        "What is the event-driven architecture in Node.js?",
        "How do you handle file operations asynchronously?",
        "What are the best practices for error handling in Node.js?",
        "How do you scale a Node.js application?"
      ],
      'Python': [
        "What is the difference between lists and tuples in Python?",
        "How does Python's garbage collection work?",
        "What are decorators and how do you use them?",
        "How do you handle exceptions in Python?",
        "What is the difference between __str__ and __repr__?",
        "How do you work with virtual environments?",
        "What are context managers and when to use them?",
        "How does Python's Global Interpreter Lock affect performance?",
        "What are metaclasses and when would you use them?",
        "How do you optimize Python code performance?"
      ],
      'HTML/CSS': [
        "What is the difference between display: none and visibility: hidden?",
        "How does CSS specificity work?",
        "What are semantic HTML elements and why are they important?",
        "How do you center a div both horizontally and vertically?",
        "What is the CSS box model?",
        "How do you make a website responsive?",
        "What are CSS variables and how do you use them?",
        "How does flexbox differ from grid?",
        "What are the best practices for web accessibility?",
        "How do you optimize CSS for performance?"
      ],
      'TypeScript': [
        "What is the difference between 'interface' and 'type' in TypeScript?",
        "How do generics improve type safety in TypeScript?",
        "What are union types and when would you use them?",
        "How does TypeScript handle type inference?",
        "What are decorators in TypeScript and how are they used?",
        "How do you create utility types in TypeScript?",
        "What is type narrowing and how does it work?",
        "How do you handle third-party libraries without TypeScript definitions?",
        "What are conditional types and when are they useful?",
        "How does TypeScript's module system work?"
      ],
      'MongoDB': [
        "What are the advantages of using MongoDB over SQL databases?",
        "How do you create efficient indexes in MongoDB?",
        "What is the difference between embedded documents and references?",
        "How does MongoDB handle transactions?",
        "What are aggregation pipelines and when to use them?",
        "How do you optimize query performance in MongoDB?",
        "What is sharding and when should you use it?",
        "How do you handle data modeling in MongoDB?",
        "What are the best practices for MongoDB security?",
        "How do you implement backup and recovery in MongoDB?"
      ],
      'AWS': [
        "What is the difference between EC2 and Lambda?",
        "How does auto-scaling work in AWS?",
        "What are the benefits of using S3 for storage?",
        "How do you secure AWS resources using IAM?",
        "What is VPC and why is it important?",
        "How does CloudFront improve application performance?",
        "What are the different database services available in AWS?",
        "How do you monitor applications using CloudWatch?",
        "What is the shared responsibility model in AWS?",
        "How do you implement disaster recovery in AWS?"
      ]
    };

    // Get questions for the specific skill or use general questions
    const templates = questionTemplates[skill] || [
      `What is the primary purpose of ${skill} in ${role}?`,
      `Which scenario best demonstrates effective use of ${skill}?`,
      `How does ${skill} contribute to successful ${role} projects?`,
      `What is a common challenge when working with ${skill}?`,
      `Which best practice is most important for ${skill}?`,
      `How would you troubleshoot a typical ${skill} issue?`,
      `What advanced technique in ${skill} separates beginners from experts?`,
      `How does ${skill} integrate with other technologies in ${role}?`,
      `What security consideration is crucial for ${skill}?`,
      `How would you optimize performance using ${skill}?`
    ];

    const question = templates[(questionNumber - 1) % templates.length];
    
    // Generate realistic options based on the skill and question
    const { options, correctAnswer } = generateRealisticOptions(question, skill, difficulty);
    
    const explanation = `This demonstrates proper understanding of ${skill}. ${correctAnswer} is correct because it follows best practices and addresses the core concept effectively.`;

    return { question, options, correctAnswer, explanation };
  };

  const generateRealisticOptions = (question, skill, difficulty) => {
    // Realistic options for different skills and question types
    const optionSets = {
      'React': {
        'basic': [
          "They allow functional components to use state and lifecycle methods",
          "They make components render faster",
          "They replace Redux for state management",
          "They are only for class components"
        ],
        'intermediate': [
          "Using React.memo for preventing unnecessary re-renders",
          "Adding more useEffect hooks",
          "Converting all components to class components",
          "Using inline styles instead of CSS"
        ],
        'advanced': [
          "Implementing error boundaries to catch JavaScript errors",
          "Adding try-catch blocks to every function",
          "Using console.log for debugging",
          "Disabling React strict mode"
        ]
      },
      'JavaScript': {
        'basic': [
          "let and const are block-scoped, var is function-scoped",
          "They are all the same with different names",
          "var is newer than let and const",
          "const can be reassigned, let cannot"
        ],
        'intermediate': [
          "It handles asynchronous operations using call stack, callback queue, and microtask queue",
          "It executes code from top to bottom sequentially",
          "It uses multiple threads for parallel execution",
          "It prioritizes synchronous code over asynchronous code"
        ],
        'advanced': [
          "Functions that remember their lexical scope even when executed outside it",
          "Functions that execute immediately",
          "Functions that can only be called once",
          "Functions that modify global variables"
        ]
      },
      'Node.js': {
        'basic': [
          "Node.js uses a single-threaded event loop for non-blocking I/O operations",
          "Node.js creates a new thread for each request",
          "Node.js can only handle one request at a time",
          "Node.js is slower than traditional servers"
        ],
        'intermediate': [
          "Using the 'dotenv' package and process.env",
          "Storing them directly in code",
          "Using global variables",
          "Hardcoding values in configuration files"
        ],
        'advanced': [
          "They allow handling data in chunks without loading everything into memory",
          "They make code run faster automatically",
          "They are only for video files",
          "They block the event loop"
        ]
      },
      'Python': {
        'basic': [
          "Lists are mutable, tuples are immutable",
          "Tuples are faster than lists",
          "Lists can only store numbers",
          "Tuples can be modified after creation"
        ],
        'intermediate': [
          "Using try-except blocks to handle exceptions gracefully",
          "Using if-else statements for all possible errors",
          "Ignoring errors and continuing execution",
          "Using print statements to debug errors"
        ],
        'advanced': [
          "They manage resources automatically using the with statement",
          "They make code run faster",
          "They are only for file operations",
          "They replace try-except blocks"
        ]
      },
      'HTML/CSS': {
        'basic': [
          "display: none removes element from layout, visibility: hidden hides but preserves space",
          "They are exactly the same",
          "visibility: hidden removes element from layout",
          "display: none only works in flexbox"
        ],
        'intermediate': [
          "Using media queries and responsive units (%, rem, vw/vh)",
          "Making separate websites for mobile and desktop",
          "Using fixed pixel values for everything",
          "Hiding content on mobile devices"
        ],
        'advanced': [
          "Using CSS custom properties (var(--name)) for reusable values",
          "Using SASS or LESS preprocessors",
          "Writing all CSS in JavaScript",
          "Using inline styles exclusively"
        ]
      },
      'TypeScript': {
        'basic': [
          "Interfaces can be extended and implemented, types can use unions and intersections",
          "They are exactly the same",
          "Types are only for primitive values",
          "Interfaces are deprecated in newer versions"
        ],
        'intermediate': [
          "They allow creating reusable components that work with multiple types",
          "They make code run faster",
          "They are only for function parameters",
          "They replace all type annotations"
        ],
        'advanced': [
          "Using type guards and conditional checks to narrow down types",
          "Using 'any' type for all variables",
          "Disabling type checking",
          "Using JavaScript instead"
        ]
      },
      'MongoDB': {
        'basic': [
          "Flexible schema design and horizontal scalability",
          "Better SQL support",
          "Stricter data validation",
          "Built-in relational features"
        ],
        'intermediate': [
          "Analyze query performance with explain() and create appropriate indexes",
          "Add more RAM to the server",
          "Convert all queries to aggregation pipelines",
          "Use smaller document sizes"
        ],
        'advanced': [
          "Distributing data across multiple servers to handle large datasets",
          "Creating more collections",
          "Using smaller databases",
          "Increasing server CPU power"
        ]
      },
      'AWS': {
        'basic': [
          "EC2 provides virtual servers, Lambda runs code without provisioning servers",
          "They are the same service",
          "Lambda is only for database operations",
          "EC2 is being phased out"
        ],
        'intermediate': [
          "Automatically adjusting capacity based on demand using scaling policies",
          "Manually launching new instances when needed",
          "Using only large instance types",
          "Disabling monitoring"
        ],
        'advanced': [
          "AWS manages infrastructure security, customer manages data and application security",
          "AWS is responsible for everything",
          "Customer manages all security aspects",
          "Security is handled automatically"
        ]
      }
    };

    // Get options for the specific skill or generate generic ones
    let options, correctAnswer;
    
    if (optionSets[skill] && optionSets[skill][difficulty]) {
      options = [...optionSets[skill][difficulty]];
      correctAnswer = options[0]; // First option is correct in our predefined sets
    } else {
      // Generate generic options
      options = [
        `Correct approach using ${skill} best practices`,
        `Common misconception about ${skill}`,
        `Inefficient method that might work but has drawbacks`,
        `Completely incorrect understanding of ${skill}`
      ];
      correctAnswer = options[0];
    }

    // Shuffle options to randomize position of correct answer
    const shuffledOptions = shuffleArray([...options]);
    const correctIndex = shuffledOptions.indexOf(correctAnswer);
    
    return { options: shuffledOptions, correctAnswer };
  };

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const evaluateTest = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Evaluate this test attempt and provide detailed feedback:

        Job Role: ${job.role}
        Skills Tested: ${job.skillsRequired.join(', ')}
        
        Questions and Answers:
        ${test.questions.map((q, index) => `
          Question ${index + 1}: ${q.question}
          Correct Answer: ${q.correctAnswer}
          User's Answer: ${answers[q.id] || 'Not answered'}
          Explanation: ${q.explanation}
        `).join('\n')}

        Calculate a score out of 100 and provide:
        1. Overall score percentage
        2. 3-4 key strengths based on correct answers
        3. 3-4 areas for improvement based on incorrect answers
        4. Brief, actionable feedback
        5. Specific recommendations for ${job.role} role

        Return as JSON:
        {
          "score": number,
          "strengths": string[],
          "improvements": string[],
          "feedback": string,
          "recommendations": string[]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const evaluation = JSON.parse(jsonMatch[0]);
      setResults(evaluation);
      onTestComplete?.(evaluation);
    } catch (error) {
      console.error('Error evaluating test:', error);
      // Fallback to simple evaluation
      const simpleResults = calculateSimpleResults();
      setResults(simpleResults);
      onTestComplete?.(simpleResults);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSimpleResults = () => {
    let score = 0;
    let maxScore = 0;

    test.questions.forEach(question => {
      maxScore += question.points;
      if (answers[question.id] === question.correctAnswer) {
        score += question.points;
      }
    });

    const percentage = Math.round((score / maxScore) * 100);
    
    // Generate dynamic feedback based on score
    let feedback = '';
    let strengths = [];
    let improvements = [];

    if (percentage >= 80) {
      feedback = "Excellent! You have comprehensive knowledge for this role.";
      strengths = ['Strong foundational knowledge', 'Good practical understanding', 'Well-prepared for technical interviews'];
      improvements = ['Continue staying updated with latest trends', 'Practice real-world scenarios'];
    } else if (percentage >= 60) {
      feedback = "Good job! You have solid knowledge with some areas to improve.";
      strengths = ['Good basic concepts', 'Understanding of key principles'];
      improvements = ['Review advanced topics', 'Practice more complex scenarios', 'Study specific technical details'];
    } else {
      feedback = "Keep learning! Focus on the fundamental concepts.";
      strengths = ['Willingness to learn', 'Basic awareness of concepts'];
      improvements = ['Study core fundamentals', 'Practice basic applications', 'Build foundational projects'];
    }

    return {
      score: percentage,
      strengths,
      improvements,
      feedback,
      recommendations: [
        'Build practical projects to reinforce learning',
        'Study industry best practices',
        'Practice with real-world scenarios'
      ]
    };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTest(null);
    setIsTakingTest(false);
    setResults(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {isTakingTest ? test?.title : `Skill Assessment: ${job.role}`}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Test Intro */}
          {!isTakingTest && !results && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Skill Test</h3>
              <p className="text-gray-400 mb-6">
                10 questions to test your knowledge for <strong className="text-white">{job.role}</strong>
              </p>
              
              <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                <h4 className="text-white font-medium mb-2">Skills being tested:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {job.skillsRequired.map(skill => (
                    <span key={skill} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-gray-400 text-sm mb-6">
                <p>• <strong>10 comprehensive questions</strong> • 30 minutes • Instant AI feedback</p>
                <p className="mt-2">• Progressive difficulty • Covers all key skills • Detailed explanations</p>
              </div>
              
              <button 
                onClick={generateTest}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-500 disabled:bg-purple-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
              >
                {isLoading ? 'Generating 10 Questions...' : 'Start Comprehensive Test'}
              </button>
            </div>
          )}

          {/* Test Interface */}
          {isTakingTest && test && !results && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Question {currentQuestion + 1} of 10</span>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(((currentQuestion + 1) / 10) * 100)}% Complete</span>
                </div>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white text-lg font-medium flex-1">
                    {test.questions[currentQuestion].question}
                  </h3>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm ml-4">
                    {test.questions[currentQuestion].points} pts
                  </span>
                </div>

                <div className="space-y-3">
                  {test.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        answers[test.questions[currentQuestion].id] === option 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : 'bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500'
                      }`}
                      onClick={() => handleAnswer(test.questions[currentQuestion].id, option)}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  
                  {currentQuestion === 9 ? (
                    <button
                      onClick={evaluateTest}
                      disabled={Object.keys(answers).length !== 10}
                      className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isLoading ? 'Evaluating...' : 'Submit All 10 Answers'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestion(prev => prev + 1)}
                      disabled={!answers[test.questions[currentQuestion].id]}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Question →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Test Complete!</h3>
              
              <div className="bg-gray-700/50 p-6 rounded-lg mb-6">
                <div className="text-4xl font-bold text-white mb-2">{results.score}%</div>
                <p className="text-gray-300 mb-6 text-lg">{results.feedback}</p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="bg-green-900/20 p-4 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-3 text-lg">✅ Your Strengths</h4>
                    <ul className="text-gray-300 space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-medium mb-3 text-lg">📚 Areas to Improve</h4>
                    <ul className="text-gray-300 space-y-2">
                      {results.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {results.recommendations && (
                  <div className="mt-6 bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-medium mb-3 text-lg">💡 Recommendations</h4>
                    <ul className="text-gray-300 space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetTest}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                >
                  Take Test Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}