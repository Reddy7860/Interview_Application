import { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewQuestion.css';

interface InterviewQuestionProps {
  question: string;
  setQuestion: (question: string) => void;
  targetRole: string;
}

function InterviewQuestion({ question, setQuestion, targetRole }: InterviewQuestionProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [customQuestion, setCustomQuestion] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/data/questions?role=${encodeURIComponent(targetRole)}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [targetRole]);

  const handleQuestionSelect = (selectedQuestion: string) => {
    if (selectedQuestion === 'Custom/Other') {
      setCustomQuestion(true);
      setQuestion('');
    } else {
      setQuestion(selectedQuestion);
      setCustomQuestion(false);
      setIsOpen(false);
    }
  };

  return (
    <section className="interview-question">
      <h2 className="section-title">Interview Question</h2>
      <div className="question-selector">
        <button
          type="button"
          className="select-question-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select Question
        </button>
        <p className="field-instruction">
          Choose a common question or select 'Custom/Other' to enter your own
        </p>
        
        {isOpen && (
          <div className="question-dropdown">
            <div className="question-list">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="question-item"
                  onClick={() => handleQuestionSelect(q)}
                >
                  {q}
                </div>
              ))}
              <div
                className="question-item custom-option"
                onClick={() => handleQuestionSelect('Custom/Other')}
              >
                Custom/Other
              </div>
            </div>
          </div>
        )}

        <input
          type="text"
          className="question-input"
          placeholder="Choose a common question or select Custom/other to enter your own"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (e.target.value) {
              setCustomQuestion(true);
            }
          }}
          onFocus={() => {
            if (!question) {
              setIsOpen(true);
            }
          }}
        />
      </div>
    </section>
  );
}

export default InterviewQuestion;

