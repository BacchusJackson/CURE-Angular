const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const http = require ('http');

const api = require('./routes/api');
const app = express();

//sets the port to an enviromental variable or 3000
const port = process.env.PORT || 3000;

//set the port option
app.set('port', port);


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

const server = http.createServer(app);

server.listen(port, () => console.log('Listening on port: ' + port));