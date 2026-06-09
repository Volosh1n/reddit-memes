# Reddit Memes

## Controls

- Mobile: swipe left/right on the meme (animated gallery-like transition).
- Desktop: use keyboard arrows Left/Right.
- Buttons `prev pic`, `direct link`, `comments` stay available on all devices.

## Local run (development)

```bash
npm install
npm start
```

Open http://localhost:3000

`npm start` serves the app from `/` (no `/reddit-memes` redirect).

## Local run (same path as GitHub Pages)

This project is deployed under `/reddit-memes`, so this mode mirrors production routing.

```bash
npm install
npm run preview:pages
```

Open http://127.0.0.1:4173/reddit-memes/

Stop server with `Ctrl+C`.

## Deploy to GitHub Pages

```bash
npm run deploy
```
