const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const scoreFile = 'score.json';

// Initialize score file as an object if not present or if old format
if (!fs.existsSync(scoreFile)) {
    fs.writeFileSync(scoreFile, JSON.stringify({}));
} else {
    // Migrate old format if necessary
    try {
        const data = JSON.parse(fs.readFileSync(scoreFile));
        if (typeof data.score === 'number') {
            // Old format, migrate to empty object
            fs.writeFileSync(scoreFile, JSON.stringify({}));
        }
    } catch (e) {
        fs.writeFileSync(scoreFile, JSON.stringify({}));
    }
}

// Login/register endpoint (username only)
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    let scores = {};
    try {
        scores = JSON.parse(fs.readFileSync(scoreFile));
    } catch {}
    if (!(username in scores)) {
        scores[username] = 0;
        fs.writeFileSync(scoreFile, JSON.stringify(scores));
    }
    res.json({ success: true, username });
});

// Get score for a username
app.get('/get-score', (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username required' });
    let scores = {};
    try {
        scores = JSON.parse(fs.readFileSync(scoreFile));
    } catch {}
    const score = scores[username] || 0;
    res.json({ score });
});

// Update score for a username
app.post('/update-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || typeof score !== 'number') {
        return res.status(400).json({ error: 'Username and score required' });
    }
    let scores = {};
    try {
        scores = JSON.parse(fs.readFileSync(scoreFile));
    } catch {}
    // Only update if new score is higher
    if (!scores[username] || score > scores[username]) {
        scores[username] = score;
        fs.writeFileSync(scoreFile, JSON.stringify(scores));
    }
    res.json({ success: true, score: scores[username] });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 