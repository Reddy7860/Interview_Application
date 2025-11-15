import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from data.static_data import get_company_values

# Load environment variables - ensure we load from the project root
app_dir = Path(__file__).parent.parent.absolute()
env_path = app_dir / '.env'
load_dotenv(dotenv_path=env_path)

# Initialize OpenAI client
def get_openai_client():
    """Get OpenAI client with API key from environment."""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
    return OpenAI(api_key=api_key)

def evaluate_answer(target_role, target_company, experience_level, question, answer):
    """
    Evaluate a STAR interview answer using OpenAI.
    
    Args:
        target_role: The role the candidate is interviewing for
        target_company: The company they're interviewing with
        experience_level: Their experience level
        question: The interview question
        answer: The candidate's STAR-formatted answer
    
    Returns:
        dict: Comprehensive evaluation results
    """
    company_values = get_company_values(target_company)
    leadership_principles = company_values.get('principles', []) if company_values else []
    
    system_prompt = """You are an expert interview coach specializing in behavioral interviews using the STAR method (Situation, Task, Action, Result). Your role is to provide comprehensive, actionable feedback that helps candidates improve their interview performance."""
    
    user_prompt = f"""Evaluate the following behavioral interview answer using the STAR method.

**Context:**
- Target Role: {target_role}
- Target Company: {target_company}
- Experience Level: {experience_level}
- Interview Question: {question}

**Company Leadership Principles ({target_company}):**
{chr(10).join([f"{i+1}. {principle}" for i, principle in enumerate(leadership_principles)])}

**Candidate's Answer:**
{answer}

**Evaluation Requirements:**

Provide a comprehensive evaluation in the following JSON format:

{{
  "scoredAssessment": {{
    "dimensions": [
      {{
        "dimension": "Situation Clarity",
        "score": 1-5,
        "justification": "Detailed explanation"
      }},
      {{
        "dimension": "Task Definition",
        "score": 1-5,
        "justification": "Detailed explanation"
      }},
      {{
        "dimension": "Actions Taken",
        "score": 1-5,
        "justification": "Detailed explanation"
      }},
      {{
        "dimension": "Results & Impact",
        "score": 1-5,
        "justification": "Detailed explanation"
      }},
      {{
        "dimension": "{target_company} Leadership Principles",
        "score": 1-5,
        "justification": "Detailed explanation showing which principles are demonstrated"
      }},
      {{
        "dimension": "Technical Depth (Role-Relevant)",
        "score": 1-5,
        "justification": "Detailed explanation"
      }},
      {{
        "dimension": "Communication & Structure",
        "score": 1-5,
        "justification": "Detailed explanation"
      }}
    ]
  }},
  "starAnalysis": {{
    "situation": {{
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }},
    "task": {{
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }},
    "action": {{
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }},
    "result": {{
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }}
  }},
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
  "companyCultureAlignment": {{
    "principles": [
      {{
        "principle": "Principle Name",
        "alignment": "How it aligns with the story"
      }}
    ],
    "additionalAlignment": "Additional suggestions for better alignment"
  }},
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
  "lengthTimingFeedback": {{
    "currentLength": "Estimated speaking time",
    "recommendations": [
      "Recommendation 1",
      "Recommendation 2",
      "Recommendation 3"
    ]
  }},
  "interviewReadyAssessment": {{
    "overall": "Overall assessment text",
    "topPriorities": [
      "Priority 1",
      "Priority 2",
      "Priority 3"
    ],
    "conclusion": "Concluding statement"
  }}
}}

**Scoring Guidelines:**
- 5: Exceptional - Exceeds expectations, highly impressive
- 4: Strong - Meets expectations well, minor improvements possible
- 3: Adequate - Meets basic expectations, needs improvement
- 2: Weak - Below expectations, significant gaps
- 1: Poor - Major issues, needs substantial work

**Focus Areas:**
1. Ensure feedback is specific, actionable, and constructive
2. Highlight alignment with {target_company}'s leadership principles
3. Provide role-specific technical depth feedback for {target_role}
4. Consider the {experience_level} experience level expectations
5. Balance praise for strengths with clear improvement opportunities

Return ONLY valid JSON, no additional text or markdown formatting."""

    try:
        model = os.getenv('OPENAI_MODEL', 'gpt-4-turbo-preview')
        openai_client = get_openai_client()
        
        completion = openai_client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=4000,
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        if not content:
            raise ValueError("No response from OpenAI")
        
        evaluation = json.loads(content)
        return evaluation
        
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse OpenAI response: {str(e)}")
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")

