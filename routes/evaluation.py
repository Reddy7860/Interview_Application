from flask import Blueprint, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from services.evaluation_service import evaluate_answer

evaluation_bp = Blueprint('evaluation', __name__)

@evaluation_bp.route('/', methods=['POST'])
def evaluate():
    """
    Evaluate a STAR interview answer using AI.
    
    Expected JSON body:
    {
        "targetRole": "AI/ML Engineer",
        "targetCompany": "Amazon",
        "experienceLevel": "Mid-level (3-5 years)",
        "question": "Tell me about a time...",
        "answer": "Situation: ..."
    }
    """
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['targetRole', 'targetCompany', 'experienceLevel', 'question', 'answer']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        answer = data['answer']
        if len(answer) < 50:
            return jsonify({'error': 'Answer must be at least 50 characters long'}), 400
        
        if len(answer) > 10000:
            return jsonify({'error': 'Answer must be less than 10,000 characters'}), 400
        
        # Evaluate the answer
        evaluation = evaluate_answer(
            target_role=data['targetRole'],
            target_company=data['targetCompany'],
            experience_level=data['experienceLevel'],
            question=data['question'],
            answer=answer
        )
        
        return jsonify(evaluation), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f'Evaluation error: {str(e)}')
        return jsonify({
            'error': 'Failed to evaluate answer',
            'message': str(e)
        }), 500

