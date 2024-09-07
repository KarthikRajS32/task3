document.addEventListener("DOMContentLoaded", () => {
  const cardImages = ["🍎", "🍌", "🍇", "🍉", "🍍", "🥝", "🍒", "🍋"];
  let cards, flippedCards, matchedCards, gameBoard, timerInterval;
  let startTime, timerElement, winMessage, winTimeElement;

  function initGame() {
    cards = [...cardImages, ...cardImages];
    flippedCards = [];
    matchedCards = 0;
    gameBoard = document.getElementById("game-board");
    timerElement = document.getElementById("timer");
    winMessage = document.getElementById("win-message");
    winTimeElement = document.getElementById("win-time");

    shuffle(cards);
    gameBoard.innerHTML = ""; 

    cards.forEach((image) => {
      const card = createCard(image);
      gameBoard.appendChild(card);
    });

    resetTimer();
    startTimer();
    winMessage.style.display = "none"; 
  }

  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card", "bg-gray-100", "rounded-lg", "shadow-lg");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner", "relative");

    const cardFront = document.createElement("div");
    cardFront.classList.add(
      "card-front",
      "flex",
      "items-center",
      "justify-center",
      "text-2xl",
      "bg-gray-200",
      "rounded-lg"
    );

    const cardBack = document.createElement("div");
    cardBack.classList.add(
      "card-back",
      "bg-gray-700",
      "rounded-lg",
      "flex",
      "items-center",
      "justify-center",
      "text-2xl",
      "text-white"
    );
    cardBack.textContent = image;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
      if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    });

    return card;
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (
      card1.querySelector(".card-back").textContent ===
      card2.querySelector(".card-back").textContent
    ) {
      setTimeout(() => {
        card1.classList.add("invisible-card");
        card2.classList.add("invisible-card");
        flippedCards = [];
        matchedCards += 2;
        if (matchedCards === cards.length) {
          stopTimer();
          const finalTime = timerElement.textContent;
          winTimeElement.textContent = `Time: ${finalTime.split(": ")[1]}`;
          winMessage.style.display = "block";
        }
      }, 500);
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.textContent = `Time: ${pad(minutes)}:${pad(seconds)}`;
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    stopTimer();
    timerElement.textContent = "Time: 00:00";
  }

  function pad(number) {
    return number.toString().padStart(2, "0");
  }

  function showGamePage() {
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("game-page").style.display = "flex";
    initGame();
  }

  document.getElementById("start-game-button").addEventListener("click", showGamePage);
  document.getElementById("reset-button").addEventListener("click", initGame);


  document.getElementById("game-page").style.display = "none";
});
