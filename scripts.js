// Dynamic Year in Footer
const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Game Elements
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

let isJumping = false;
let score = 0;
let gameInterval;

// Jump Logic
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    let playerBottom = parseInt(window.getComputedStyle(player).bottom);
    if (playerBottom >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (playerBottom <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          player.style.bottom = playerBottom - 5 + "px";
          playerBottom -= 5;
        }
      }, 20);
    } else {
      player.style.bottom = playerBottom + 5 + "px";
      playerBottom += 5;
    }
  }, 20);
}

// Move the Obstacle
function moveObstacle() {
  let obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);
  if (obstaclePosition >= window.innerWidth + 40) {
    obstacle.style.right = "-40px";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    obstacle.style.right = obstaclePosition + 5 + "px";
  }
}

// Collision Detection
function checkCollision() {
  const playerBottom = parseInt(window.getComputedStyle(player).bottom);
  const obstacleRight = parseInt(window.getComputedStyle(obstacle).right);

  if (obstacleRight >= 50 && obstacleRight <= 90 && playerBottom <= 40) {
    clearInterval(gameInterval);
    alert("Game Over! Your score is " + score);
    restartButton.style.display = "block";
  }
}

// Game Loop
function startGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  obstacle.style.right = "-40px";
  restartButton.style.display = "none";
  gameInterval = setInterval(() => {
    moveObstacle();
    checkCollision();
  }, 20);
}

// Restart Game
restartButton.addEventListener("click", () => {
  startGame();
});

startGame();
