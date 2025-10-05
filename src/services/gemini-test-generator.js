// src/services/gemini-test-generator.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiTestGenerator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }

  async generateSkillTest(params) {
    const model = this.genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    const prompt = this.buildTestGenerationPrompt(params);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }
      
      const testData = JSON.parse(jsonMatch[0]);
      return this.formatTestData(testData, params);
    } catch (error) {
      console.error('Error generating test with Gemini:', error);
      throw new Error('Failed to generate test. Please try again.');
    }
  }

  buildTestGenerationPrompt(params) {
    return `
      Create a skill assessment test for a ${params.jobRole} position at ${params.experienceLevel} level.
      Focus on these key skills: ${params.skills.join(', ')}.
      
      Generate 5 practical, interview-style questions.

      IMPORTANT: Return ONLY valid JSON in this exact structure:
      {
        "test": {
          "title": "Creative and relevant test title",
          "description": "Brief description",
          "estimatedTime": 25,
          "questions": [
            {
              "id": "q1",
              "type": "multiple_choice",
              "question": "Question text",
              "options": ["A", "B", "C", "D"],
              "correctAnswer": "Correct option",
              "explanation": "Detailed explanation",
              "skillTags": ["skill1"],
              "points": 10,
              "timeLimit": 3
            }
          ]
        }
      }
    `;
  }

  formatTestData(rawData, params) {
    return {
      title: rawData.test.title,
      description: rawData.test.description,
      jobRole: params.jobRole,
      skillCategory: params.skills[0] || 'General',
      difficulty: params.experienceLevel === 'Student' ? 'beginner' : 'intermediate',
      estimatedTime: rawData.test.estimatedTime,
      questions: rawData.test.questions
    };
  }
}