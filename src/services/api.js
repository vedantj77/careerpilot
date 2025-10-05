// src/services/api.js
import { GeminiTestGenerator } from './gemini-test-generator';

const testGenerator = new GeminiTestGenerator();

export const apiService = {
  async generateTest(testParams) {
    try {
      const test = await testGenerator.generateSkillTest(testParams);
      return test;
    } catch (error) {
      throw new Error('Failed to generate test: ' + error.message);
    }
  },

  async evaluateTest(test, answers) {
    // For now, we'll do client-side evaluation
    // You can enhance this with server-side API later
    return this.evaluateTestClientSide(test, answers);
  },

  evaluateTestClientSide(test, answers) {
    let score = 0;
    let maxScore = 0;
    const results = [];

    test.questions.forEach(question => {
      maxScore += question.points;
      const userAnswer = answers.find(a => a.questionId === question.id)?.answer;
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score += question.points;
      }

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        isCorrect,
        skillTags: question.skillTags
      });
    });

    const percentage = (score / maxScore) * 100;

    // Generate AI-like feedback based on results
    const strengths = this.generateStrengths(results);
    const improvements = this.generateImprovements(results);

    return {
      score: Math.round(percentage),
      totalScore: score,
      maxScore,
      results,
      strengths,
      improvements,
      feedback: this.generateOverallFeedback(percentage, strengths, improvements)
    };
  },

  generateStrengths(results) {
    const correctQuestions = results.filter(r => r.isCorrect);
    const skillCount = {};
    
    correctQuestions.forEach(q => {
      q.skillTags.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill]) => skill);

    return topSkills.map(skill => `Strong understanding of ${skill}`);
  },

  generateImprovements(results) {
    const incorrectQuestions = results.filter(r => !r.isCorrect);
    const skillCount = {};
    
    incorrectQuestions.forEach(q => {
      q.skillTags.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const weakSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill]) => skill);

    return weakSkills.map(skill => `Focus on improving ${skill} concepts`);
  },

  generateOverallFeedback(percentage, strengths, improvements) {
    if (percentage >= 80) {
      return "Excellent performance! You have strong knowledge in this area.";
    } else if (percentage >= 60) {
      return "Good understanding with room for improvement in specific areas.";
    } else {
      return "Keep learning and practicing. Review the concepts you missed.";
    }
  }
};