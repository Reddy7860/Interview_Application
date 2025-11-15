"""Test script to verify OpenAI evaluation is working."""
import os
from dotenv import load_dotenv
from services.evaluation_service import evaluate_answer

load_dotenv()

# Test data
test_data = {
    'target_role': 'AI/ML Engineer',
    'target_company': 'Amazon',
    'experience_level': 'Mid-level (3-5 years)',
    'question': 'Tell me about a time when you received harsh feedback about your work. How did you respond and improve?',
    'answer': '''Situation: I was working on a machine learning model for customer recommendations. My manager gave me harsh feedback that my model was too slow and not meeting performance requirements.

Task: I needed to improve the model's performance while maintaining accuracy.

Action: I analyzed the model architecture, optimized the feature engineering pipeline, and implemented caching mechanisms. I also consulted with senior engineers and read research papers on optimization techniques.

Result: I reduced inference time by 60% while maintaining 95% accuracy. The model was deployed successfully and received positive feedback from the team.'''
}

print("Testing OpenAI evaluation...")
print(f"API Key present: {'Yes' if os.getenv('OPENAI_API_KEY') else 'No'}")

try:
    result = evaluate_answer(**test_data)
    print("\n✅ Evaluation successful!")
    print(f"Scored Assessment Dimensions: {len(result.get('scoredAssessment', {}).get('dimensions', []))}")
    print(f"STAR Analysis sections: {len(result.get('starAnalysis', {}))}")
    print("\nSample result:")
    if result.get('scoredAssessment', {}).get('dimensions'):
        first_dim = result['scoredAssessment']['dimensions'][0]
        print(f"  {first_dim['dimension']}: {first_dim['score']}/5")
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()

