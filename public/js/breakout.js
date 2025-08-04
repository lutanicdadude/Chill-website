let grid = document.querySelector(".grid");
let ball = document.querySelector(".ball");
let paddle = document.querySelector(".paddle");

for (let i = 0; i <= 47; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
}

let ballDirectionX = 1;
let ballDirectionY = 1;
let ballSpeed = 100;  // Initial ball speed

let blocks = document.querySelectorAll(".grid div");

// moving ball
function moveBall() {
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    ball.style.left = (ballLeft + (5 * ballDirectionX)) + "px";
    ball.style.top = (ballTop - (5 * ballDirectionY)) + "px";
}

function changeDirection() {
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    let ballWidth = ball.offsetWidth;
    let ballHeight = ball.offsetHeight;

    // Get correct screen width and height for mobile + desktop
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;

    // Detect wall collisions
    if (ballLeft <= 0 || ballLeft >= screenWidth - ballWidth) {
        ballDirectionX = -ballDirectionX;
        ballSpeed += 0.5;  // Increase speed on side wall hit
    }

    if (ballTop <= 0 || ballTop >= screenHeight - ballHeight) {
        ballDirectionY = -ballDirectionY;
        ballSpeed += 0.5;  // Increase speed on top/bottom wall hit
    }
}



// remove the blocks
function removeBlock() {
    blocks.forEach(block => {
        let blockPos = block.getBoundingClientRect();
        let ballPos = ball.getBoundingClientRect();

        // Check if the ball is really touching the block
        if (
            ballPos.right > blockPos.left &&
            ballPos.left < blockPos.right &&
            ballPos.bottom > blockPos.top &&
            ballPos.top < blockPos.bottom &&
            !block.classList.contains("remove")
        ) {
            block.classList.add("remove");
            ballDirectionY = -ballDirectionY; // Bounce off the block
        }
    });
}

function movePaddle(e) {
    let clientX = e.clientX || e.touches[0].clientX;  // Handle both mouse and touch
    let paddleWidth = paddle.offsetWidth;
    let maxLeft = window.innerWidth - paddleWidth;

    // Move paddle, ensuring it stays within screen bounds
    let newLeft = Math.max(0, Math.min(clientX - paddleWidth / 2, maxLeft));
    paddle.style.left = newLeft + "px";
}

// Add Event Listeners for Mouse and Touch
document.addEventListener("mousemove", movePaddle);
document.addEventListener("touchmove", movePaddle);


// Check collision with paddle and bounce the ball
function checkPaddleCollision() {
    let ballPos = ball.getBoundingClientRect();
    let paddlePos = paddle.getBoundingClientRect();

    // Check if the ball is hitting the paddle
    if (
        ballPos.bottom >= paddlePos.top && // Ball's bottom touches paddle's top
        ballPos.right >= paddlePos.left && // Ball's right touches paddle's left
        ballPos.left <= paddlePos.right && // Ball's left touches paddle's right
        ballPos.top <= paddlePos.bottom    // Extra safety check if the ball goes inside the paddle
    ) {
        ballDirectionY = -ballDirectionY;
        ballSpeed += 1;  // Increase speed on paddle hit

        // Control angle based on where the ball hits the paddle
        let paddleCenter = paddlePos.left + paddlePos.width / 2;
        let hitPosition = (ballPos.left + ballPos.width / 2) - paddleCenter;
        ballDirectionX = hitPosition / (paddlePos.width / 2);

        // Adjust X direction based on the hit position (-1 to 1)
        ballDirectionX = hitPosition / (paddlePos.width / 2);
    }
}

// Function to check for game over condition
function checkGameOver() {
    let remainingBlocks = document.querySelectorAll(".grid div:not(.remove)");
    if (remainingBlocks.length === 0) {
        // Show the Bootstrap modal
        let gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
        gameOverModal.show();
        clearInterval(gameInterval);  // Stop the game loop
    }
}

// Function to restart the game
function restartGame() {
    window.location.reload();  // Reload the page
}


// start the game
function startGame() {
    moveBall();
    changeDirection();
    removeBlock();
    checkPaddleCollision();
    checkGameOver();
}

// Add event listeners for movement
// document.addEventListener("keydown", movePaddle);


setInterval(startGame, 10);