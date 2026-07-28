# 🎵 Moodify — Mood-Based Music Player

Moodify detects your facial expression through your webcam and plays a song that matches your mood. It's a MERN stack project: a React frontend runs real-time face landmark detection in the browser, and an Express/MongoDB backend stores songs and serves one based on the detected mood.

## How it works

1. The frontend opens your webcam and runs Google's **MediaPipe FaceLandmarker** model directly in the browser (no server round-trip for detection).
2. It reads facial blendshape scores (smile, jaw-open, brow-up, frown) and classifies your expression as **Happy**, **Sad**, **Surprised**, or **Neutral**.
3. It sends that mood to the backend (`GET /api/songs?mood=...`), which returns a matching song from MongoDB.
4. The song (audio file + poster image, both hosted on ImageKit) loads into a simple player with play/pause/skip and playback speed controls.
5. Users can register/log in; sessions are handled with a JWT stored in an httpOnly cookie, with a token blacklist for logout.

## Tech stack

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- `@mediapipe/tasks-vision` (in-browser face landmark detection)
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT auth (`jsonwebtoken`) with httpOnly cookies
- `bcryptjs` for password hashing
- `multer` for file uploads (in-memory storage)
- `node-id3` to read MP3 metadata (title, embedded cover art)
- ImageKit (`@imagekit/nodejs`) for song/poster file storage

## Project structure

```
moodify-music--player/
├── backend/
│   ├── server.js                  # entry point
│   └── src/
│       ├── app.js                 # Express app, middleware, routes
│       ├── config/                # env config, DB connection
│       ├── controller/            # auth & song controllers
│       ├── middleware/            # JWT auth guard, multer upload
│       ├── models/                # Mongoose schemas (user, song, blacklist)
│       ├── routes/                # /api/auth, /api/songs
│       └── services/              # ImageKit upload service
└── frontend/
    └── src/
        ├── app.routes.jsx         # route definitions
        ├── App.jsx                # root component, providers
        └── feature/
            ├── auth/              # login/register pages, auth context, protected routes
            ├── expression/        # webcam + MediaPipe face expression detection
            └── home/              # player UI, song context, home page
```

## API endpoints

| Method | Endpoint             | Auth required | Description                              |
|--------|----------------------|:--------------:|------------------------------------------|
| POST   | `/api/auth/register` | No             | Create a new user account                |
| POST   | `/api/auth/login`    | No             | Log in, sets JWT cookie                  |
| POST   | `/api/auth/logout`   | No             | Clears JWT cookie, blacklists the token   |
| GET    | `/api/auth/getme`    | Yes            | Get the currently logged-in user         |
| POST   | `/api/songs`         | No             | Upload a song (`multipart/form-data`, field `song`, plus `mood`) |
| GET    | `/api/songs?mood=`   | No             | Get a song matching the given mood       |

## Getting started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (local or Atlas)
- An ImageKit account (for `privateKey`, `publicKey`, `urlEndpoint`)

### 1. Clone the repo
```bash
git clone https://github.com/arunz6/moodify-music--player.git
cd moodify-music--player
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
mongodb=your_mongodb_connection_string
jwt_secret=your_jwt_secret
imagekit_public_key=your_imagekit_public_key
imagekit_private_key=your_imagekit_private_key
imagekit_url_endpoint=your_imagekit_url_endpoint
```

> ⚠️ **Security note:** a `.env` file currently appears to be committed to this repository. Never commit real secrets — add `.env` to `.gitignore`, rotate any exposed MongoDB/JWT/ImageKit credentials immediately, and remove the file from git history.

Run the backend (default port `3000`):
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on Vite's default port (`5173`) and expects the backend at `http://localhost:3000`.

### 4. Usage
1. Register or log in.
2. Allow webcam access when prompted.
3. Click **"Detect expression"** — Moodify will classify your mood and load a matching track.
4. Use the player controls to play, pause, skip, or change playback speed.

## Known limitations / notes
- The `song` schema's `mood` field currently has no unique index, and only one song per mood is returned (`findOne`) — uploading multiple songs per mood will only ever surface the first match.
- CORS is hardcoded to `http://localhost:5173`; update this for production deployments.
- Cookies are set with `secure: false`, which is fine for local development but should be `true` behind HTTPS in production.

## Contributing
Issues and pull requests are welcome. If you add a feature, please keep the `feature/<name>` folder structure used on the frontend (`component/`, `hooks/`, `pages/`, `service/`).

## License
No license file is currently included in this repository — add one (e.g. MIT) if you intend for others to reuse this code.
