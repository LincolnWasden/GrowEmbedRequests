const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Parse JSON request body

app.get('/api/embed/list/metric', async (req, res) => {
  const token = req.query.token; // get the token from the query parameter
  try {
    const response = await axios.get('https://app.gogrow.com/api/embed/list/metric', {
      headers: {
        'Authorization': `Bearer ${token}` // use the token in the request header
      }
    });
    const data = response.data;
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.post('/api/embed/url/metric/:id', async (req, res) => {
  const { config } = req.body;
  const token = req.query.token;
  const id = req.params.id;
  try {
    const response = await axios.post(`https://app.gogrow.com/api/embed/url/metric/${id}`, { config }, {
      headers: {
        'Authorization': `Bearer ${token}` // use the token in the request header
      }
    });
    const data = response.data;
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at https://grow-embed-requests.vercel.app/`);
});

module.exports = app;
