import './STARAnswer.css';

interface STARAnswerProps {
  answer: string;
  setAnswer: (answer: string) => void;
  onEvaluate: () => void;
  isEvaluating: boolean;
}

function STARAnswer({ answer, setAnswer, onEvaluate, isEvaluating }: STARAnswerProps) {
  return (
    <section className="star-answer">
      <h2 className="section-title">Your STAR Answer</h2>
      <div className="answer-tabs">
        <div className="tab active">Your Written Answer</div>
      </div>
      <div className="answer-container">
        <textarea
          className="answer-textarea"
          placeholder={`Paste your STAR-formatted answer here...
Example structure:
Situation: (Context and stakes)
Task: (Your responsibility and challenge)
Action: (What you did and why)
Result: (Outcomes and learnings)`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={15}
        />
        <button
          type="button"
          className="evaluate-btn"
          onClick={onEvaluate}
          disabled={isEvaluating || !answer.trim()}
        >
          {isEvaluating ? 'Evaluating...' : 'Evaluate My Answer'}
        </button>
      </div>
    </section>
  );
}

export default STARAnswer;

