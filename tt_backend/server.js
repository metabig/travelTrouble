// App configuration
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json

// Database configuration
const mongo = require('mongodb').MongoClient;
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('./app/routes/user.routes.js')(app);
require('./app/routes/group.routes.js')(app);

mongoose.connect(dbConfig.url, {
	    useNewUrlParser: true
	}).then(() => {
	    console.log("Successfully connected to the database");    
	}).catch(err => {
	    console.log('Could not connect to the database. Exiting now...', err);
	    process.exit();
});

// GET /
app.get('/', (req, res) => {
	    res.json({"response": "Welcome to the TravelTrouble API"});
});

app.listen(port, '192.168.43.104', () => console.log(`Example app listening on port ${port}!`));