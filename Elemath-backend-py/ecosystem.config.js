module.exports = {
  apps: [
    {
      name: "fastapi-app",
      script: "venv/bin/python",
      args: "-m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --no-reload",
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
