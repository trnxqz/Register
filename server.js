const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    console.log("Date primite:", req.body);

   
    if (!email || !password) {
        return res.status(400).json({ message: 'Date lipsă!' });
    }

    return res.json({ message: `Cont creat pentru ${firstName} ${lastName} (${email})` });
});

app.listen(3000, () => {
    console.log('Serverul rulează pe http://localhost:3000');
});
