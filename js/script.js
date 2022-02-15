const inp = document.querySelector("input");
const textForTyping = document.querySelector(".text-for-typing")
const text = `I had a painting teacher once tell me that, the difference between a good painting and a great painting, is typically five strokes. And they're usually the five boldest strokes in the painting. The question, of course, is which five strokes?`
const wpm = document.querySelector(".wpm");
const wps = document.querySelector(".wps");

//timer
const timerEl = document.getElementById("remaining-time");
let timer;
let   minutes = 0;
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
        if (inpArray[i] == cursorChar.innerText) {
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