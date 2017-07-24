//Set up requirements and parameters
//**********************************************************
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

User = require('./models/user');

//If creating a mongo db from scratch, must create a 
//database under the name 'userlist'

/*It was brought to my attention while creating this app that
mongoose.connect() is an outdated method, but I don't find it fair
to change it now past the due date; just thought I'd add a note concerning it*/

mongoose.connect('mongodb://mongo/userlist');

app.use(bodyParser.json());

var port = process.env.PORT || 8080;
//***********************************************************
//Routing the API
var router = express.Router();

//Mainly Placed as filler so there's a 'home' site
router.get('/',function(req, res) {
	res.json('Hello World!')
});

router.route('/users')
	.post(function(req, res){
		console.log(req.body)
		var info = req.body;
		User.addUser(info, function(err, info){
			if(err)
				res.send(err);
			res.json(info);
		});
	})
	

	.get(function(req, res){
		var query = req.query;
		User.getUsers(query, function(err, users){
			if (err)
				res.send(err);
			res.json(users);
		});
	});

//Register the routes
app.use('/', router);

app.listen(port);
console.log("Running on port" + port);