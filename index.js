
const dino = document.getElementById("dino");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
let isJumping = false;
let position = 0;
let score = 0;

function jump() {
if (isJumping) return;
isJumping = true;
let upInterval = setInterval(() => {
    if (position >= 100) {
    clearInterval(upInterval);
    let downInterval = setInterval(() => {
        if (position <= 0) {
        clearInterval(downInterval);
        isJumping = false;
        } else {
        position -= 5;
        dino.style.bottom = position + "px";
        }
    }, 20);
    } else {
    position += 5;
    dino.style.bottom = position + "px";
    }
}, 20);
}

function createObstacle() {
const obstacle = document.createElement("div");
obstacle.classList.add("obstacle");
let obstaclePosition = 600;
obstacle.style.left = obstaclePosition + "px";
gameArea.appendChild(obstacle);

let moveObstacle = setInterval(() => {
    if (obstaclePosition < 0) {
    clearInterval(moveObstacle);
    gameArea.removeChild(obstacle);
    score++;
    scoreDisplay.textContent = "Score: " + score;
    } else if (obstaclePosition > 50 && obstaclePosition < 90 && position < 40) {
    alert("Game Over! Your score: " + score);
    clearInterval(moveObstacle);
    location.reload();
    } else {
    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + "px";
    }
}, 20);

setTimeout(createObstacle, Math.random() * 3000 + 1000);
}

document.addEventListener("keydown", (e) => {
if (e.key === " ") {
    jump();
}
});

createObstacle();
