Vercel deployment guide

This project is a Vite + React app. Use the steps below to deploy to Vercel and keep your TMDb API key secret.

1) Create a Vercel account
- Go to https://vercel.com and sign up using your GitHub account.

2) Import the GitHub repository
- Click "New Project" → "Import Git Repository" → choose `kigozi-nich/movie-app-A`.
- Vercel should auto-detect a framework.
- If it doesn't, set:
  - Framework Preset: `Other`
  - Build Command: `npm run build`
  - Output Directory: `dist`

3) Add the TMDb key as a project environment variable
- In your Vercel project dashboard, go to `Settings` → `Environment Variables`.
- Add a variable:
  - Name: `VITE_TMDB_API_KEY`
  - Value: `<your-new-tmdb-key>`
  - Target: `Production` (and `Preview` if you want preview deployments to use it too)

4) (Optional) Deploy from CLI
- Install Vercel CLI if you prefer to deploy from your machine:

```powershell
npm i -g vercel
# Login (opens browser)
vercel login
# Link project (run in repo root)
vercel link
# Add secret via CLI (interactive) and set it for production
vercel env add VITE_TMDB_API_KEY production
# Deploy
vercel --prod
```

5) Confirm deployment
- After import, Vercel will run the build and deploy. Visit the generated Vercel URL to verify the site.

6) Notes
- Do NOT commit your `.env` with the API key. Use Vercel environment variables instead.
- If you later rotate the key, update the Vercel env var value.

If you want, I can prepare a one-click deployment: I can add the Vercel GitHub App to the repo (you'll need to accept the OAuth prompt) and then trigger an import. Tell me if you want help with that and I will provide the exact actions to authorize Vercel for this repository.
