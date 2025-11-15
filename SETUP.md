# Quick Setup Guide - Flask Version

## Step 1: Install Python Dependencies

Create a virtual environment (recommended):

```bash
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

## Step 2: No Frontend Dependencies Needed!

This is a pure Flask application - no npm or Node.js required!

## Step 3: Configure OpenAI API Key

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)

2. Open `.env` and replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

## Step 4: Start the Application

### Development Mode

**Start Flask application:**
```bash
python app.py
```

Open your browser to http://localhost:7860

That's it! Flask serves both the frontend and API.

## Step 5: Use the Application

1. Select your target role, company, and experience level
2. Choose or enter an interview question
3. Paste your STAR-formatted answer
4. Click "Evaluate My Answer"
5. Review the comprehensive feedback
6. Download the full report if needed

## Production Deployment

1. **Set environment variables:**
   ```bash
   set FLASK_ENV=production
   set OPENAI_API_KEY=your_key_here
   ```
   (On Mac/Linux: use `export` instead of `set`)

3. **Run with Gunicorn:**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:7860 app:app
   ```

   Or use the provided script:
   ```bash
   python run_production.py
   ```

## Troubleshooting

### Port Already in Use
If port 7860 is already in use, change the `PORT` in `.env` file.

### Module Not Found Errors
- Make sure you're in the virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`

### API Key Issues
- Make sure your OpenAI API key is valid and has credits
- Check that the `.env` file is in the root directory
- Verify the key doesn't have extra spaces or quotes

### CORS Errors
- Make sure `CLIENT_URL` in `.env` matches your frontend URL
- In development, both servers should be running

### Import Errors
- Make sure you're running from the root directory
- Check that all `__init__.py` files exist in `routes/`, `services/`, and `data/` directories

## Python Version

This application requires Python 3.9 or higher. Check your version:
```bash
python --version
```

