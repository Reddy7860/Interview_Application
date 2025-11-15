import OpenAI from 'openai';
import { getCompanyValues } from '../data/staticData';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE'
});

interface EvaluationParams {
  targetRole: string;
  targetCompany: string;
  experienceLevel: string;
  question: string;
  answer: string;
}

export async function evaluateAnswer(params: EvaluationParams) {
  const { targetRole, targetCompany, experienceLevel, question, answer } = params;
  
  const companyValues = getCompanyValues(targetCompany);
  const leadershipPrinciples = companyValues?.principles || [];

  const systemPrompt = `You are an expert interview coach specializing in behavioral interviews using the STAR method (Situation, Task, Action, Result). Your role is to provide comprehensive, actionable feedback that helps candidates improve their interview performance.`;

  const userPrompt = `Evaluate the following behavioral interview answer using the STAR method.

**Context:**
- Target Role: ${targetRole}
- Target Company: ${targetCompany}
- Experience Level: ${experienceLevel}
- Interview Question: ${question}

**Company Leadership Principles (${targetCompany}):**
${leadershipPrinciples.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

**Candidate's Answer:**
${answer}

**Evaluation Requirements:**

Provide a comprehensive evaluation in the following JSON format:

{
  "scoredAssessment": {
    "dimensions": [
      {
        "dimension": "Situation Clarity",
        "score": 1-5,
        "justification": "Detailed explanation"
      },
      {
        "dimension": "Task Definition",
        "score": 1-5,
        "justification": "Detailed explanation"
      },
      {
        "dimension": "Actions Taken",
        "score": 1-5,
        "justification": "Detailed explanation"
      },
      {
        "dimension": "Results & Impact",
        "score": 1-5,
        "justification": "Detailed explanation"
      },
      {
        "dimension": "${targetCompany} Leadership Principles",
        "score": 1-5,
        "justification": "Detailed explanation showing which principles are demonstrated"
      },
      {
        "dimension": "Technical Depth (Role-Relevant)",
        "score": 1-5,
        "justification": "Detailed explanation"
      },
      {
        "dimension": "Communication & Structure",
        "score": 1-5,
        "justification": "Detailed explanation"
      }
    ]
  },
  "starAnalysis": {
    "situation": {
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    },
    "task": {
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    },
    "action": {
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    },
    "result": {
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }
  },
  "rewriteSuggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3",
    "Suggestion 4"
  ],
  "guidingQuestions": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4"
  ],
  "companyCultureAlignment": {
    "principles": [
      {
        "principle": "Principle Name",
        "alignment": "How it aligns with the story"
      }
    ],
    "additionalAlignment": "Additional suggestions for better alignment"
  },
  "followUpQuestions": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
  ],
  "alternativeFraming": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ],
  "lengthTimingFeedback": {
    "currentLength": "Estimated speaking time",
    "recommendations": [
      "Recommendation 1",
      "Recommendation 2",
      "Recommendation 3"
    ]
  },
  "interviewReadyAssessment": {
    "overall": "Overall assessment text",
    "topPriorities": [
      "Priority 1",
      "Priority 2",
      "Priority 3"
    ],
    "conclusion": "Concluding statement"
  }
}

**Scoring Guidelines:**
- 5: Exceptional - Exceeds expectations, highly impressive
- 4: Strong - Meets expectations well, minor improvements possible
- 3: Adequate - Meets basic expectations, needs improvement
- 2: Weak - Below expectations, significant gaps
- 1: Poor - Major issues, needs substantial work

**Focus Areas:**
1. Ensure feedback is specific, actionable, and constructive
2. Highlight alignment with ${targetCompany}'s leadership principles
3. Provide role-specific technical depth feedback for ${targetRole}
4. Consider the ${experienceLevel} experience level expectations
5. Balance praise for strengths with clear improvement opportunities

Return ONLY valid JSON, no additional text or markdown formatting.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const evaluation = JSON.parse(content);
    return evaluation;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Evaluation failed: ${error.message}`);
  }
}

