const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const openaiApiKey = 'API_KEY';

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo', 
            prompt: question + '\nQ:',
            max_tokens: 150
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${openaiApiKey}`
            }
        });

        const answer = response.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
