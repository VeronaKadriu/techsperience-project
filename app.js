const express = require('express');

// init app
const app = express();

// Views location
app.set('views', __dirname + '/views');

// Setting template engine
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(__dirname + '/public'));

// body parser middleware
var bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/techsperience';
const ObjectId = require('mongodb').ObjectId;

// Conneting to MongoDB
MongoClient.connect(mongoURL, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected successfully!');
    dokumentet = db.collection('dokumentet');
  }
});

//routes
app.get('/', function(req, res) {
  res.render("Index");
});

app.listen(3000, function() {
  console.log("App running at http://localhost:3000");
});