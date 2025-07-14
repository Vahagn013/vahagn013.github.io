// Change this to your computer's IP address if using a phone on the same WiFi
// Example: const SERVER = 'http://192.168.1.5:3000';
const SERVER = 'http://localhost:3000';

let score = 0;
let pointPerClick = 1;
let username = localStorage.getItem('username') || null;
const scoreText = document.getElementById('scoreText');
const clickDiv = document.getElementById('clickDiv');
const loginDiv = document.getElementById('loginDiv');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('usernameInput');
const logoutBtn = document.getElementById('logoutBtn');
const bigDiv = document.getElementById('bigDiv');

// Add a message area for feedback
let messageDiv = document.createElement('div');
messageDiv.id = 'messageDiv';
messageDiv.style.margin = '10px 0';
loginDiv.appendChild(messageDiv);

function showMessage(msg, color = 'black') {
    messageDiv.textContent = msg;
    messageDiv.style.color = color;
}

function clearMessage() {
    messageDiv.textContent = '';
}

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
        updateScoreOnServer(0);
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
    } else if (score >= 10000) {
        pointPerClick = 300;
    } else if (score >= 500) {
        pointPerClick = 50;
    } else {
        pointPerClick = 1;
    }
}

function handleClick() {
    score += pointPerClick;
    scoreText.innerText = score;
    updatePointsPerClick();
    updateScoreOnServer(score);
    if (score >= 1000000) {
        showWinScreen();
    }
}

function updateScoreOnServer(newScore) {
    if (!username) return;
    fetch(`${SERVER}/update-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score: newScore })
    }).catch(err => {
        showMessage('Could not connect to server to update score.', 'red');
        console.error('Update score error:', err);
    });
}

function fetchScoreFromServer() {
    if (!username) return;
    fetch(`${SERVER}/get-score?username=${encodeURIComponent(username)}`)
        .then(res => {
            if (!res.ok) throw new Error('Server error');
            return res.json();
        })
        .then(data => {
            score = data.score || 0;
            scoreText.innerText = score;
            updatePointsPerClick();
        })
        .catch(err => {
            showMessage('Could not connect to server to fetch score.', 'red');
            console.error('Fetch score error:', err);
        });
}

function showGame() {
    loginDiv.style.display = 'none';
    bigDiv.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
    clearMessage();
}

function showLogin() {
    loginDiv.style.display = 'block';
    bigDiv.style.display = 'none';
    logoutBtn.style.display = 'none';
    clearMessage();
}

loginBtn.onclick = function() {
    const inputUser = usernameInput.value.trim();
    if (!inputUser) {
        showMessage('Please enter a username', 'red');
        return;
    }
    showMessage('Logging in...', 'blue');
    fetch(`${SERVER}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUser })
    })
    .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
    })
    .then(data => {
        if (data.success) {
            username = inputUser;
            localStorage.setItem('username', username);
            showMessage('Login successful!', 'green');
            setTimeout(() => {
                showGame();
                fetchScoreFromServer();
            }, 500);
        } else {
            showMessage('Login failed.', 'red');
        }
    })
    .catch(err => {
        showMessage('Could not connect to server for login. Make sure the server is running and the address is correct.', 'red');
        console.error('Login error:', err);
    });
};

logoutBtn.onclick = function() {
    username = null;
    localStorage.removeItem('username');
    showLogin();
};

clickDiv.addEventListener('click', function() {
    if (!username) return;
    handleClick();
});

// On load
if (username) {
    showGame();
    fetchScoreFromServer();
} else {
    showLogin();
}