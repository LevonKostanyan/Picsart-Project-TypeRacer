const inp = document.querySelector("input");
const wpm = document.querySelector(".wpm");
const wps = document.querySelector(".wps");
const changeColor = document.querySelector('.btn-left');
const tryAgainBtn = document.querySelector(".try-again")
const timerEl = document.getElementById("remaining-time");
const textForTyping = document.querySelector(".text-for-typing")

const pharagraphs = [`The oldest classical Greek and Latin writing had little or no space between words and could be written in boustrophedon (alternating directions).`,
    `I had a painting teacher once tell me that, the difference between a good painting and a great painting, is typically five strokes. And they're usually the five boldest strokes in the painting. The question, of course, is which five strokes?`,
    `Ever since I was a child, folks have thought they had me pegged, because of the way I am, the way I talk. And they're always wrong.`
]
//Generate random text from pharagraphs[]
const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];


//timer
let timer,
    minutes = 0;
    seconds = 0;

const taskTimer = () => {
    const now = new Date();
    timer = setInterval(() => {
        const t = new Date(new Date() - now);
        minutes = t.getMinutes();
        seconds = t.getSeconds();
        timerEl.innerHTML = `Minutes - ${minutes} Seconds - ${seconds}`;
    }, 1000);
}
//To prevent copying text during the game
textForTyping.classList.add("noselect")

//Split the text into letters and put it in a  <span> tag
const characters = text.split('').map((char) => {
    const span = document.createElement("span")
    span.innerText = char;
    textForTyping.appendChild(span)
    return span
});

//Add cursor to first letter, then move it with user input
let charIndex = 0;
let isCorrect = false;
let cursorChar = characters[charIndex]
cursorChar.classList.add("cursor")

//Split Input value into latters and  compare with text
function onInput() {
    let inpArray = inp.value.split('');

    if (!timer) {
        taskTimer();
    }
    for (let i in inpArray) {
        if (inpArray[i] === cursorChar.innerText) {
            isCorrect = true;
            cursorChar.classList.remove("cursor")
            cursorChar.classList.add("correct");
            inp.classList.remove("incorrect")
            cursorChar = characters[++charIndex]
        }
        else {
            isCorrect = false;
            cursorChar.classList.remove("correct");
            inp.classList.add("incorrect");
        }
        if (charIndex >= characters.length) {
            //End Game
            const numberOfWords = text.split(" ").length;
            const wordPerSeconde = numberOfWords / seconds
            wps.innerText = ` WPS - ${wordPerSeconde.toFixed(1)}`
            const wordPerMinute = wordPerSeconde * 60
            wpm.innerText = ` WPM - ${wordPerMinute.toFixed(1)}`
            inp.value = null;
            inp.removeEventListener('input', onInput);
            clearInterval(timer);
            return;
        }
    }
    // Checking if the user entered a space
    if (inp.value.indexOf(' ') > -1 && isCorrect) {
        inp.value = null
    }
    cursorChar.classList.add("cursor")
}

inp.addEventListener('input', onInput);

//Try again
function resetGame() {
    window.location.reload();
}

tryAgainBtn.addEventListener('click', resetGame);


//Change Theme and save it in local storage

if (!localStorage.theme) localStorage.theme = "light"
document.body.className = localStorage.theme

changeColor.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
    localStorage.theme = document.body.className || "light"
})

