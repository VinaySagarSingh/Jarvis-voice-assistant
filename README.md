# JARVIS — Voice-Controlled Virtual Assistant

A browser-based voice assistant inspired by Iron Man's JARVIS, built with vanilla JavaScript using the Web Speech API. It listens for voice commands, responds with synthesized speech, and can open websites, run searches, and answer quick queries — all without any backend or external API.

## Demo

Click the microphone button, speak a command, and JARVIS will talk back and act on it (e.g. opening Google, searching Wikipedia, telling the time).

## Features

- **Voice greeting on load** — greets the user based on the time of day (morning/afternoon/evening)
- **Speech recognition** — uses the Web Speech API to convert spoken commands into text
- **Text-to-speech responses** — JARVIS speaks back using `SpeechSynthesisUtterance`
- **Command handling**, including:
  - Open Google / YouTube / Facebook
  - Search Google for general queries ("what is...", "who is...")
  - Look up topics on Wikipedia
  - Tell the current time and date
  - Open the Calculator app (Windows)
  - Fallback: searches Google for anything unrecognized
- **Popup-blocker fallback** — if a new tab is blocked, redirects the current tab instead
- **Graceful degradation** — shows a clear message if the browser doesn't support speech recognition

## Tech Stack

- **HTML5 / CSS3** — structure and styling
- **Vanilla JavaScript** — no frameworks or libraries
- **Web Speech API** — `SpeechRecognition` (input) and `SpeechSynthesis` (output)
- **Font Awesome** — microphone icon

## How It Works

1. On page load, JARVIS speaks an initialization message and a time-based greeting.
2. Clicking the microphone button starts listening via `SpeechRecognition`.
3. The recognized transcript is passed to a command parser (`takeCommand`), which matches keywords and triggers the corresponding action (open a site, run a search, speak a response, etc.).
4. Responses are spoken aloud using the browser's built-in speech synthesis.

## Running Locally

Speech recognition requires a secure context, so open the project via `localhost` or HTTPS — opening `index.html` directly as a `file://` URL may block microphone access in some browsers.

```bash
# Option 1: use the VS Code "Live Server" extension
# Option 2: quick local server with Python
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Browser Support

Relies on the Web Speech API, which has the best support in Chrome/Chromium-based browsers. Firefox and Safari have limited or no support for `SpeechRecognition`.

## Future Improvements

- Add more commands (weather, reminders, music control)
- Wake-word detection ("Hey Jarvis") instead of manual button click
- Persistent conversation context
- Mobile-responsive UI improvements
