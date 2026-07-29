# Guessing Ball

A Magic 8 Ball site. Tap the ball to shake it and reveal one of eight answers, in Russian or English (RU/EN toggle, top right).

Built with Next.js (App Router) + TypeScript, statically exported for GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Output goes to `out/`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. Set the repo's Pages source to **GitHub Actions** (Settings → Pages).
