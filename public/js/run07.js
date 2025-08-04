const dinoMascot = document.getElementById("mascot07");
const gameArea = document.querySelector(".game");
const obstacleImages = ["/images/dinoObstacle1.png", "/images/dinoObstacle2.png"];
let spawnTime = 3000; // Initial spawn time (3s)
let obstacleSpeed = 10; // Initial obstacle speed
let gameInterval, obstacleInterval, collisionInterval;
let isGameOver = false;

// Jump Function
function jump() {
    if (!dinoMascot.classList.contains("jump")) {
        dinoMascot.classList.add("jump");
        setTimeout(() => dinoMascot.classList.remove("jump"), 700);
    }
}

// Create Obstacles Randomly
function createObstacle() {
    let newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    newObstacle.style.left = "600px";

    let randomIndex = Math.floor(Math.random() * obstacleImages.length);
    newObstacle.style.backgroundImage = `url(${obstacleImages[randomIndex]})`;

    gameArea.appendChild(newObstacle);

    let moveObstacle = setInterval(() => {
        let obstacleLeft = parseInt(window.getComputedStyle(newObstacle).getPropertyValue("left"));

        if (obstacleLeft <= -100) {
            newObstacle.remove();
            clearInterval(moveObstacle);
        } else {
            newObstacle.style.left = obstacleLeft - obstacleSpeed + "px"; // Updated dynamically
        }
    }, 30);

    // Ensure obstacle disappears correctly
    let obstacleLifetime = 600 / obstacleSpeed * 30;
    setTimeout(() => {
        clearInterval(moveObstacle);
        newObstacle.remove();
    }, obstacleLifetime);
}


// Increase speed gradually without affecting spawn time
function increaseDifficulty() {
    if (obstacleSpeed < 30) obstacleSpeed += 1; // Increase obstacle speed over time
    // Update speed for existing obstacles
    document.querySelectorAll(".obstacle").forEach(obstacle => {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        obstacle.style.left = obstacleLeft - obstacleSpeed + "px"; // Apply new speed
    });
}

// Collision Detection
function checkCollision() {
    let mascotTop = parseInt(window.getComputedStyle(dinoMascot).getPropertyValue("top"));
    let obstacles = document.querySelectorAll(".obstacle");

    obstacles.forEach(obstacle => {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (obstacleLeft < 130 && obstacleLeft > 0 && mascotTop >= 74) {
            gameOver();
        }
    });
}

// Game Over Function
function gameOver() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(collisionInterval);
    document.querySelectorAll(".obstacle").forEach(obstacle => obstacle.remove());

    isGameOver = true;

    let modal = new bootstrap.Modal(document.getElementById('gameOverModal'));
    modal.show();
}

// Restart Game
function restartGame() {
    // Hide the game over modal
    let modalElement = document.getElementById('gameOverModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide(); // Hide the modal properly
    }

    // Reset game variables
    spawnTime = 3000;
    obstacleSpeed = 10;

    // Clear obstacles
    document.querySelectorAll(".obstacle").forEach(obstacle => obstacle.remove());

    // Restart game intervals
    gameInterval = setInterval(increaseDifficulty, 5000); // Increase speed every 5s
    obstacleInterval = setInterval(createObstacle, spawnTime); // Keep spawning at same rate
    collisionInterval = setInterval(checkCollision, 50); // Constant collision detection

    // Reset score
    isGameOver = false; // Reset game state
    document.getElementById("score").innerHTML = "SCORE: 0";
    scoreboard(); // Restart scoreboard
}

// Add a score board
function scoreboard() {
    let modalMessage = document.getElementById("modalMessage");
    let displayScore = document.getElementById("score");
    let userScore = 0;
    let scoreInterval = setInterval(() => {
        if (!isGameOver) {
            userScore++;
            displayScore.innerHTML = `SCORE: ${userScore}`;
        } else {
            clearInterval(scoreInterval);
            modalMessage.innerHTML = `You Lose! Your Score: ${userScore}`;
            userScore = 0;
        }
    }, 1000);

}

// Start Game
restartGame();
document.addEventListener("click", jump);
scoreboard();