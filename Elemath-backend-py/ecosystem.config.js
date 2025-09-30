module.exports = {
  apps: [
    {
      name: "fastapi-app",
      script: "venv/bin/python",
<<<<<<< HEAD
      args: "-m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --no-reload",
=======
      args: "main:app --host 0.0.0.0 --port 8001 --reload",
>>>>>>> 243e9c6a (change)
      cwd: "/root/Elemath-full-project/Elemath-backend-py",
      interpreter: "none",
      autorestart: true,
      watch: false,
      max_restarts: 5,
      env: {
        PYTHONPATH: ".",
      }
    }
  ]
};

