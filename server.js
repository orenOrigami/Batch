const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/searchBatch', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
        return res.status(400).send('Search term is required');
    }

    try {
        const response = await axios.get('https://api.origami.ms/v1/batches', {
            headers: {
                'Authorization': 'Bearer YOUR_ORIGAMI_API_TOKEN', // Replace with your token
            },
        });

        const batch = response.data.find(batch => batch.name.includes(searchTerm) || batch.id.includes(searchTerm));
        
        if (batch) {
            res.json(batch);
        } else {
            res.status(404).send('Batch not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching batches');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
