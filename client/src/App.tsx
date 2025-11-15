import { useState, useEffect } from 'react';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import InterviewInformation from './components/InterviewInformation';
import InterviewQuestion from './components/InterviewQuestion';
import STARAnswer from './components/STARAnswer';
import InterviewResources from './components/InterviewResources';
import EvaluationResults from './components/EvaluationResults';
import './App.css';

export interface EvaluationData {
  scoredAssessment: {
    dimensions: Array<{
      dimension: string;
      score: number;
      justification: string;
    }>;
  };
  starAnalysis: {
    situation: { strengths: string[]; opportunities: string[] };
    task: { strengths: string[]; opportunities: string[] };
    action: { strengths: string[]; opportunities: string[] };
    result: { strengths: string[]; opportunities: string[] };
  };
  rewriteSuggestions: string[];
  guidingQuestions: string[];
  companyCultureAlignment: {
    principles: Array<{ principle: string; alignment: string }>;
    additionalAlignment: string;
  };
  followUpQuestions: string[];
  alternativeFraming: string[];
  lengthTimingFeedback: {
    currentLength: string;
    recommendations: string[];
  };
  interviewReadyAssessment: {
    overall: string;
    topPriorities: string[];
    conclusion: string;
  };
}

function App() {
  const [targetRole, setTargetRole] = useState<string>('AI/ML Engineer');
  const [targetCompany, setTargetCompany] = useState<string>('Amazon');
  const [experienceLevel, setExperienceLevel] = useState<string>('Mid-level (3-5 years)');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationProgress, setEvaluationProgress] = useState<number>(0);

  const handleEvaluate = async () => {
    if (!question.trim() || !answer.trim()) {
      alert('Please provide both a question and an answer.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setEvaluationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetRole,
          targetCompany,
          experienceLevel,
          question,
          answer,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Evaluation failed');
      }

      const data = await response.json();
      setEvaluation(data);
      setEvaluationProgress(100);
    } catch (error: any) {
      console.error('Evaluation error:', error);
      alert(`Evaluation failed: ${error.message}`);
    } finally {
      clearInterval(progressInterval);
      setIsEvaluating(false);
      setTimeout(() => setEvaluationProgress(0), 1000);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <div className="main-content">
          <HowItWorks />
          <div className="content-grid">
            <div className="left-column">
              <InterviewInformation
                targetRole={targetRole}
                setTargetRole={setTargetRole}
                targetCompany={targetCompany}
                setTargetCompany={setTargetCompany}
                experienceLevel={experienceLevel}
                setExperienceLevel={setExperienceLevel}
              />
              <InterviewQuestion
                question={question}
                setQuestion={setQuestion}
                targetRole={targetRole}
              />
              <STARAnswer
                answer={answer}
                setAnswer={setAnswer}
                onEvaluate={handleEvaluate}
                isEvaluating={isEvaluating}
              />
              <EvaluationResults
                evaluation={evaluation}
                isEvaluating={isEvaluating}
                progress={evaluationProgress}
                targetRole={targetRole}
                targetCompany={targetCompany}
                experienceLevel={experienceLevel}
                question={question}
                answer={answer}
              />
            </div>
            <div className="right-column">
              <InterviewResources targetCompany={targetCompany} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

