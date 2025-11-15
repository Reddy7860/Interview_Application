from flask import Blueprint, request, jsonify
from data.static_data import (
    get_roles,
    get_companies,
    get_experience_levels,
    get_questions,
    get_company_values
)

data_bp = Blueprint('data', __name__)

@data_bp.route('/roles', methods=['GET'])
def roles():
    """Get list of available roles."""
    return jsonify(get_roles()), 200

@data_bp.route('/companies', methods=['GET'])
def companies():
    """Get list of available companies."""
    return jsonify(get_companies()), 200

@data_bp.route('/experience-levels', methods=['GET'])
def experience_levels():
    """Get list of experience levels."""
    return jsonify(get_experience_levels()), 200

@data_bp.route('/questions', methods=['GET'])
def questions():
    """Get list of interview questions, optionally filtered by role."""
    role = request.args.get('role', None)
    return jsonify(get_questions(role)), 200

@data_bp.route('/company-values/<company>', methods=['GET'])
def company_values(company):
    """Get company values and leadership principles for a specific company."""
    values = get_company_values(company)
    if not values:
        return jsonify({'error': 'Company not found'}), 404
    return jsonify(values), 200

