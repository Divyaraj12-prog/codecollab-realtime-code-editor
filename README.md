# 🚀 CodeCollab — Real-Time Collaborative Code Editor

CodeCollab is a real-time collaborative coding platform that allows multiple users to join a shared room, write code together, chat instantly, and run JavaScript code directly in the browser.

🔗 Live Demo: [https://your-frontend.vercel.app  ](https://code-collab-eight-eosin.vercel.app/)

---

## ✨ Features

- 🧑‍💻 Real-time code collaboration (multi-user)
- ⚡ Live code syncing using WebSockets
- 💬 Real-time chat system with usernames
- 🧠 Monaco Editor (VS Code-like experience)
- ▶️ Run JavaScript code instantly (in-browser execution)
- 🔗 Unique room-based collaboration system
- 🌐 Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Socket.IO Client
- Monaco Editor

### Backend
- Node.js
- Express.js
- Socket.IO

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ⚙️ How It Works

1. User enters a Room ID or creates one
2. Multiple users join the same room
3. Code changes are synced in real-time via Socket.IO
4. Chat messages are broadcast instantly
5. Users can run JavaScript code and see output immediately

---

## 🧪 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Divyaraj12-prog/codecollab-realtime-code-editor
cd codecollab

cd Frontend
npm install
npm run dev

cd Backend
npm install
node server.js
