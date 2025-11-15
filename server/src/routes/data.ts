import express, { Request, Response } from 'express';
import { getRoles, getCompanies, getExperienceLevels, getQuestions, getCompanyValues } from '../data/staticData';

const router = express.Router();

router.get('/roles', (req: Request, res: Response) => {
  res.json(getRoles());
});

router.get('/companies', (req: Request, res: Response) => {
  res.json(getCompanies());
});

router.get('/experience-levels', (req: Request, res: Response) => {
  res.json(getExperienceLevels());
});

router.get('/questions', (req: Request, res: Response) => {
  const role = req.query.role as string;
  res.json(getQuestions(role));
});

router.get('/company-values/:company', (req: Request, res: Response) => {
  const company = req.params.company;
  const values = getCompanyValues(company);
  if (!values) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json(values);
});

export default router;

