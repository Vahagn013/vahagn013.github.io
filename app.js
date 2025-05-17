let score = parseInt(localStorage.getItem('score')) || 0;
let pointPerClick = parseInt(localStorage.getItem('pointPerClick')) || 1;
const scoreText = document.getElementById('scoreText');
const clickDiv = document.getElementById('clickDiv');

function showWinScreen() {
    clickDiv.style.display = 'none';
    scoreText.style.display = 'none';
    
    const winMessage = document.createElement('h1');
    winMessage.textContent = 'Congratulations you Win!';
    winMessage.style.color = 'gold';
    winMessage.style.fontSize = '48px';
    winMessage.style.textAlign = 'center';
    document.getElementById('bigDiv').appendChild(winMessage);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.style.padding = '20px 40px';
    restartButton.style.fontSize = '24px';
    restartButton.style.marginTop = '20px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.backgroundColor = '#4CAF50';
    restartButton.style.color = 'white';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '10px';
    restartButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    restartButton.style.transition = 'all 0.3s ease';
    
    restartButton.onmouseover = function() {
        this.style.backgroundColor = '#45a049';
        this.style.transform = 'scale(1.05)';
    };
    
    restartButton.onmouseout = function() {
        this.style.backgroundColor = '#4CAF50';
        this.style.transform = 'scale(1)';
    };
    
    restartButton.onclick = function() {
        score = 0;
        pointPerClick = 1;
        localStorage.setItem('score', '0');
        localStorage.setItem('pointPerClick', '1');
        scoreText.innerText = '0';
        clickDiv.style.display = 'block';
        scoreText.style.display = 'block';
        winMessage.remove();
        this.remove();
    };
    
    document.getElementById('bigDiv').appendChild(restartButton);
}

function updatePointsPerClick() {
    if (score >= 100000) {
        pointPerClick = 1000;
        localStorage.setItem('pointPerClick', '1000');
    } else if (score >= 10000) {
        pointPerClick = 300;
        localStorage.setItem('pointPerClick', '300');
    } else if (score >= 500) {
        pointPerClick = 50;
        localStorage.setItem('pointPerClick', '50');
        
    }
}

function handleClick() {
    score += pointPerClick;
    scoreText.innerText = score;
    localStorage.setItem('score', score);
    
    updatePointsPerClick();
    
    if (score >= 1000000) {
        showWinScreen();
    }
}

scoreText.innerText = score;
clickDiv.addEventListener('click', handleClick);