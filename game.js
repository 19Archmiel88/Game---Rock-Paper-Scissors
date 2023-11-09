const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

function handSelection() {
  game.playerHand = this.dataset.option;
  console.log(game.playerHand);
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px red";
}

function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  const whoWinElement = document.querySelector('[data-summary="who-win"]');
  whoWinElement.textContent =
    result === "win"
      ? "You're quite a cheater... You won!!!!"
      : result === "loss"
      ? "Weak... The computer won... boo"
      : "Draw?? Seriously ?? :\\";

  whoWinElement.style.color =
    result === "win" ? "green" : result === "loss" ? "red" : "gray";
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = "";
  game.aiHand = "";
}

function startGame() {
  if (!game.playerHand) {
    return alert("Choose a paw!!!!");
  }

  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));
document.querySelector(".start").addEventListener("click", startGame);
