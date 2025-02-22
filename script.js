let score = 0;
let timeLeft = 30;
let timerInterval;

const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');

clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
});

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    clickButton.style.display = 'inline-block';
    startButton.style.display = 'none';

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clickButton.style.display = 'none';
            startButton.style.display = 'inline-block';
            alert(`Game Over! Your score is: ${score}`);
        }
    }, 1000);
}
