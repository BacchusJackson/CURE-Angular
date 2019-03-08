const express = require ("express");

const app = express();

const port = 3000;

//get any request and return a response
app.get('/', (req, res) => {
    res.send('Hello, JaX.')
});

app.listen(port, () => console.log('Listening on port: ' + port));