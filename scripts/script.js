const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 40; // Each cell size for the snake
const rows = canvas.width / box;
const cols = canvas.height / box;

let snake = [{ x: 9 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * rows) * box, y: Math.floor(Math.random() * cols) * box };
let direction = "RIGHT";
let score = 0;
let game;

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if ((key === 37 || key === 65) && direction !== "RIGHT") direction = "LEFT";
  else if ((key === 38 || key === 87) && direction !== "DOWN") direction = "UP";
  else if ((key === 39 || key === 68) && direction !== "LEFT") direction = "RIGHT";
  else if ((key === 40 || key === 83) && direction !== "UP") direction = "DOWN";
}

function drawCheckerboard(ctx, width, height) {
    for (let x = 0; x < width; x += box * 2) {
        for (let y = 0; y < height; y += box * 2) {
            ctx.fillStyle = "#000";
            ctx.fillRect(x, y, box, box);
            ctx.fillRect(x + box, y + box, box, box);
        }
    }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw checkerboard background
  drawCheckerboard(ctx, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(segment => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(segment.x, segment.y, box, box);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
  ctx.strokeStyle = "darkred";
  ctx.strokeRect(food.x, food.y, box, box);

  // Move snake
  let newHead = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") newHead.x -= box;
  else if (direction === "UP") newHead.y -= box;
  else if (direction === "RIGHT") newHead.x += box;
  else if (direction === "DOWN") newHead.y += box;

  // Check if snake eats food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    food = { x: Math.floor(Math.random() * rows) * box, y: Math.floor(Math.random() * cols) * box };
  } else {
    snake.pop();
  }

  // Check if snake collides with itself or wall
  if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height || collision(newHead, snake)) {
    clearInterval(game);
    document.getElementById("gameOver").style.display = "block";
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  return array.some(segment => {
    return head.x === segment.x && head.y === segment.y;
  });
}

function restartGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = { x: Math.floor(Math.random() * rows) * box, y: Math.floor(Math.random() * cols) * box };
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("gameOver").style.display = "none";
  game = setInterval(draw, 100);
}

game = setInterval(draw, 100);

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("controlsModal");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Show modal on page load
  modal.style.display = "block";

  // Close modal when clicking on the close button or outside the modal
  closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });
});