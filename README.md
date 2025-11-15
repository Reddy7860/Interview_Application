# STAR Behavioral Interview Answer Evaluator

A comprehensive AI-powered web application for evaluating behavioral interview answers using the STAR method (Situation, Task, Action, Result). Built with Flask (Python) backend and React frontend.

## Features

- **AI-Powered Evaluation**: Uses OpenAI GPT-4 to provide comprehensive feedback
- **Role & Company Specific**: Tailored evaluations based on target role and company
- **STAR Method Analysis**: Detailed breakdown of Situation, Task, Action, and Result
- **Leadership Principles Alignment**: Evaluates answers against company-specific leadership principles
- **Scored Assessment**: 7-dimension scoring system (1-5 scale)
- **Downloadable Reports**: Export full evaluation reports in Markdown format
- **Modern Dark UI**: Beautiful, responsive dark-themed interface
- **Scalable Architecture**: Built to handle 10,000+ users per day with Flask

## Tech Stack

### Frontend
- Pure HTML/CSS/JavaScript (no frameworks)
- Modern CSS with CSS Variables
- Vanilla JavaScript for interactivity

### Backend
- Flask (Python) with Jinja2 templates
- OpenAI API integration
- Flask-CORS for cross-origin requests
- Flask-Limiter for rate limiting
- Gunicorn for production deployment

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm
- OpenAI API key

### Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or use a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **No frontend dependencies needed!** This is a pure Flask application.

3. **Configure environment variables:**
   
   Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4-turbo-preview
   PORT=7860
   CLIENT_URL=http://localhost:3000
   ```

### Running the Application

Simply start the Flask server:
```bash
python app.py
```

Then open http://localhost:7860 in your browser. The Flask app serves both the frontend and API!

### Production Deployment

1. **Set environment variables:**
   ```bash
   export FLASK_ENV=production
   export OPENAI_API_KEY=your_key_here
   ```

3. **Run with Gunicorn:**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:7860 app:app
   ```

   Or use the provided run script:
   ```bash
   python run_production.py
   ```

## Project Structure

```
Interview_Application/
├── app.py                 # Flask application entry point
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── templates/            # Jinja2 HTML templates
│   └── index.html        # Main application page
├── static/               # Static files (CSS, JS)
│   ├── css/
│   │   └── style.css     # Application styles
│   └── js/
│       └── app.js        # Frontend JavaScript
├── routes/               # Flask blueprints (routes)
│   ├── evaluation.py     # Evaluation endpoint
│   └── data.py           # Data endpoints
├── services/             # Business logic
│   └── evaluation_service.py  # OpenAI integration
└── data/                 # Data layer
    └── static_data.py    # Static data (roles, companies, etc.)
```

## API Endpoints

### Evaluation
- `POST /api/evaluate` - Evaluate a STAR answer
  ```json
  {
    "targetRole": "AI/ML Engineer",
    "targetCompany": "Amazon",
    "experienceLevel": "Mid-level (3-5 years)",
    "question": "Tell me about a time...",
    "answer": "Situation: ..."
  }
  ```

### Data
- `GET /api/data/roles` - Get list of roles
- `GET /api/data/companies` - Get list of companies
- `GET /api/data/experience-levels` - Get experience levels
- `GET /api/data/questions?role=<role>` - Get questions for a role
- `GET /api/data/company-values/<company>` - Get company values

### Health
- `GET /api/health` - Health check endpoint

## Usage

1. Select your target role, company, and experience level
2. Choose or enter a behavioral interview question
3. Paste your STAR-formatted answer
4. Click "Evaluate My Answer"
5. Review comprehensive feedback including:
   - Scored assessment (7 dimensions)
   - STAR-by-STAR analysis
   - Rewrite suggestions
   - Company culture alignment
   - Follow-up questions
   - Interview-ready assessment
6. Download the full report as a Markdown file

## Evaluation Dimensions

1. **Situation Clarity** - How well the context is established
2. **Task Definition** - Clarity of responsibility and challenge
3. **Actions Taken** - Quality and specificity of actions
4. **Results & Impact** - Measurable outcomes and learnings
5. **Leadership Principles** - Alignment with company values
6. **Technical Depth** - Role-relevant technical details
7. **Communication & Structure** - Clarity and organization

## Scalability Features

- Rate limiting (200 requests per day, 100 per hour per IP)
- CORS configuration for security
- Error handling and logging
- Efficient API design
- Production-ready with Gunicorn
- Environment-based configuration

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4-turbo-preview` |
| `PORT` | Server port | `7860` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `FLASK_ENV` | Environment | `development` |
| `SECRET_KEY` | Flask secret key | Required in production |

## Deployment

### PythonAnywhere

See [DEPLOY_PYTHONANYWHERE.md](DEPLOY_PYTHONANYWHERE.md) for detailed instructions on deploying to PythonAnywhere.

Quick steps:
1. Upload your code to PythonAnywhere
2. Install dependencies: `pip install --user -r requirements.txt`
3. Configure WSGI file (see `wsgi.py.example`)
4. Set up static files mapping
5. Add environment variables in `.env`
6. Reload web app

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
