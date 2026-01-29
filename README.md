<!-- README.md -->

<div align="center">
  <h1>🧮 Elemath</h1>
  <p><strong>A real-time math quiz game focused on practice, feedback, and visible improvement.</strong></p>
  <p>Built for interactive quizzes, live sessions, and meaningful learning progress.</p>
</div>

<hr/>

<style>
  .badge { display:inline-block; padding:4px 10px; border-radius:999px; background:#f1f5f9; margin:2px; font-size:12px }
  .section { margin-top:32px }
  .note { background:#f8fafc; border-left:4px solid #1e293b; padding:12px; margin:16px 0 }
  .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px }
  code { background:#f1f5f9; padding:2px 6px; border-radius:4px }
</style>

<div align="center">
  <span class="badge">Python</span>
  <span class="badge">Vue</span>
  <span class="badge">JavaScript</span>
  <span class="badge">REST API</span>
  <span class="badge">Education</span>
</div>

---

## 📘 Overview

**Elemath** is a real-time math quiz game designed to help students practice math concepts and **see their improvement over time** through repeated play and feedback.

The system focuses on:

* live quiz sessions
* immediate feedback per question
* tracking attempts and scores across sessions
* simple, understandable progress indicators

Elemath avoids hardware integrations and non-essential features. It is purely a **quiz-based learning system**, optimized for responsiveness and clarity.

---

## 🎯 Core Goals

* Encourage consistent math practice
* Provide clear feedback after every quiz
* Track performance history per student
* Support data-driven improvement for teachers or learners

Elemath is intentionally focused on quizzes only — no RFID, no hardware integration, no distractions.

---

## ✨ Key Features

<div class="grid">
  <div>
    <h4>Real-Time Quizzes</h4>
    <p>Live quiz sessions powered by Socket.IO for instant question delivery and answers.</p>
  </div>
  <div>
    <h4>Progress Tracking</h4>
    <p>Stores quiz results and attempts in MongoDB to show improvement across sessions.</p>
  </div>
  <div>
    <h4>Immediate Feedback</h4>
    <p>Displays correct answers and explanations after each question.</p>
  </div>
  <div>
    <h4>AI-Assisted Questions</h4>
    <p>Optional AI-generated or validated questions via a Python middleware service.</p>
  </div>
</div>

---

## 🗂️ Project Structure

```
root/
├─ Elemath-frontend/        # Vue-based quiz interface
│  ├─ src/
│  ├─ components/
│  └─ views/
│
├─ Elemath-backend-js/     # Core backend (Node.js + Express + Socket.IO)
│  ├─ routes/             # REST APIs (auth, quizzes, progress)
│  ├─ sockets/            # Real-time quiz sessions & events
│  ├─ controllers/
│  └─ server.js
│
├─ Elemath-backend-py/     # AI middleware (Python)
│  └─ main.py
│
└─ README.md
```

<div class="note">
<strong>Architecture note</strong><br/>
Node.js (Express + Socket.IO) is the <strong>authoritative backend</strong> responsible for quiz logic, real-time sessions, scoring, and MongoDB persistence. The Python service acts strictly as a <strong>stateless middleman</strong> between the Node backend and AI services (GPT-5 nano), forwarding requests and normalizing responses. It holds no game state and performs no analytics.
</div>

---

## 🧰 Tech Stack

**Core Backend**

* Node.js
* Express.js
* Socket.IO (real-time quizzes & live sessions)
* MongoDB (primary data store)

**AI Middleware**

* Python (stateless proxy to GPT-5 nano)

**Frontend**

* Vue (interactive quiz UI)

**Supporting**

* JavaScript
* REST + WebSocket communication

---

## 🚀 Getting Started

### Prerequisites

* Python 3.10+
* Node.js 18+
* npm or pnpm

---

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/elemath.git
cd elemath
```

---

### Backend (Python)

```bash
cd Elemath-backend-py
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

---

### Backend (JavaScript)

```bash
cd Elemath-backend-js
npm install
npm run dev
```

---

### Frontend

```bash
cd Elemath-frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Example for Python backend:

```
PORT=8000
DEBUG=true
```

Each service maintains its own `.env` file to keep concerns isolated.

---

## 📊 Progress Tracking Model

All quiz state and progress data are managed exclusively by the **Node.js backend** and stored in **MongoDB**.

Tracked data includes:

* quiz attempts per student
* scores per session
* correct vs incorrect answers
* basic improvement over time

The Python service:

* does not store data
* does not calculate progress
* does not own any quiz logic

Its sole responsibility is to forward requests to AI services and return structured responses back to the Node.js backend.

---

## 🧠 Design Principles

* **Learning over leaderboard** — progress matters more than rank
* **Explain mistakes** — every wrong answer is a learning opportunity
* **Simple UI** — math should be the hard part, not the interface

---

## 📈 Scalability Notes

* Socket.IO enables horizontal scaling for live quiz sessions
* MongoDB supports flexible quiz and progress schemas
* Python middleware can be scaled independently as a stateless service
* AI latency is isolated from real-time gameplay

---

## 🤝 Contributing

Contributions are welcome, especially in:

* question generation
* analytics logic
* UI accessibility improvements

Keep changes focused and documented.

---

## 📄 License

This project is open-source and licensed under the MIT License.

---

<div align="center">
  <p><strong>Elemath</strong> — learn the pattern, not just the answer.</p>
</div>
