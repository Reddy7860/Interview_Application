from flask import Blueprint, request, jsonify
from services.generate_service import generate_star_answer

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/', methods=['POST'])
def generate():
    """
    Generate a STAR interview answer using AI.
    
    Expected JSON body:
    {
        "targetRole": "AI/ML Engineer",
        "targetCompany": "Amazon",
        "experienceLevel": "Mid-level (3-5 years)",
        "question": "Tell me about a time...",
        "context": "Optional context about experience"
    }
    """
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['targetRole', 'targetCompany', 'experienceLevel', 'question']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        question = data['question']
        if len(question) < 10:
            return jsonify({'error': 'Question must be at least 10 characters long'}), 400
        
        # Generate the answer
        answer = generate_star_answer(
            target_role=data['targetRole'],
            target_company=data['targetCompany'],
            experience_level=data['experienceLevel'],
            question=question,
            context=data.get('context', '')
        )
        
        return jsonify({'answer': answer}), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f'Generation error: {str(e)}')
        return jsonify({
            'error': 'Failed to generate answer',
            'message': str(e)
        }), 500

