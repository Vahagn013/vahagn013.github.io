const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const users = {};

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ success: false });
    if (!users[username]) users[username] = 0;
    res.json({ success: true });
});

app.get('/get-score', (req, res) => {
    const { username } = req.query;
    const score = users[username] || 0;
    res.json({ score });
});

app.post('/update-score', (req, res) => {
    const { username, score } = req.body;
    users[username] = score;
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
