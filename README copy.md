Care Bear — Expo React Native skeleton

This repo is a starter scaffold for the Care Bear app (onboarding, home/chat UI, profile and calendar placeholders).

Colors & theme
- Primary: black & white for text and backgrounds
- Accents: brown (bear-themed) and a pale yellow for small highlights

Quick start (macOS, zsh):

1. Install dependencies

```bash
cd /Users/yeshavyas/Desktop/care_bear
npm install
```

2. Start Expo

```bash
npm run start
# then open in Expo Go or run on iOS/Android simulators
```

Notes
- Place your bear image at `assets/bear.png` to replace the placeholder bear UI.
- The project uses AsyncStorage to persist onboarding data. The Profile modal has a 'Generate Report' action that currently shows the JSON; you can wire it to a PDF or share/export flow (we left instructions inline).
- This is a UI-first scaffold. To hook up a real AI chat backend, replace the chat send handler in `src/screens/Home.js`.
