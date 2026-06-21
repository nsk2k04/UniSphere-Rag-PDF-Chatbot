# UniSphere — Frontend

A production-quality React frontend for UniSphere, an AI-powered academic knowledge assistant. Built with Vite, Tailwind CSS, Framer Motion, React Router, and Axios, wired to the existing FastAPI + FAISS + Llama 3.1 backend.

## Stack

- **React 18 + Vite** — app shell and dev server
- **Tailwind CSS** — styling, themed via CSS variables for instant light/dark switching
- **Framer Motion** — page transitions, the hero's retrieval animation, chat message entrances
- **React Router** — `/` landing, `/upload` PDF upload, `/chat` chat interface
- **Axios** — talks to your FastAPI backend (`/upload-pdf`, `/chat`)
- **lucide-react** — icon set

## Getting started

```bash
npm install
cp .env.example .env     # then set VITE_API_BASE_URL to your FastAPI server
npm run dev
```

The app expects your backend at `http://127.0.0.1:8000` by default — change `VITE_API_BASE_URL` in `.env` if it runs elsewhere.

## Backend contract this frontend assumes

```
GET  /                          -> { message }
POST /upload-pdf  (multipart, field name "file") -> { session_id, filename, status }
GET  /chat?session_id=..&question=..              -> { session_id, question, answer }
```

If your `/upload-pdf` endpoint expects a different multipart field name than `file`, update it in `src/api/client.js` (`uploadPdf` function — `formData.append('file', file)`).

CORS: make sure FastAPI allows requests from your Vite dev origin (`http://localhost:5173`), e.g.:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Project structure

```
src/
  api/client.js              axios instance + uploadPdf / askQuestion calls
  context/
    ThemeContext.jsx          light/dark theme, persisted + system-preference aware
    SessionContext.jsx        active session_id, filename, message history
  components/
    layout/                   Navbar, Footer, ThemeToggle
    landing/                  Hero, RetrievalVisual, Features, Stats, Testimonials
    upload/                   UploadCard (drag & drop, progress, success state)
    chat/                     ChatSidebar, ChatMessage, ChatInput, EmptyState
    ui/                       Logo, GradientButton, Skeleton
  pages/
    LandingPage.jsx, UploadPage.jsx, ChatPage.jsx
```

## Theming

Both themes are defined as CSS variables in `src/index.css` (`:root` for light, `.dark` for dark) and consumed through Tailwind tokens (`bg-bg`, `bg-surface`, `text-text-primary`, etc.) — so no component hardcodes a color. Theme choice is stored in `localStorage` under `unisphere-theme`, defaults to system preference on first visit, and an inline script in `index.html` applies the right class before paint to avoid a flash.

## Notes

- Sessions are kept in `sessionStorage` (per browser tab) so a refresh on `/chat` doesn't lose your place; "New chat" clears it and sends you back to upload.
- The upload flow validates file type and a 30MB size cap client-side before calling the backend.
- This environment has no network access, so `npm install` / `npm run build` haven't been executed here — run them locally to fetch dependencies and verify the build.
