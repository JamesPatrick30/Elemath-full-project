module.exports = {
  apps: [
    {
      name: "fastapi-app",
      script: "venv/bin/python",
      args: "-m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4",
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
