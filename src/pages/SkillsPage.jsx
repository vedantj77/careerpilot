export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Tell Us About Yourself
          </h2>
          <p className="text-lg text-gray-600">
            Let's personalize your career journey. Add your skills and interests to get tailored recommendations.
          </p>
        </div>

        {/* Skills Input */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3 text-sm">1</span>
            Your Skills
          </h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What skills do you have? (Add multiple skills)
            </label>
            <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-3 border border-gray-300 rounded-lg bg-white">
              {/* Skills tags will appear here */}
              <span className="text-gray-500 text-sm">Start typing and press Enter to add skills...</span>
            </div>
            <input
              type="text"
              placeholder="Type a skill and press Enter..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Add skill logic here
                }
              }}
            />
          </div>
          <div className="text-sm text-gray-500">
            Examples: JavaScript, Python, Project Management, UI/UX Design, Data Analysis, etc.
          </div>
        </div>

        {/* Interests Input */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mr-3 text-sm">2</span>
            Your Interests
          </h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are you interested in? (Select multiple)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Web Development', 'Mobile Development', 'Data Science', 
                'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity',
                'UI/UX Design', 'Project Management', 'Digital Marketing',
                'DevOps', 'Machine Learning', 'Blockchain'
              ].map((interest) => (
                <label key={interest} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white mr-3 text-sm">3</span>
            Your Experience Level
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { level: 'Student', desc: 'Just starting out' },
              { level: 'Junior', desc: '0-2 years experience' },
              { level: 'Mid-Level', desc: '2-5 years experience' },
              { level: 'Senior', desc: '5+ years experience' }
            ].map(({ level, desc }) => (
              <label key={level} className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer text-center">
                <input type="radio" name="experience" className="w-4 h-4 text-blue-600 mb-2" />
                <span className="font-semibold text-gray-800">{level}</span>
                <span className="text-sm text-gray-600 mt-1">{desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 text-lg">
            Analyze My Career Path ›
          </button>
          <p className="text-gray-500 text-sm mt-4">
            We'll use this information to create personalized career recommendations
          </p>
        </div>
      </div>
    </div>
  );
}