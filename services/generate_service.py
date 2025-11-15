import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from data.static_data import get_company_values

# Load environment variables
app_dir = Path(__file__).parent.parent.absolute()
env_path = app_dir / '.env'
load_dotenv(dotenv_path=env_path)

def get_openai_client():
    """Get OpenAI client with API key from environment."""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
    return OpenAI(api_key=api_key)

def generate_star_answer(target_role, target_company, experience_level, question, context=''):
    """
    Generate a STAR interview answer using OpenAI.
    
    Args:
        target_role: The role the candidate is interviewing for
        target_company: The company they're interviewing with
        experience_level: Their experience level
        question: The interview question
        context: Optional context about the candidate's experience
    
    Returns:
        str: Generated STAR-formatted answer
    """
    company_values = get_company_values(target_company)
    leadership_principles = company_values.get('principles', []) if company_values else []
    
    system_prompt = """You are an expert interview coach helping candidates prepare for behavioral interviews. Your role is to generate realistic, compelling STAR (Situation, Task, Action, Result) formatted answers that demonstrate strong leadership, problem-solving, and impact. Generate answers that are specific, measurable, and aligned with the company's values."""
    
    context_section = f"""
**Candidate Context:**
{context if context else 'No specific context provided. Generate a realistic example appropriate for the experience level.'}
""" if context else "\n**Note:** Generate a realistic example appropriate for the experience level.\n"
    
    user_prompt = f"""Generate a compelling STAR-formatted answer for the following behavioral interview question.

**Context:**
- Target Role: {target_role}
- Target Company: {target_company}
- Experience Level: {experience_level}
- Interview Question: {question}
{context_section}
**Company Leadership Principles ({target_company}):**
{chr(10).join([f"- {principle}" for principle in leadership_principles])}

**Requirements:**
1. Generate a realistic, specific example that demonstrates:
   - Strong problem-solving skills
   - Leadership and ownership
   - Impact and measurable results
   - Alignment with {target_company}'s leadership principles

2. Format the answer using the STAR method:
   - **Situation:** Set the context (project, team, challenge)
   - **Task:** Describe your responsibility and what needed to be accomplished
   - **Action:** Detail the specific actions you took (use "I" statements)
   - **Result:** Quantify the impact and outcomes

3. Make it appropriate for {experience_level} level:
   - Include relevant technical details for {target_role}
   - Show appropriate scope and impact for the experience level
   - Demonstrate growth and learning

4. Ensure the answer:
   - Is 300-500 words
   - Includes specific metrics and numbers where possible
   - Shows 2-3 of {target_company}'s leadership principles
   - Is realistic and believable
   - Demonstrates both technical and soft skills

Generate ONLY the STAR answer, formatted clearly with Situation, Task, Action, and Result sections. Do not include any additional commentary or explanation."""

    try:
        model = os.getenv('OPENAI_MODEL', 'gpt-4-turbo-preview')
        openai_client = get_openai_client()
        
        completion = openai_client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.8,
            max_tokens=1500
        )
        
        content = completion.choices[0].message.content
        if not content:
            raise ValueError("No response from OpenAI")
        
        return content.strip()
        
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")

