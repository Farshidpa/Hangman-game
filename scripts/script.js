const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainbtn = document.querySelector(".play-again");
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  // reset all the game
  correctLetters = [];
  wrongGuessCount = 0;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)

    .join("");

  gameModal.classList.remove("show");
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
  // reset your keyboard
  keyboardDiv
    .querySelectorAll("button")
    .forEach(
      (btn) => (
        (btn.disabled = false),
        (btn.style.backgroundColor = ""),
        (btn.style.color = "#eee")
      )
    );
};

//selection a random word and hint from the wordlist script
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  // console.log(word); // Answer
  // console.log(hint); // Hint question
  resetGame();

  document.querySelector(".hint-text b").innerHTML = hint;
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    //after 600ms of game complete .. showing modal with relavent details
    gameModal.classList.add("show");
    const modalText = isVictory
      ? `you found the word:`
      : `The correct word was`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!You are win" : "Game Over"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
  }, 300);
};
const initgame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    //cheking if clickedletter is exist on the currentword

    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
    // if you clicked true
    button.style.color = "green";
    button.style.animation = "shake 0.7s";
    button.style.backgroundColor = "green";
    //if you clicked falch
    // console.log(clickedLetter, "is exist on the word !");
  } else {
    //if clicked letter doesent exist then update the wrongGuesscount and hangman image
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    button.style.color = "transparent"; // if user click on the falch char change the color and disabled

    button.style.backgroundColor = "red";
    button.style.animation = "shake 0.7s";
  }

  button.disabled = true;
  guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
  // Calling gameover function if any of these condition meets
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
  // show the click and information about clicked
  // console.log(button, clickedLetter);
};
//creating keyboard buttons
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");

  button.innerHTML = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initgame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainbtn.addEventListener("click", getRandomWord);
