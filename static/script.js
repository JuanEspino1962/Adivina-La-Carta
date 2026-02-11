document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const p1Display = document.querySelector("#p1-score span");
  const p2Display = document.querySelector("#p2-score span");
  const p1Container = document.querySelector("#p1-score");
  const p2Container = document.querySelector("#p2-score");

  let hasFlippedCard = false;
  let lockBoard = false; // Evita clics mientras se verifican parejas
  let firstCard, secondCard;

  // Estado del juego
  let currentPlayer = 1;
  let scores = { 1: 0, 2: 0 };
  let pairsFound = 0;

  function flipCard() {
    // Si el tablero está bloqueado o clicamos la misma carta, no hacer nada
    if (lockBoard) return;
    if (this === firstCard) return;

    // Añadir clase para girar visualmente
    this.classList.add("flipped");

    if (!hasFlippedCard) {
      // Primer clic
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    // Segundo clic
    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    // Comparamos el atributo data-valor
    let isMatch = firstCard.dataset.valor === secondCard.dataset.valor;

    if (isMatch) {
      disableCards();
      updateScore();
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    // Se quedan boca arriba y quitamos el evento de click
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    // Marcamos como emparejadas
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();

    // Comprobar victoria
    pairsFound++;
    if (pairsFound === 20) {
      setTimeout(
        () =>
          alert(
            `¡Juego terminado! Ganador: Jugador ${
              scores[1] > scores[2]
                ? "1"
                : scores[2] > scores[1]
                ? "2"
                : "Empate"
            }`
          ),
        500
      );
    }
  }

  function updateScore() {
    scores[currentPlayer]++;
    if (currentPlayer === 1) {
      p1Display.textContent = scores[1];
    } else {
      p2Display.textContent = scores[2];
    }
    // Si aciertas, sigues jugando (regla común).
    // Si prefieres cambiar turno siempre, mueve switchTurn() fuera del else de checkForMatch.
  }

  function unflipCards() {
    lockBoard = true; // Bloquear tablero

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
      switchTurn();
    }, 1000); // Esperar 1 segundo antes de voltear
  }

  function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    p1Container.classList.toggle("active");
    p2Container.classList.toggle("active");
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Inicializar eventos
  cards.forEach((card) => card.addEventListener("click", flipCard));
});
