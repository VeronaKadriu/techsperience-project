const express = require('express');
//init app
const app = express();

//views location

app.set('views', __dirname + '/views');

//Set template engine
app.set('view engine', 'ejs');

//Serving static file

app.use(express.static(__dirname + '/public'));

//Body-parser middleware
var bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup MongoDB

const MongoClient = require('mongodb').MongoClient;

const MongoURL = 'mongodb://localhost:27017/techsperience'

const ObjectId = require('mongodb').ObjectId;

//Connecting to MongoDB

MongoClient.connect(MongoURL, function(err, db) {
	if(err) {
		console.log(err);
		
	}
	else {
		console.log('Database connected successfully');
		
		documents = db.collection('documents');
		
	}
});

//routes
app.get('/', function(req, res){
	documents.find().toArray(function(err, docs) {
		if (err) {
			console.log(err);
			
		}
		else {
			 res.render("index", {docs: docs});
		}
	});
   
});



app.get('/documents/:id', function(req, res) {
   console.log(req.params.id);
   documents.findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
      if(err) {
         console.log(err);
      }
      res.render('show', {doc: doc});
   });
});


app.post('/documents/add', function(req,res) {
	
	documents.insert({title: req.body.title, author: req.body.author, documentno: req.body.documentno, description: req.body.description, physicallocation: req.body.physicallocation}, function(err, result) {
		if (err) {
			console.log(err);
			
		}
		else {
		res.redirect('/');	
		}
	});
	

});




	
app.get('/documents/edit/:id', function(req, res) {
	
	documents.findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
		if(err) {
			console.log(err);
		}
		else{
			res.render('edit', {doc: doc});
		}
	});
	
	
	
	
	
});


app.post('/documents/update/:id', function(req, res) {
   documents.updateOne({_id: ObjectId(req.params.id)},
                {$set: 
				{
					title: req.body.title, 
			author: req.body.author, 
			documentno: req.body.documentno, 
			description: req.body.description, 
			physicallocation: req.body.physicallocation}}, function(err, doc) {
                      if(err) {
                        console.log(err);
                     }
                     res.redirect('/');
                   });
});


app.get('/documents/delete/:id', function(req, res) {
	
	var id= ObjectId(req.params.id);
	
	documents.deleteOne({_id: id}, function(err, result) 
		{
			
			if(err) {
			console.log(err);
		}
		else{
		res.redirect('/');
		}
		});
	
});

//running app
app.listen(3000, function(){
    console.log("App running at http://localhost:3000");
});
