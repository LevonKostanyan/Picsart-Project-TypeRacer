const inp = document.querySelector("input");
const textForTyping = document.querySelector(".text-for-typing")
const text = `I had a painting teacher once tell me that, the difference between a good painting and a great painting, is typically five strokes. And they're usually the five boldest strokes in the painting. The question, of course, is which five strokes?`

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
let isCorrect;
let cursorChar = characters[charIndex]
cursorChar.classList.add("cursor")

const timerEl = document.getElementById("remaining-time");
let timer;
let correctLettersCount = 0;

const taskTimer = () => {
    const now = new Date();

    timer = setInterval(() => {
        const t = new Date(new Date() - now);
        const minutes = t.getMinutes();
        const seconds = t.getSeconds();

        timerEl.innerHTML = `Minutes - ${minutes} Seconds - ${seconds}`;
    }, 1000);
};

//Split Input value into letters and  compare with text
inp.oninput = () => {
    let inpArray = inp.value.split('');
    let textLettersCount = text.split('').filter((t) => t !== ' ');

    if (!timer) {
        taskTimer();
    }

    for (let i in inpArray) {

        if (charIndex >= characters.length) {
            inp.value = null
            return;
        }

        if (inpArray[i] === cursorChar.innerHTML) {
            isCorrect = true;
            correctLettersCount++;
            cursorChar.classList.remove("cursor")
            cursorChar.classList.add("correct");
            inp.classList.remove("incorrect")
            cursorChar.classList.add("cursor")
            cursorChar = characters[++charIndex]
        } else {
            isCorrect = false;
            cursorChar.classList.remove("correct");
            inp.classList.add("incorrect");

        }
    }

    // Checking if the user entered a space
    if (inp.value.indexOf(' ') > -1 && isCorrect) {
        inp.value = null;
        correctLettersCount--;
    }

    console.log(correctLettersCount)
    console.log(textLettersCount.length)

    if (correctLettersCount === textLettersCount.length) {
        clearInterval(timer);
    }
}


