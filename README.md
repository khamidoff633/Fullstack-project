# Jobify Pro Ultimate (Frontend + Backend)

This project is now a **full-stack** job board:

- **Frontend**: Vite + React + Tailwind
- **Backend**: Node.js + Express + MongoDB (JWT auth, profiles, uploads, jobs)

## 1) Run Backend (API)

```bash
cd server
cp .env.example .env
# edit .env (Mongo URI + JWT secrets)

npm install
npm run dev
```

API will run on: `http://localhost:5000`

## 2) Run Frontend

```bash
# from project root
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Frontend environment

Create a `.env` in the project root if needed:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Features included ✅

- Register / Login (JWT access + refresh)
- Roles: `candidate | employer | admin`
- Mandatory profile flow (`profileCompleted`)
- Profile pages:
  - Create profile: `/create-profile`
  - Edit profile: `/settings/profile`
  - Public profile: `/u/:username`
- File uploads (local):
  - avatar, cover, resume, company logo
- Jobs:
  - Employer can post job (requires completed profile)
  - Job details supports backend-created jobs
- Applications:
  - Candidate can apply to backend-created jobs (requires completed profile)

> Note: The jobs list page is still using demo data by default; backend-created jobs work fully on the Job Details page.
