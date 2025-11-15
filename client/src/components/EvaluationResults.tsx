import { useState } from 'react';
import { EvaluationData } from '../App';
import './EvaluationResults.css';

interface EvaluationResultsProps {
  evaluation: EvaluationData | null;
  isEvaluating: boolean;
  progress: number;
  targetRole: string;
  targetCompany: string;
  experienceLevel: string;
  question: string;
  answer: string;
}

function EvaluationResults({
  evaluation,
  isEvaluating,
  progress,
  targetRole,
  targetCompany,
  experienceLevel,
  question,
  answer,
}: EvaluationResultsProps) {
  const [showFullReport, setShowFullReport] = useState(false);

  const downloadReport = () => {
    if (!evaluation) return;

    const report = generateMarkdownReport(evaluation, {
      targetRole,
      targetCompany,
      experienceLevel,
      question,
      answer,
    });

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `star_evaluation_${new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateMarkdownReport = (
    evalData: EvaluationData,
    context: {
      targetRole: string;
      targetCompany: string;
      experienceLevel: string;
      question: string;
      answer: string;
    }
  ): string => {
    const timestamp = new Date().toISOString();
    return `# STAR Interview Evaluation Report

**Generated:** ${timestamp}
**Target Role:** ${context.targetRole}
**Target Company:** ${context.targetCompany}
**Experience Level:** ${context.experienceLevel}
**Question:** ${context.question}

---

## Scored Assessment with Justification

${evalData.scoredAssessment.dimensions
  .map(
    (dim) => `### ${dim.dimension}
**Score:** ${dim.score}/5
**Justification:** ${dim.justification}`
  )
  .join('\n\n')}

---

## STAR-by-STAR Analysis

### Situation
**Strengths:**
${evalData.starAnalysis.situation.strengths.map((s) => `- ${s}`).join('\n')}

**Opportunities:**
${evalData.starAnalysis.situation.opportunities.map((o) => `- ${o}`).join('\n')}

### Task
**Strengths:**
${evalData.starAnalysis.task.strengths.map((s) => `- ${s}`).join('\n')}

**Opportunities:**
${evalData.starAnalysis.task.opportunities.map((o) => `- ${o}`).join('\n')}

### Action
**Strengths:**
${evalData.starAnalysis.action.strengths.map((s) => `- ${s}`).join('\n')}

**Opportunities:**
${evalData.starAnalysis.action.opportunities.map((o) => `- ${o}`).join('\n')}

### Result
**Strengths:**
${evalData.starAnalysis.result.strengths.map((s) => `- ${s}`).join('\n')}

**Opportunities:**
${evalData.starAnalysis.result.opportunities.map((o) => `- ${o}`).join('\n')}

---

## Rewrite Suggestions & Guiding Questions

### Rewrite Suggestions
${evalData.rewriteSuggestions.map((s) => `- ${s}`).join('\n')}

### Guiding Questions
${evalData.guidingQuestions.map((q) => `- ${q}`).join('\n')}

---

## Company Culture Alignment (${context.targetCompany})

${evalData.companyCultureAlignment.principles
  .map((p) => `**${p.principle}:** ${p.alignment}`)
  .join('\n\n')}

${evalData.companyCultureAlignment.additionalAlignment}

---

## Follow-up Questions to Expect

${evalData.followUpQuestions.map((q) => `- ${q}`).join('\n')}

---

## Alternative Framing Suggestions

${evalData.alternativeFraming.map((s) => `- ${s}`).join('\n')}

---

## Length & Timing Feedback

**Current Length:** ${evalData.lengthTimingFeedback.currentLength}

**Recommendations:**
${evalData.lengthTimingFeedback.recommendations.map((r) => `- ${r}`).join('\n')}

---

## Interview-Ready Assessment & Top 3 Priorities

**Overall Assessment:**
${evalData.interviewReadyAssessment.overall}

**Top 3 Priorities to Maximize Impact:**
${evalData.interviewReadyAssessment.topPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Conclusion:**
${evalData.interviewReadyAssessment.conclusion}

---

## Your Original Answer

${context.answer}
`;
  };

  return (
    <section className="evaluation-results">
      <h2 className="section-title">Evaluation Results</h2>
      <div className="evaluation-content">
        <h3 className="subsection-title">Comprehensive Evaluation</h3>

        {isEvaluating && (
          <div className="evaluation-progress">
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-text">
              Generating recommendations... - {progress.toFixed(1)}%
            </p>
          </div>
        )}

        {!isEvaluating && !evaluation && (
          <div className="evaluation-placeholder">
            Your evaluation will appear here after submission...
          </div>
        )}

        {!isEvaluating && evaluation && (
          <div className="evaluation-details">
            <div className="scored-assessment">
              <h4>Scored Assessment with Justification</h4>
              <div className="assessment-table">
                <div className="table-header">
                  <div>Dimension</div>
                  <div>Score (1-5)</div>
                  <div>Justification</div>
                </div>
                {evaluation.scoredAssessment.dimensions.map((dim, index) => (
                  <div key={index} className="table-row">
                    <div className="dimension-name">{dim.dimension}</div>
                    <div className="dimension-score">{dim.score}</div>
                    <div className="dimension-justification">{dim.justification}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="star-analysis">
              <h4>STAR-by-STAR Analysis</h4>
              {Object.entries(evaluation.starAnalysis).map(([section, data]) => (
                <div key={section} className="analysis-section">
                  <h5 className="analysis-section-title">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </h5>
                  <div className="analysis-content">
                    <div className="strengths">
                      <strong>Strengths:</strong>
                      <ul>
                        {data.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="opportunities">
                      <strong>Opportunities:</strong>
                      <ul>
                        {data.opportunities.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rewrite-suggestions">
              <h4>Rewrite Suggestions & Guiding Questions</h4>
              <div className="suggestions-content">
                <div>
                  <strong>Rewrite Suggestions:</strong>
                  <ul>
                    {evaluation.rewriteSuggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Guiding Questions:</strong>
                  <ul>
                    {evaluation.guidingQuestions.map((question, idx) => (
                      <li key={idx}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="culture-alignment">
              <h4>Company Culture Alignment ({targetCompany})</h4>
              <ul>
                {evaluation.companyCultureAlignment.principles.map((principle, idx) => (
                  <li key={idx}>
                    <strong>{principle.principle}:</strong> {principle.alignment}
                  </li>
                ))}
              </ul>
              <p>{evaluation.companyCultureAlignment.additionalAlignment}</p>
            </div>

            <div className="follow-up-questions">
              <h4>Follow-up Questions to Expect</h4>
              <ul>
                {evaluation.followUpQuestions.map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
            </div>

            <div className="alternative-framing">
              <h4>Alternative Framing Suggestions</h4>
              <ul>
                {evaluation.alternativeFraming.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="length-timing">
              <h4>Length & Timing Feedback</h4>
              <p>
                <strong>Current Length:</strong> {evaluation.lengthTimingFeedback.currentLength}
              </p>
              <ul>
                {evaluation.lengthTimingFeedback.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="interview-ready">
              <h4>Interview-Ready Assessment & Top 3 Priorities</h4>
              <p>{evaluation.interviewReadyAssessment.overall}</p>
              <div className="priorities">
                <strong>Top 3 Priorities to Maximize Impact:</strong>
                <ol>
                  {evaluation.interviewReadyAssessment.topPriorities.map((priority, idx) => (
                    <li key={idx}>{priority}</li>
                  ))}
                </ol>
              </div>
              <p>{evaluation.interviewReadyAssessment.conclusion}</p>
            </div>

            <button
              type="button"
              className="download-btn"
              onClick={downloadReport}
            >
              <span>📥</span> Download Full Report
            </button>
          </div>
        )}
      </div>

      <div className="tips-section">
        <h3 className="subsection-title">Tips for Best Results</h3>
        <ul>
          <li>Be specific: Include numbers, metrics, and concrete details</li>
          <li>Show your thinking: Explain <em>why</em> you made certain decisions</li>
          <li>Demonstrate impact: Connect your actions to business outcomes</li>
          <li>Include learning: What did you take away from the experience?</li>
        </ul>
      </div>
    </section>
  );
}

export default EvaluationResults;

