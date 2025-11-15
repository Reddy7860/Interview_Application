# PythonAnywhere Deployment Checklist

## Pre-Deployment

- [ ] PythonAnywhere account created
- [ ] OpenAI API key ready
- [ ] All code files ready
- [ ] `.env` file prepared (but NOT uploaded to Git)

## Step 1: Upload Code

- [ ] Option A: Push to GitHub and clone in PythonAnywhere
- [ ] Option B: Upload files manually via Files tab
- [ ] Verify all folders are uploaded:
  - [ ] `app.py`
  - [ ] `routes/`
  - [ ] `services/`
  - [ ] `data/`
  - [ ] `templates/`
  - [ ] `static/`
  - [ ] `requirements.txt`

## Step 2: Setup Environment

- [ ] Open Bash console
- [ ] Navigate to project: `cd ~/star-interview-evaluator`
- [ ] Create venv: `python3.10 -m venv venv`
- [ ] Activate venv: `source venv/bin/activate`
- [ ] Install dependencies: `pip install --user -r requirements.txt`

## Step 3: Configure Environment Variables

- [ ] Create `.env` file: `nano .env`
- [ ] Add all required variables:
  - [ ] `OPENAI_API_KEY=your_key`
  - [ ] `OPENAI_MODEL=gpt-4-turbo-preview`
  - [ ] `FLASK_ENV=production`
  - [ ] `SECRET_KEY=random_string`
- [ ] Set permissions: `chmod 600 .env`

## Step 4: Configure Web App

- [ ] Go to "Web" tab
- [ ] Create new web app (or use existing)
- [ ] Select Python version (3.10)
- [ ] Edit WSGI file with content from `wsgi.py.example`
- [ ] Replace `YOUR_USERNAME` in WSGI file
- [ ] Save WSGI file

## Step 5: Configure Static Files

- [ ] In Web tab, scroll to "Static files"
- [ ] Add mapping:
  - URL: `/static/`
  - Directory: `/home/YOUR_USERNAME/star-interview-evaluator/static/`
- [ ] Click "Add"

## Step 6: Deploy

- [ ] Click green "Reload" button in Web tab
- [ ] Wait for reload to complete
- [ ] Check error log for any issues
- [ ] Fix any errors if present

## Step 7: Test

- [ ] Open `http://YOUR_USERNAME.pythonanywhere.com`
- [ ] Test form submission
- [ ] Test evaluation functionality
- [ ] Verify static files load (CSS, JS)
- [ ] Check API endpoints work

## Post-Deployment

- [ ] Bookmark your app URL
- [ ] Test from different devices
- [ ] Monitor error logs for first few days
- [ ] Set up regular backups (if using Git)

## Troubleshooting

If errors occur:
- [ ] Check error log in Web tab
- [ ] Verify all dependencies installed
- [ ] Check `.env` file exists and is readable
- [ ] Verify file paths in WSGI file
- [ ] Test in Bash console: `python app.py`

