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

//Split Input value into latters and  compare with text
inp.oninput = () => {
    let inpArray = inp.value.split('');
    for (let i in inpArray) {

        if (charIndex >= characters.length) {
            inp.value = null
            return;
        }

        if (inpArray[i] === cursorChar.innerHTML) {

            isCorrect = true;
            cursorChar.classList.remove("cursor")
            cursorChar.classList.add("correct");
            inp.classList.remove("incorrect")
            cursorChar = characters[++charIndex]
            cursorChar.classList.add("cursor")

        } else {
            isCorrect = false;
            cursorChar.classList.remove("correct");
            inp.classList.add("incorrect");

        }
    }

    // Checking if the user entered a space
    if (inp.value.indexOf(' ') > -1 && isCorrect) {
        inp.value = null
    }
}


