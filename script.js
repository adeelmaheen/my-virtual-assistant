let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Dear");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Dear");
    } else {
        speak("Good Evening Dear");
    }
}

// Initialize recognition only once
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;

window.addEventListener('load', () => {
    wishMe();
});

// Handle speech recognition result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.trim();
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Add event listener to the button to start speech recognition
btn.addEventListener("click", () => {
    recognition.start(); // Start recognition when the button is clicked
    btn.style.display = "none"; // Hide the button
    voice.style.display = "block"; // Show the animated voice GIF
});

// Process recognized command
function takeCommand(message) {
    btn.style.display = "flex"; // Show the button again
    voice.style.display = "none"; // Hide the animated voice GIF

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello dear, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Maheen Arif.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://www.whatsapp.com","_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else if(message.includes("thank you")){
        speak("your welcome")
    }else if(message.includes("what is your name")){
        speak("my name is jarviz")

    }else if(message.includes("bye")){
        speak("Nice to talk to you")
    }else if(message.includes("open linkedin")){
        speak("opening linkedin...")
        window.open("https://www.linkedin.com","_blank")
    }
    else if(message.includes("open notepad")){
        speak("opening notepad...")
        window.open("https://www.Notepad.com","_blank");
    }else if(message.includes("open github ")){
        speak("opening github")
        window.open("https://www.github.com","_blank")
    }
    else {
        let finalText = `This is what I found on the internet regarding ${message.replace("jarviz", "")}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("jarviz", "")}`, "_blank");
    }
}
