# SkillIssue.ai

AI-powered career intelligence platform — resume audits, ATS scoring, skill gap detection, job matching, and mock interviews.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from the example and set your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   ```env
   GEMINI_API_KEY="your_key_here"
   VITE_GOOGLE_CLIENT_ID="your_client_id.apps.googleusercontent.com"
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Production Build

```bash
npm run build
NODE_ENV=production npm start
```

## Deploy

### Google AI Studio (recommended)

Deploy from [AI Studio](https://ai.studio/apps/0577b9cd-24f4-4f6d-9cb0-b39d0858e359). Secrets (`GEMINI_API_KEY`, `APP_URL`) are injected automatically on Cloud Run.

### Docker

```bash
docker build -t skillissue-ai .
docker run -p 3000:3000 -e GEMINI_API_KEY="your_key" -e NODE_ENV=production skillissue-ai
```

### Render / Railway / Fly.io

Set these environment variables on your host:

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth Web Client ID |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | Auto | Assigned by most hosts (defaults to 3000) |
| `APP_URL` | No | Public URL of your deployment |

**Build command:** `npm install && npm run build`  
**Start command:** `npm start`

A `render.yaml` blueprint is included for one-click Render deploys.

## Google Sign-In setup

1. Open [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create **OAuth client ID** → type **Web application**
3. Add **Authorized JavaScript origins**:
   - `http://localhost:3000` (local)
   - `https://your-app.onrender.com` (production)
4. Copy the Client ID into `GOOGLE_CLIENT_ID` on Render (no rebuild needed — loaded at runtime)

## Environment Variables

See `.env.example` for the full list.
