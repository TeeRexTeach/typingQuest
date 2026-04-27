const correctSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);
const alphabetList = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
];

const wordList = [
  "apple",
  "banana",
  "school",
  "teacher",
  "computer",
  "holiday",
  "beautiful",
  "friend"
];

let currentMode = "alphabet";
let words = alphabetList;
    let currentWord = "";
    let score = 0;
    let time = 60;
    let timer;
    let gameStarted = false;

    const wordDisplay = document.getElementById("wordDisplay");
    const wordInput = document.getElementById("wordInput");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    const messageDisplay = document.getElementById("message");

    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

function showNewWord() {
  currentWord = getRandomWord();
  updateWordDisplay();
}

function updateWordDisplay() {
  const typed = wordInput.value.toLowerCase();
  let displayHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];

    if (i < typed.length) {
      // Highlight typed letters
      displayHTML += `<span class="correct-letter">${letter.toUpperCase()}</span>`;
    } else {
      // Normal letters
      displayHTML += `<span>${letter.toUpperCase()}</span>`;
    }
  }

  wordDisplay.innerHTML = displayHTML;
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  score = 0;
  time = 60;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  messageDisplay.textContent = "🔥 Game Started!";

  wordInput.value = "";
  
  // SHOW input box when game starts
  wordInput.style.display = "block";
  wordInput.focus();

  // Hide mode selector when game starts
  document.querySelector(".mode-select").style.display = "none";

  // Hide Start button, Show End Game button
  document.querySelector(".start-btn").style.display = "none";
  document.querySelector(".end-btn").style.display = "inline-block";

  showNewWord();

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}
function forceEndGame() {
  endGame();
}

function endGame() {
  clearInterval(timer);
  gameStarted = false;

  messageDisplay.textContent = `🏆 Game Over! Final Score: ${score}`;
  wordDisplay.textContent = `🏆 Game Over! Final Score: ${score}`;
  wordInput.value = "";

  // HIDE input box when game ends
  wordInput.style.display = "none";

  // Show mode selector again
  document.querySelector(".mode-select").style.display = "flex";

  // Show Start button again
  document.querySelector(".start-btn").style.display = "inline-block";

  // Hide End Game button
  document.querySelector(".end-btn").style.display = "none";
}
    wordInput.addEventListener("input", () => {
      wordInput.addEventListener("keydown", (e) => {
if (e.key.length === 1) {
  const currentInput = wordInput.value.toLowerCase();
  const expectedLetter = currentWord[currentInput.length];

  if (e.key.toLowerCase() !== expectedLetter) {
    e.preventDefault();

    highlightKey(e.key, false); // red for wrong key
    messageDisplay.textContent = "❌ Wrong letter! Try again!";
    return;
  } else {
    highlightKey(e.key, true); // blue for correct key
    setTimeout(() => {
  updateWordDisplay();
}, 10);
  }
}
  if (!gameStarted) return;

  // Allow special keys
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Shift",
    "Control",
    "Alt",
    "Enter"
  ];

  if (allowedKeys.includes(e.key)) return;

  // Only check normal letter keys
  if (e.key.length === 1) {
    const currentInput = wordInput.value.toLowerCase();
    const expectedLetter = currentWord[currentInput.length];

    // If wrong letter → block typing
    if (e.key.toLowerCase() !== expectedLetter) {
      e.preventDefault(); // stops wrong letter

      messageDisplay.textContent = "❌ Wrong letter! Try again!";
      return;
    }
  }

      // Small delay so the typed letter enters first
      setTimeout(() => {
        if (wordInput.value.toLowerCase() === currentWord) {
        correctSound.currentTime = 0;
correctSound.play();
          score++;
          scoreDisplay.textContent = score;
          messageDisplay.textContent = "🎉 Correct!";

          wordInput.value = "";
          showNewWord();
        }
      }, 10);
    });
	
      if (wordInput.value.toLowerCase() === currentWord) {
      correctSound.currentTime = 0;
correctSound.play();
        score++;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = "🎉 Correct!";
        wordInput.value = "";
        showNewWord();
      }
    });
    
   const toggleKeyboardBtn = document.getElementById("toggleKeyboardBtn");
const keyboard = document.getElementById("keyboard");
const allKeys = document.querySelectorAll(".key");

let keyboardVisible = false;

// Toggle keyboard button
toggleKeyboardBtn.addEventListener("click", () => {
  keyboardVisible = !keyboardVisible;

  if (keyboardVisible) {
    keyboard.style.display = "block";
    toggleKeyboardBtn.textContent = "⌨️ Hide Keyboard";
  } else {
    keyboard.style.display = "none";
    toggleKeyboardBtn.textContent = "⌨️ Show Keyboard";
  }
});

// Highlight pressed key
function highlightKey(letter, isCorrect = true) {
  // Remove old highlights
  allKeys.forEach(key => {
    key.classList.remove("active");
    key.classList.remove("wrong");
  });

  const targetKey = document.querySelector(
    `.key[data-key="${letter.toLowerCase()}"]`
  );

  if (targetKey) {
    if (isCorrect) {
      targetKey.classList.add("active"); // blue
    } else {
      targetKey.classList.add("wrong"); // red
    }
  }
}

function setMode(mode) {
  currentMode = mode;

  if (mode === "alphabet") {
    words = alphabetList;
  } else {
    words = wordList;
  }

  // Update button styles
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (mode === "alphabet") {
    document.querySelectorAll(".mode-btn")[0].classList.add("active");
  } else {
    document.querySelectorAll(".mode-btn")[1].classList.add("active");
  }
}
