// Application state
const state = {
    targetRole: 'AI/ML Engineer',
    targetCompany: 'Amazon',
    experienceLevel: 'Mid-level (3-5 years)',
    question: '',
    answer: '',
    answerMode: 'custom', // 'custom' or 'ai'
    evaluation: null,
    roles: [],
    companies: [],
    experienceLevels: [],
    questions: [],
    companyValues: null
};

// API base URL
const API_BASE = '/api';

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialData();
    setupEventListeners();
    await loadCompanyValues(state.targetCompany);
});

// Load initial data
async function loadInitialData() {
    try {
        const [rolesRes, companiesRes, levelsRes, questionsRes] = await Promise.all([
            fetch(`${API_BASE}/data/roles`),
            fetch(`${API_BASE}/data/companies`),
            fetch(`${API_BASE}/data/experience-levels`),
            fetch(`${API_BASE}/data/questions?role=${encodeURIComponent(state.targetRole)}`)
        ]);

        state.roles = await rolesRes.json();
        state.companies = await companiesRes.json();
        state.experienceLevels = await levelsRes.json();
        state.questions = await questionsRes.json();

        populateSelects();
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// Populate select dropdowns
function populateSelects() {
    const roleSelect = document.getElementById('target-role');
    const companySelect = document.getElementById('target-company');
    const levelSelect = document.getElementById('experience-level');

    // Populate roles
    state.roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        if (role === state.targetRole) option.selected = true;
        roleSelect.appendChild(option);
    });

    // Populate companies
    state.companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        if (company === state.targetCompany) option.selected = true;
        companySelect.appendChild(option);
    });

    // Populate experience levels
    state.experienceLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        if (level === state.experienceLevel) option.selected = true;
        levelSelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Role change
    document.getElementById('target-role').addEventListener('change', async (e) => {
        state.targetRole = e.target.value;
        await loadQuestions();
    });

    // Company change
    document.getElementById('target-company').addEventListener('change', async (e) => {
        state.targetCompany = e.target.value;
        await loadCompanyValues(state.targetCompany);
    });

    // Experience level change
    document.getElementById('experience-level').addEventListener('change', (e) => {
        state.experienceLevel = e.target.value;
    });

    // Question input
    document.getElementById('question-input').addEventListener('input', (e) => {
        state.question = e.target.value;
    });

    // Answer textarea
    document.getElementById('answer-textarea').addEventListener('input', (e) => {
        state.answer = e.target.value;
    });

    // AI answer textarea
    document.getElementById('ai-answer-textarea').addEventListener('input', (e) => {
        state.answer = e.target.value;
    });

    // Answer mode radio buttons
    document.querySelectorAll('input[name="answer-mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.answerMode = e.target.value;
            toggleAnswerMode(e.target.value);
        });
    });

    // Generate AI answer button
    document.getElementById('generate-ai-btn').addEventListener('click', handleGenerateAIAnswer);

    // Edit AI answer button
    document.getElementById('edit-ai-btn').addEventListener('click', () => {
        const textarea = document.getElementById('ai-answer-textarea');
        textarea.readOnly = false;
        textarea.focus();
    });

    // Evaluate AI answer button
    document.getElementById('evaluate-ai-btn').addEventListener('click', handleEvaluate);

    // Select question button
    document.getElementById('select-question-btn').addEventListener('click', () => {
        const dropdown = document.getElementById('question-dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        if (dropdown.style.display === 'block') {
            populateQuestionDropdown();
        }
    });

    // Evaluate button
    document.getElementById('evaluate-btn').addEventListener('click', handleEvaluate);

    // Values header toggle
    document.getElementById('values-header').addEventListener('click', () => {
        const content = document.getElementById('values-content');
        const arrow = document.querySelector('.dropdown-arrow');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            arrow.textContent = '▼';
        } else {
            content.style.display = 'none';
            arrow.textContent = '▶';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('question-dropdown');
        const btn = document.getElementById('select-question-btn');
        if (!dropdown.contains(e.target) && e.target !== btn) {
            dropdown.style.display = 'none';
        }
    });
}

// Load questions for current role
async function loadQuestions() {
    try {
        const response = await fetch(`${API_BASE}/data/questions?role=${encodeURIComponent(state.targetRole)}`);
        state.questions = await response.json();
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Populate question dropdown
function populateQuestionDropdown() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    state.questions.forEach(question => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.textContent = question;
        item.addEventListener('click', () => {
            state.question = question;
            document.getElementById('question-input').value = question;
            document.getElementById('question-dropdown').style.display = 'none';
        });
        questionList.appendChild(item);
    });

    // Add custom option
    const customItem = document.createElement('div');
    customItem.className = 'question-item custom-option';
    customItem.textContent = 'Custom/Other';
    customItem.addEventListener('click', () => {
        state.question = '';
        document.getElementById('question-input').value = '';
        document.getElementById('question-input').focus();
        document.getElementById('question-dropdown').style.display = 'none';
    });
    questionList.appendChild(customItem);
}

// Load company values
async function loadCompanyValues(company) {
    try {
        const response = await fetch(`${API_BASE}/data/company-values/${encodeURIComponent(company)}`);
        if (response.ok) {
            state.companyValues = await response.json();
            displayCompanyValues();
        }
    } catch (error) {
        console.error('Error loading company values:', error);
    }
}

// Display company values
function displayCompanyValues() {
    if (!state.companyValues) return;

    document.getElementById('company-name').textContent = `${state.companyValues.name} - Key Values`;
    
    const principlesList = document.getElementById('principles-list');
    principlesList.innerHTML = '';
    
    state.companyValues.principles.forEach(principle => {
        const li = document.createElement('li');
        li.textContent = principle;
        principlesList.appendChild(li);
    });

    const tip = document.getElementById('values-tip');
    if (state.companyValues.tip) {
        tip.textContent = state.companyValues.tip;
        tip.style.display = 'block';
    } else {
        tip.style.display = 'none';
    }
}

// Toggle between custom and AI answer modes
function toggleAnswerMode(mode) {
    const customMode = document.getElementById('custom-answer-mode');
    const aiMode = document.getElementById('ai-answer-mode');
    
    if (mode === 'custom') {
        customMode.style.display = 'block';
        aiMode.style.display = 'none';
        // Use custom answer textarea
        state.answer = document.getElementById('answer-textarea').value;
    } else {
        customMode.style.display = 'none';
        aiMode.style.display = 'block';
        // Use AI answer textarea if it exists
        state.answer = document.getElementById('ai-answer-textarea').value || '';
    }
}

// Handle AI answer generation
async function handleGenerateAIAnswer() {
    if (!state.question.trim()) {
        alert('Please select or enter an interview question first.');
        return;
    }

    const generateBtn = document.getElementById('generate-ai-btn');
    const generatingDiv = document.getElementById('ai-generating');
    const generatedDiv = document.getElementById('ai-generated-answer');
    const contextInput = document.getElementById('ai-context-input').value;
    const progressBar = document.getElementById('ai-progress-bar');
    const progressText = document.getElementById('ai-progress-text');

    generateBtn.disabled = true;
    generatingDiv.style.display = 'block';
    generatedDiv.style.display = 'none';

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + 5, 90);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Generating your STAR answer... ${progress}%`;
    }, 150);

    try {
        console.log('Generating AI answer...', {
            question: state.question.substring(0, 50) + '...',
            hasContext: !!contextInput
        });

        const response = await fetch(`${API_BASE}/generate-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                targetRole: state.targetRole,
                targetCompany: state.targetCompany,
                experienceLevel: state.experienceLevel,
                question: state.question,
                context: contextInput || undefined
            }),
        });

        console.log('AI generation response status:', response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error('AI generation error:', error);
            throw new Error(error.message || error.error || 'Failed to generate answer');
        }

        const data = await response.json();
        console.log('AI answer received');
        
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = 'Complete!';
        
        setTimeout(() => {
            generatingDiv.style.display = 'none';
            generatedDiv.style.display = 'block';
            
            const aiTextarea = document.getElementById('ai-answer-textarea');
            aiTextarea.value = data.answer;
            state.answer = data.answer;
            aiTextarea.readOnly = true;
        }, 500);
    } catch (error) {
        clearInterval(progressInterval);
        generatingDiv.style.display = 'none';
        alert(`Failed to generate answer: ${error.message}`);
    } finally {
        generateBtn.disabled = false;
    }
}

// Handle evaluation
async function handleEvaluate() {
    // Get answer from appropriate textarea based on mode
    if (state.answerMode === 'custom') {
        state.answer = document.getElementById('answer-textarea').value;
    } else {
        state.answer = document.getElementById('ai-answer-textarea').value;
    }

    if (!state.question.trim() || !state.answer.trim()) {
        alert('Please provide both a question and an answer.');
        return;
    }

    // Get the correct evaluate button based on mode
    const evaluateBtn = state.answerMode === 'custom' 
        ? document.getElementById('evaluate-btn')
        : document.getElementById('evaluate-ai-btn');
    const progressDiv = document.getElementById('evaluation-progress');
    const placeholder = document.getElementById('evaluation-placeholder');
    const detailsDiv = document.getElementById('evaluation-details');

    evaluateBtn.disabled = true;
    evaluateBtn.textContent = 'Evaluating...';
    placeholder.style.display = 'none';
    detailsDiv.style.display = 'none';
    progressDiv.style.display = 'block';

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 90);
        updateProgress(progress);
    }, 200);

    try {
        console.log('Sending evaluation request...', {
            targetRole: state.targetRole,
            targetCompany: state.targetCompany,
            experienceLevel: state.experienceLevel,
            question: state.question.substring(0, 50) + '...',
            answerLength: state.answer.length
        });

        const response = await fetch(`${API_BASE}/evaluate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                targetRole: state.targetRole,
                targetCompany: state.targetCompany,
                experienceLevel: state.experienceLevel,
                question: state.question,
                answer: state.answer,
            }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error('Evaluation error:', error);
            throw new Error(error.message || error.error || 'Evaluation failed');
        }

        const evaluationData = await response.json();
        console.log('Evaluation received:', Object.keys(evaluationData));
        state.evaluation = evaluationData;
        clearInterval(progressInterval);
        updateProgress(100);
        
        setTimeout(() => {
            progressDiv.style.display = 'none';
            displayEvaluation(state.evaluation);
        }, 500);
    } catch (error) {
        clearInterval(progressInterval);
        progressDiv.style.display = 'none';
        placeholder.style.display = 'block';
        alert(`Evaluation failed: ${error.message}`);
    } finally {
        evaluateBtn.disabled = false;
        evaluateBtn.textContent = 'Evaluate My Answer';
    }
}

// Update progress bar
function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `Generating recommendations... - ${percent.toFixed(1)}%`;
}

// Display evaluation results
function displayEvaluation(evaluation) {
    const detailsDiv = document.getElementById('evaluation-details');
    detailsDiv.innerHTML = '';

    // Scored Assessment
    const scoredSection = createScoredAssessment(evaluation.scoredAssessment);
    detailsDiv.appendChild(scoredSection);

    // STAR Analysis
    const starSection = createSTARAnalysis(evaluation.starAnalysis);
    detailsDiv.appendChild(starSection);

    // Rewrite Suggestions
    const rewriteSection = createRewriteSuggestions(evaluation);
    detailsDiv.appendChild(rewriteSection);

    // Company Culture Alignment
    const cultureSection = createCultureAlignment(evaluation.companyCultureAlignment, state.targetCompany);
    detailsDiv.appendChild(cultureSection);

    // Follow-up Questions
    const followUpSection = createFollowUpQuestions(evaluation.followUpQuestions);
    detailsDiv.appendChild(followUpSection);

    // Alternative Framing
    const framingSection = createAlternativeFraming(evaluation.alternativeFraming);
    detailsDiv.appendChild(framingSection);

    // Length & Timing
    const timingSection = createLengthTiming(evaluation.lengthTimingFeedback);
    detailsDiv.appendChild(timingSection);

    // Interview Ready Assessment
    const readySection = createInterviewReady(evaluation.interviewReadyAssessment);
    detailsDiv.appendChild(readySection);

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = '<span>📥</span> Download Full Report';
    downloadBtn.addEventListener('click', () => downloadReport(evaluation));
    detailsDiv.appendChild(downloadBtn);

    detailsDiv.style.display = 'block';
}

// Create scored assessment section
function createScoredAssessment(scoredAssessment) {
    const section = document.createElement('div');
    section.className = 'scored-assessment';
    section.innerHTML = '<h4>Scored Assessment with Justification</h4>';

    const table = document.createElement('div');
    table.className = 'assessment-table';

    // Header
    const header = document.createElement('div');
    header.className = 'table-header';
    header.innerHTML = '<div>Dimension</div><div>Score (1-5)</div><div>Justification</div>';
    table.appendChild(header);

    // Rows
    scoredAssessment.dimensions.forEach(dim => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="dimension-name">${dim.dimension}</div>
            <div class="dimension-score">${dim.score}</div>
            <div class="dimension-justification">${dim.justification}</div>
        `;
        table.appendChild(row);
    });

    section.appendChild(table);
    return section;
}

// Create STAR analysis section
function createSTARAnalysis(starAnalysis) {
    const section = document.createElement('div');
    section.className = 'star-analysis';
    section.innerHTML = '<h4>STAR-by-STAR Analysis</h4>';

    Object.entries(starAnalysis).forEach(([key, data]) => {
        const analysisSection = document.createElement('div');
        analysisSection.className = 'analysis-section';
        
        const title = document.createElement('h5');
        title.className = 'analysis-section-title';
        title.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        analysisSection.appendChild(title);

        const content = document.createElement('div');
        content.className = 'analysis-content';

        const strengths = document.createElement('div');
        strengths.className = 'strengths';
        strengths.innerHTML = '<strong>Strengths:</strong><ul></ul>';
        data.strengths.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            strengths.querySelector('ul').appendChild(li);
        });

        const opportunities = document.createElement('div');
        opportunities.className = 'opportunities';
        opportunities.innerHTML = '<strong>Opportunities:</strong><ul></ul>';
        data.opportunities.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            opportunities.querySelector('ul').appendChild(li);
        });

        content.appendChild(strengths);
        content.appendChild(opportunities);
        analysisSection.appendChild(content);
        section.appendChild(analysisSection);
    });

    return section;
}

// Create rewrite suggestions section
function createRewriteSuggestions(evaluation) {
    const section = document.createElement('div');
    section.className = 'rewrite-suggestions';
    section.innerHTML = '<h4>Rewrite Suggestions & Guiding Questions</h4>';

    const content = document.createElement('div');
    content.className = 'suggestions-content';

    const suggestions = document.createElement('div');
    suggestions.innerHTML = '<strong>Rewrite Suggestions:</strong><ul></ul>';
    evaluation.rewriteSuggestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        suggestions.querySelector('ul').appendChild(li);
    });

    const questions = document.createElement('div');
    questions.innerHTML = '<strong>Guiding Questions:</strong><ul></ul>';
    evaluation.guidingQuestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        questions.querySelector('ul').appendChild(li);
    });

    content.appendChild(suggestions);
    content.appendChild(questions);
    section.appendChild(content);
    return section;
}

// Create culture alignment section
function createCultureAlignment(alignment, company) {
    const section = document.createElement('div');
    section.className = 'culture-alignment';
    section.innerHTML = `<h4>Company Culture Alignment (${company})</h4>`;

    const ul = document.createElement('ul');
    alignment.principles.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${p.principle}:</strong> ${p.alignment}`;
        ul.appendChild(li);
    });
    section.appendChild(ul);

    const p = document.createElement('p');
    p.textContent = alignment.additionalAlignment;
    section.appendChild(p);

    return section;
}

// Create follow-up questions section
function createFollowUpQuestions(questions) {
    const section = document.createElement('div');
    section.className = 'follow-up-questions';
    section.innerHTML = '<h4>Follow-up Questions to Expect</h4>';

    const ul = document.createElement('ul');
    questions.forEach(q => {
        const li = document.createElement('li');
        li.textContent = q;
        ul.appendChild(li);
    });
    section.appendChild(ul);

    return section;
}

// Create alternative framing section
function createAlternativeFraming(framing) {
    const section = document.createElement('div');
    section.className = 'alternative-framing';
    section.innerHTML = '<h4>Alternative Framing Suggestions</h4>';

    const ul = document.createElement('ul');
    framing.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    section.appendChild(ul);

    return section;
}

// Create length timing section
function createLengthTiming(timing) {
    const section = document.createElement('div');
    section.className = 'length-timing';
    section.innerHTML = '<h4>Length & Timing Feedback</h4>';

    const p = document.createElement('p');
    p.innerHTML = `<strong>Current Length:</strong> ${timing.currentLength}`;
    section.appendChild(p);

    const ul = document.createElement('ul');
    timing.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        ul.appendChild(li);
    });
    section.appendChild(ul);

    return section;
}

// Create interview ready section
function createInterviewReady(assessment) {
    const section = document.createElement('div');
    section.className = 'interview-ready';
    section.innerHTML = '<h4>Interview-Ready Assessment & Top 3 Priorities</h4>';

    const p1 = document.createElement('p');
    p1.textContent = assessment.overall;
    section.appendChild(p1);

    const priorities = document.createElement('div');
    priorities.className = 'priorities';
    priorities.innerHTML = '<strong>Top 3 Priorities to Maximize Impact:</strong><ol></ol>';
    assessment.topPriorities.forEach((priority, idx) => {
        const li = document.createElement('li');
        li.textContent = priority;
        priorities.querySelector('ol').appendChild(li);
    });
    section.appendChild(priorities);

    const p2 = document.createElement('p');
    p2.textContent = assessment.conclusion;
    section.appendChild(p2);

    return section;
}

// Download report
function downloadReport(evaluation) {
    const report = generateMarkdownReport(evaluation);
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `star_evaluation_${new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate markdown report
function generateMarkdownReport(evaluation) {
    const timestamp = new Date().toISOString();
    return `# STAR Interview Evaluation Report

**Generated:** ${timestamp}
**Target Role:** ${state.targetRole}
**Target Company:** ${state.targetCompany}
**Experience Level:** ${state.experienceLevel}
**Question:** ${state.question}

---

## Scored Assessment with Justification

${evaluation.scoredAssessment.dimensions.map(dim => `### ${dim.dimension}
**Score:** ${dim.score}/5
**Justification:** ${dim.justification}`).join('\n\n')}

---

## STAR-by-STAR Analysis

### Situation
**Strengths:**
${evaluation.starAnalysis.situation.strengths.map(s => `- ${s}`).join('\n')}

**Opportunities:**
${evaluation.starAnalysis.situation.opportunities.map(o => `- ${o}`).join('\n')}

### Task
**Strengths:**
${evaluation.starAnalysis.task.strengths.map(s => `- ${s}`).join('\n')}

**Opportunities:**
${evaluation.starAnalysis.task.opportunities.map(o => `- ${o}`).join('\n')}

### Action
**Strengths:**
${evaluation.starAnalysis.action.strengths.map(s => `- ${s}`).join('\n')}

**Opportunities:**
${evaluation.starAnalysis.action.opportunities.map(o => `- ${o}`).join('\n')}

### Result
**Strengths:**
${evaluation.starAnalysis.result.strengths.map(s => `- ${s}`).join('\n')}

**Opportunities:**
${evaluation.starAnalysis.result.opportunities.map(o => `- ${o}`).join('\n')}

---

## Rewrite Suggestions & Guiding Questions

### Rewrite Suggestions
${evaluation.rewriteSuggestions.map(s => `- ${s}`).join('\n')}

### Guiding Questions
${evaluation.guidingQuestions.map(q => `- ${q}`).join('\n')}

---

## Company Culture Alignment (${state.targetCompany})

${evaluation.companyCultureAlignment.principles.map(p => `**${p.principle}:** ${p.alignment}`).join('\n\n')}

${evaluation.companyCultureAlignment.additionalAlignment}

---

## Follow-up Questions to Expect

${evaluation.followUpQuestions.map(q => `- ${q}`).join('\n')}

---

## Alternative Framing Suggestions

${evaluation.alternativeFraming.map(s => `- ${s}`).join('\n')}

---

## Length & Timing Feedback

**Current Length:** ${evaluation.lengthTimingFeedback.currentLength}

**Recommendations:**
${evaluation.lengthTimingFeedback.recommendations.map(r => `- ${r}`).join('\n')}

---

## Interview-Ready Assessment & Top 3 Priorities

**Overall Assessment:**
${evaluation.interviewReadyAssessment.overall}

**Top 3 Priorities to Maximize Impact:**
${evaluation.interviewReadyAssessment.topPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Conclusion:**
${evaluation.interviewReadyAssessment.conclusion}

---

## Your Original Answer

${state.answer}
`;
}

