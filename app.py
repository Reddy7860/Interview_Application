from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables - ensure we're loading from the correct directory
import sys
from pathlib import Path

# Get the directory where app.py is located
app_dir = Path(__file__).parent.absolute()
env_path = app_dir / '.env'

# Load environment variables
load_dotenv(dotenv_path=env_path)

# Verify API key is loaded
if not os.getenv('OPENAI_API_KEY'):
    print("WARNING: OPENAI_API_KEY not found in environment variables!")
    print(f"Looking for .env file at: {env_path}")
    print(f".env file exists: {env_path.exists()}")

# Import routes
from routes.evaluation import evaluation_bp
from routes.data import data_bp
from routes.generate import generate_bp

app = Flask(__name__, 
            template_folder='templates',
            static_folder='static')

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size

# CORS configuration - Not strictly needed for same-origin, but kept for API flexibility
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "100 per hour"],
    storage_uri="memory://"
)

# Register blueprints
app.register_blueprint(evaluation_bp, url_prefix='/api/evaluate')
app.register_blueprint(data_bp, url_prefix='/api/data')
app.register_blueprint(generate_bp, url_prefix='/api/generate-answer')

# Main route - serve the application
@app.route('/')
def index():
    return render_template('index.html')

# Health check
@app.route('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.utcnow().isoformat()
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({
        'error': 'Rate limit exceeded',
        'message': str(e.description)
    }), 429

if __name__ == '__main__':
    port = int(os.getenv('PORT', 7860))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
