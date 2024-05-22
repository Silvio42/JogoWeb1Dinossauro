const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let jumping = false;
let score = 0;
let gameRunning = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!gameRunning) {
            resetGame();
        } else if (!jumping) {
            jump();
        }
    }
});

function jump() {
    if (!gameRunning) return;

    jumping = true;
    let position = 0;
    const upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    jumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 10;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function moveObstacle() {
    let obstacleLeft = 600;
    const obstacleInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(obstacleInterval);
            return;
        }

        obstacleLeft -= 10;
        obstacle.style.left = obstacleLeft + 'px';

        if (obstacleLeft > 0 && obstacleLeft < 40 && !jumping && parseInt(dino.style.bottom) < 40) {
            gameRunning = false;
            clearInterval(obstacleInterval);
            scoreDisplay.textContent += " - Game Over! Aperte espaço para continuar.";
        } else if (obstacleLeft < -20) {
            obstacleLeft = 600; 
            score += 1;
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }
    }, 20);
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = "Pontuação: 0";
    gameRunning = true;
    dino.style.bottom = '0px';
    moveObstacle();
}

resetGame();
