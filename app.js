const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function openUrl(url) {
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) {
        // Popup blockers can reject async opens, so fall back to the current tab.
        window.location.href = url;
    }
}

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = () => {
        content.textContent = "Speech recognition error. Try running on localhost/https.";
    };
} else {
    content.textContent = "Speech recognition not supported in this browser.";
}

btn.addEventListener('click', () => {
    if (!recognition) return;
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        openUrl("https://google.com");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        openUrl("https://youtube.com");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        openUrl("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        openUrl(`https://www.google.com/search?q=${encodeURIComponent(message)}`);
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        openUrl(`https://en.wikipedia.org/wiki/${encodeURIComponent(message.replace("wikipedia", "").trim())}`);
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        openUrl('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        openUrl(`https://www.google.com/search?q=${encodeURIComponent(message)}`);
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
