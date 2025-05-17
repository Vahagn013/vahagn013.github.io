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

if (!fs.existsSync(scoreFile)) {
    fs.writeFileSync(scoreFile, JSON.stringify({ score: 0 }));
}

app.get('/score', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(scoreFile));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read score' });
    }
});

app.post('/score', (req, res) => {
    try {
        const { score } = req.body;
        fs.writeFileSync(scoreFile, JSON.stringify({ score }));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 