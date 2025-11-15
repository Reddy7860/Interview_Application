import express, { Request, Response } from 'express';
import { evaluateAnswer } from '../services/evaluationService';

const router = express.Router();

interface EvaluationRequest {
  targetRole: string;
  targetCompany: string;
  experienceLevel: string;
  question: string;
  answer: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { targetRole, targetCompany, experienceLevel, question, answer }: EvaluationRequest = req.body;

    // Validation
    if (!targetRole || !targetCompany || !experienceLevel || !question || !answer) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (answer.length < 50) {
      return res.status(400).json({ error: 'Answer must be at least 50 characters long' });
    }

    if (answer.length > 10000) {
      return res.status(400).json({ error: 'Answer must be less than 10,000 characters' });
    }

    // Evaluate the answer
    const evaluation = await evaluateAnswer({
      targetRole,
      targetCompany,
      experienceLevel,
      question,
      answer
    });

    res.json(evaluation);
  } catch (error: any) {
    console.error('Evaluation error:', error);
    res.status(500).json({ 
      error: 'Failed to evaluate answer',
      message: error.message 
    });
  }
});

export default router;

