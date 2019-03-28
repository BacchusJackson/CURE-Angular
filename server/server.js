const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//sets the port to an enviromental variable or 3000
const port = process.env.PORT || 3000;

//set the port option
app.set('port', port);

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//points to the folder where angular compiles the html code
app.use(express.static(path.join(__dirname, '../cure-app/dist/cure-app')));

//sets the api route
app.use('/api', api);

//get any request and return a response
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cure-app/dist/cure-app/index.html'))
});

app.listen(port, () => console.log('Server listening on port: ' + port));