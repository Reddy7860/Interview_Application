"""
Production server runner using Gunicorn.
"""
import os
import subprocess
import sys

def main():
    """Run the Flask app with Gunicorn for production."""
    port = os.getenv('PORT', '7860')
    workers = os.getenv('WORKERS', '4')
    
    cmd = [
        'gunicorn',
        '-w', workers,
        '-b', f'0.0.0.0:{port}',
        '--timeout', '120',
        '--access-logfile', '-',
        '--error-logfile', '-',
        'app:app'
    ]
    
    print(f'Starting production server on port {port} with {workers} workers...')
    subprocess.run(cmd)

if __name__ == '__main__':
    main()

