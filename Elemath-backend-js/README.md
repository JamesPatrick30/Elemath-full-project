#run it using this command
npx nodemon server.js

# Elemath Backend (Node.js/Express)

A Node.js/Express backend for Elemath with JWT cookie auth, MongoDB (Mongoose), Redis caching, Socket.IO realtime, file uploads, quiz/game mode, charts, and email reporting.

## Tech Stack
- Node.js, Express
- MongoDB (Mongoose)
- Redis (caching + Socket.IO pub/sub)
- Socket.IO (realtime)
- JWT (HttpOnly cookies)
- Multer (uploads)
- Nodemailer (Gmail)
- Axios (calls FastAPI for quiz generation)

## Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas URI (or local MongoDB)
- Redis server
- Gmail account (for sending bug reports) or other SMTP
- FastAPI service (optional; used by /create-question)

## Environment Variables (.env)
Create a .env file in Elemath-backend-js:

```
PORT=3000
MONGODB_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT secrets
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Email for bug reports
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_PROGRAMMER=recipient@example.com

# FastAPI key for quiz generation
API_KEY_AI=your_fastapi_key
```

Notes:
- Cookies are configured for development (secure: false, sameSite: lax).
- CORS allows http://localhost:5173 by default.

## Install & Run (Windows)
```
cd c:\Users\PC\Documents\capstone\Elemath-full-project\Elemath-backend-js
npm install
node server.js
```
Server starts at: http://localhost:%PORT% (default 3000)

## Auth Model
- On login, backend sets two HttpOnly cookies:
  - access_token (90 minutes)
  - refresh_token (90 days)
- Include credentials from frontend (axios example):
  - axios.create({ baseURL: 'http://localhost:3000', withCredentials: true })

## API Reference

Base URL: http://localhost:3000

Public
- GET /  
  Health check. Returns welcome string.

Auth
- POST /api/login  
  Body: { "username": "teacher@email", "password": "plaintext" }  
  Sets access_token and refresh_token cookies. Returns { message, classCount }.

- POST /student-login  
  Body: { "email": "student@email-or-lrn", "password": "plaintext" }  
  Sets cookies for student. Returns { message }.

- POST /api/logout  
  Clears cookies. Returns { message }.

- POST /refresh-token  
  Rotates tokens if needed. Returns { message }.

- GET /role  (auth)  
  Returns teacher or student role.  
  Response (teacher): { role: "teacher", class: [...] }  
  Response (student): { role: "student" }

Teacher Data
- GET /data/teacher  (auth, Redis cached)  
  Returns teacher doc with populated classes.

- GET /get/grade/class (auth)  
  Returns teacher’s classes list: { data: [ { Class_id, Class_name }, ... ] }

Classes and Students
- POST /createClass (auth)  
  Body: { "ClassName": "Math 5A" }  
  Creates a class and links to teacher. Returns { id }.

- POST /find-student (auth)  
  Body: { "lrn": "123456" }  
  Lookup student by LRN (static master list). Returns student or 404.

- POST /enroll-student (auth)  
  Body: { profile, fname, mname, lname, lrn, password, classId, email }  
  Enrolls student into a class. Returns { message }.

- POST /edit/student (auth)  
  Body: { lrn, fname, mname, lname, password }  
  Updates student names/password. Invalidates class cache.

- DELETE /remove/student (auth)  
  Body: { lrn }  
  Removes student. Invalidates class cache.

- POST /get/classData (auth, Redis cached per class)  
  Body: { classId }  
  Returns student list of the class.

Lessons / Files
- GET /lesson/list (auth)  
  Returns uploaded lesson file list for the teacher (no file content).

- Static: /public  
  Static files served from /public.

Quiz/Gradebook
- POST /create/record (auth)  
  Body: { classId, gradingPeriod }  
  Creates gradebook for a class + grading period, and seeds students.

- POST /get/classrecord/Id (auth)  
  Body: { classId }  
  Returns count and records (grading periods) for a class.

- POST /get/quarter (auth)  
  Body: { quaterId }  
  Returns flattened student quiz history for the given gradebook _id.

- POST /create-question (auth)  
  Body: { fileId, num_questions, language, difficulty, question_type }  
  Calls FastAPI (http://127.0.0.1:8000/generate-quiz) with API key. Returns { quiz }.

Charts (Apex options-ready)
- GET /chart?classId=... (auth, Redis cached)  
  Returns:
  - LineChart: quiz average percentages
  - BarChart: top 10 student averages
  - PieChart: pass vs fail (last quiz)
  - ImprovementChart: Improved/No Change/Declined distribution
  - LowTopicBarChart: 5 weakest topics by mastery %
  Response: { LineChart, BarChart, PieChart, ImprovementChart, LowTopicBarChart }

Game Mode (Realtime)
- POST /create/mode (auth)  
  Body: { id: classId, mode }  
  Initializes a mode in Redis: mode:{classId}. Returns { message }.

- POST /delete/mode (auth)  
  Body: { id: classId }  
  Deletes mode, emits 'mode-deleted' to room.

- GET /get/mode (auth)  
  Query: ?id=classId  
  Returns { quiz: boolean, started: boolean }.

- GET /get/mode/list (auth)  
  Query: ?id=classId  
  Returns { list: [ players ] }.

- GET /get/mode/data (auth)  
  Query: ?id=classId  
  Returns { modeData: players }.

- GET /get/mode/question/1st (auth, student)  
  Returns the first question for the student and time: { question, done, time }.

- POST /get/mode/question (auth, student)  
  Body: { answer }  
  Checks current question, updates score, returns next question or { done:true }.

- GET /get/mode/player/done (auth)  
  Query: ?id=classId  
  Returns { players: done[], playing: notDone[] }.

- GET /get/mode/player/rev (auth, student)  
  Returns { rev, score } for the logged-in student.

- POST /mode/finish (auth, teacher)  
  Body: { id: classId }  
  Saves quiz and questions into Gradebook, appends analysis line point, clears caches.

- POST /mode/done (auth)  
  Body: { id: classId }  
  Computes pass/failed summary only from current mode players. Returns { pass, failed }.

Reporting (Email)
- POST /report/student (auth, multipart/form-data)  
  Fields: name, email, module, description, suggestion  
  Files: screenshots (up to 5 images)  
  Emails a report to EMAIL_PROGRAMMER.

## Socket.IO (Rooms by classId)
- Auth via refresh_token cookie (HttpOnly). The socket middleware verifies JWT_REFRESH_SECRET.
- Rooms: socket joins room by user.classId.

Client events:
- create-room { roomId } → server joins and emits 'room-created'
- join-room { roomId, name, lrn, profile } → adds player into mode:{roomId}, publishes 'player-joined'
- game-start { roomId, time, questions } → marks mode started, attaches studentCorrect=0 to each question, publishes 'game-start'

Server pushes:
- 'player-joined' to room
- 'game-start' to room
- 'mode-deleted' to room

## Redis Caching Keys
- teacher:{userId} → teacher profile with classes
- classData:{classId} → students of a class
- chart:{classId} → computed chart payloads
- mode:{classId} → current game/mode state

## Error Notes
- 401 from protected routes → frontend should redirect to login.
- On token expiry, call /refresh-token then retry.

## Quick cURL Examples

Login (teacher):
```
curl -i -X POST http://localhost:3000/api/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"teacher@mail\",\"password\":\"pass\"}"
```

Get role (after login; cookies saved by client):
```
curl -i http://localhost:3000/role
```

Create class:
```
curl -i -X POST http://localhost:3000/createClass ^
  -H "Content-Type: application/json" ^
  -d "{\"ClassName\":\"Math 5A\"}"
```

Get charts:
```
curl -i "http://localhost:3000/chart?classId=YOUR_CLASS_ID"
```

Create mode:
```
curl -i -X POST http://localhost:3000/create/mode ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":\"YOUR_CLASS_ID\",\"mode\":\"quiz\"}"
```

Report (PowerShell example with one file):
```
curl -i -X POST http://localhost:3000/report/student ^
  -F "name=John" -F "email=john@example.com" -F "module=Game" ^
  -F "description=Bug details" -F "suggestion=Fix it" ^
  -F "screenshots=@C:\path\to\img.png"
```

## Development Tips
- Frontend dev URL must be http://localhost:5173 (CORS).
- Axios must set withCredentials: true.
- Ensure Redis and MongoDB are running and reachable.
- For Gmail, use an App Password (2FA) or configure a