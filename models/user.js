var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Create Schema for any User
var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

//Query returns as an object that can be used to filter the database 
//directly with MongoDB's find operation
module.exports.getUsers = function(query, callback) {
	User.find(query, callback);
}

//Info comes from the required name and role that must be provided in 
//the JSON POST request
module.exports.addUser = function(info, callback) {
	User.create(info, callback);
}

