# Deploying to PythonAnywhere

This guide will help you deploy the STAR Interview Evaluator Flask application to PythonAnywhere.

## Prerequisites

1. A PythonAnywhere account (free tier works, but paid is recommended for production)
2. Your OpenAI API key

## Step 1: Create PythonAnywhere Account

1. Go to https://www.pythonanywhere.com/
2. Sign up for a free account (or upgrade to paid for better performance)
3. Log in to your account

## Step 2: Upload Your Files

### Option A: Using Git (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **In PythonAnywhere Dashboard:**
   - Go to "Files" tab
   - Click "Clone from Git"
   - Enter your GitHub repository URL
   - Click "Clone"

### Option B: Manual Upload

1. **In PythonAnywhere Dashboard:**
   - Go to "Files" tab
   - Navigate to `/home/YOUR_USERNAME/`
   - Create a folder: `mkdir star-interview-evaluator`
   - Upload all your files using the web interface or use the "Upload a file" button

2. **Required files to upload:**
   - `app.py`
   - `requirements.txt`
   - `routes/` folder (all files)
   - `services/` folder (all files)
   - `data/` folder (all files)
   - `templates/` folder (all files)
   - `static/` folder (all files)

## Step 3: Set Up Virtual Environment

1. **Open a Bash console** in PythonAnywhere (click "Consoles" → "Bash")

2. **Navigate to your project:**
   ```bash
   cd ~/star-interview-evaluator
   # or if you used git:
   cd ~/YOUR_REPO_NAME
   ```

3. **Create virtual environment:**
   ```bash
   python3.10 -m venv venv
   # or python3.9 -m venv venv (depending on available version)
   ```

4. **Activate virtual environment:**
   ```bash
   source venv/bin/activate
   ```

5. **Install dependencies:**
   ```bash
   pip install --user -r requirements.txt
   ```

## Step 4: Configure Environment Variables

1. **Create `.env` file:**
   ```bash
   nano .env
   ```

2. **Add your environment variables:**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4-turbo-preview
   FLASK_ENV=production
   SECRET_KEY=your-secret-key-here-generate-a-random-string
   PORT=7860
   ```

3. **Save and exit** (Ctrl+X, then Y, then Enter)

4. **Make sure .env is not publicly accessible:**
   ```bash
   chmod 600 .env
   ```

## Step 5: Configure WSGI File

1. **Go to "Web" tab** in PythonAnywhere dashboard

2. **Click "Add a new web app"** (if you don't have one) or click on your existing web app

3. **Select Python version** (3.10 recommended)

4. **Click on the WSGI configuration file link** (usually `/var/www/YOUR_USERNAME_pythonanywhere_com_wsgi.py`)

5. **Replace the entire content with:**
   ```python
   import sys
   import os

   # Add your project directory to the path
   project_home = '/home/YOUR_USERNAME/star-interview-evaluator'
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   # Change to your project directory
   os.chdir(project_home)

   # Load environment variables
   from dotenv import load_dotenv
   load_dotenv()

   # Import your Flask app
   from app import app as application

   if __name__ == "__main__":
       application.run()
   ```

6. **Replace `YOUR_USERNAME`** with your actual PythonAnywhere username

7. **Save the file**

## Step 6: Configure Static Files

1. **In the "Web" tab**, scroll down to "Static files"

2. **Add static file mappings:**
   - **URL:** `/static/`
   - **Directory:** `/home/YOUR_USERNAME/star-interview-evaluator/static/`

3. **Click "Add"**

## Step 7: Set Up Domain (Optional)

1. **In the "Web" tab**, you'll see your default domain:
   - Free tier: `YOUR_USERNAME.pythonanywhere.com`
   - Paid tier: You can use your own domain

2. **Note your domain** - you'll access your app at:
   ```
   http://YOUR_USERNAME.pythonanywhere.com
   ```

## Step 8: Reload Web App

1. **In the "Web" tab**, click the green **"Reload"** button

2. **Wait a few seconds** for the app to restart

3. **Check for errors:**
   - Click "Error log" link to see if there are any issues
   - Fix any errors that appear

## Step 9: Test Your Application

1. **Open your browser** and go to:
   ```
   http://YOUR_USERNAME.pythonanywhere.com
   ```

2. **Test the application:**
   - Fill in the form
   - Submit an evaluation
   - Check if everything works

## Troubleshooting

### Common Issues:

1. **"Module not found" errors:**
   - Make sure you installed all dependencies: `pip install --user -r requirements.txt`
   - Check that your virtual environment is activated

2. **"Template not found" errors:**
   - Verify the `templates/` folder is in the correct location
   - Check the path in your WSGI file

3. **"Static files not loading":**
   - Verify static files mapping in Web tab
   - Check file permissions: `chmod -R 755 static/`

4. **"OpenAI API errors":**
   - Verify your API key is correct in `.env` file
   - Check that `.env` file is readable: `cat .env`

5. **"500 Internal Server Error":**
   - Check the error log in the Web tab
   - Verify all imports are correct
   - Make sure all files are uploaded

### Viewing Logs:

1. **Error log:** Web tab → "Error log" link
2. **Server log:** Web tab → "Server log" link
3. **Console output:** Use Bash console to run: `python app.py` (for testing)

### Updating Your App:

1. **If using Git:**
   ```bash
   cd ~/YOUR_REPO_NAME
   git pull
   ```

2. **If manual upload:**
   - Upload new files via Files tab

3. **Reload web app** in Web tab

## Free Tier Limitations

- **Limited CPU time:** 100 seconds per day
- **Limited outbound internet:** For API calls
- **No custom domains** (only `YOUR_USERNAME.pythonanywhere.com`)
- **App sleeps after inactivity**

## Paid Tier Benefits

- More CPU time
- Custom domains
- Better performance
- No sleeping

## Security Notes

1. **Never commit `.env` file to Git**
2. **Use strong SECRET_KEY** in production
3. **Keep your OpenAI API key secure**
4. **Regularly update dependencies**

## Quick Reference Commands

```bash
# Navigate to project
cd ~/star-interview-evaluator

# Activate virtual environment
source venv/bin/activate

# Install/update dependencies
pip install --user -r requirements.txt

# Test locally (in console)
python app.py

# Check Python version
python --version

# View environment variables
cat .env
```

## Support

If you encounter issues:
1. Check PythonAnywhere documentation: https://help.pythonanywhere.com/
2. Check error logs in Web tab
3. Test in Bash console first before deploying

