let score = 0;
let timeLeft = 10;
let timer;
let isGameActive = false;
let level = 1;
let timePerLevel = 10; // Starting time for level 1
let doublePointsActive = false;
let doublePointsDuration = 5; // 5 seconds of double points
let doublePointsTimer;
let highScore = localStorage.getItem('highScore') || 0;
let clickSound = new Audio('click-sound.mp3'); // Add your own click sound
let gameOverSound = new Audio('gameover-sound.mp3'); // Add your own game over sound

const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const timerElement = document.getElementById('timer');
const clickButton = document.getElementById('clickButton');
const startButton = document.getElementById('startButton');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// Display high score
highScoreElement.textContent = `High Score: ${highScore}`;

// Function to start the game
function startGame() {
    score = 0;
    level = 1;
    timeLeft = timePerLevel;
    isGameActive = true;
    doublePointsActive = false;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time left: ${timeLeft}`;
    gameOverElement.classList.add('hidden');
    startButton.disabled = true;
    clickButton.disabled = false;

    // Start the countdown timer
    timer = setInterval(updateTimer, 1000);

    // Add power-up every 5 seconds (randomly)
    setInterval(generatePowerUp, 5000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}`;
    
    if (timeLeft <= 0) {
        levelUp(); // Proceed to the next level
    }
}

// Level up after each round
function levelUp() {
    level++;
    if (level <= 5) {  // Limit levels for simplicity
        timePerLevel -= 1; // Reduce time per level
        timeLeft = timePerLevel;
        timerElement.textContent = `Time left: ${timeLeft}`;
    } else {
        clearInterval(timer); // End game if level exceeds limit
        endGame();
    }
}

// Function to increase score when the button is clicked
function increaseScore() {
    if (isGameActive) {
        clickSound.play(); // Play click sound
        if (doublePointsActive) {
            score += 2; // Double points
        } else {
            score++;
        }
        scoreElement.textContent = `Score: ${score}`;
    }
}

// Function to generate power-up
function generatePowerUp() {
    if (Math.random() < 0.5) {
        activateDoublePoints();
    }
}

// Function to activate double points power-up
function activateDoublePoints() {
    doublePointsActive = true;
    setTimeout(() => {
        doublePointsActive = false;
    }, doublePointsDuration * 1000);
}

// Function to end the game
function endGame() {
    isGameActive = false;
    clickButton.disabled = true;
    gameOverSound.play(); // Play game over sound
    gameOverElement.classList.remove('hidden');
    finalScoreElement.textContent = score;

    // Update high score if needed
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save new high score
        highScoreElement.textContent = `High Score: ${highScore}`;
    }

    startButton.disabled = false;
}

// Function to reset the game
function resetGame() {
    gameOverElement.classList.add('hidden');
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    startButton.disabled = false;
    clickButton.disabled = true;
}
