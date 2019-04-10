const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config/database');

//https stuff
const fs = require('fs')
const https = require('https')

// Connect to database in config file
mongoose.connect(config.database);

//success connection message
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err)
});

const app = express();


//pulls in the route catchers from users
const users = require('./routes/users');

//pulls in the route catchers for data
const data = require('./routes/data')

//sets the port to an enviromental variable or 3000
const port = process.env.PORT || 3004;

//set the port option
app.set('port', port);

// Cross Orgin Middleware to allow internal server calls
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware to handle tokens and user authentication
app.use(passport.initialize());
app.use(passport.session());

require('../config/passport')(passport);

//list of routes to use
app.use('/users', users);
app.use('/data', data);

//points to the folder where angular compiles the html code
app.use(express.static(path.join(__dirname, '../public')));

//get any request and return a response
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//starts the server
//app.listen(port, () => console.log('Server listening on port: ' + port));

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
.listen(port, () => console.log('Server listening on port: ' + port));