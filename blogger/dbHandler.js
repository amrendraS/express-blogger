var mongodb 		= require('mongodb'),
		config      = require('./config'),
		MongoClient = mongodb.MongoClient;

var connectionUrl = 'mongodb://' + config.db.host + ':' + config.db.port + '/amrendrasingh';		
var dbHandler     = {};
var db            = "";

exports.createConnection = function(){
	MongoClient.connect(connectionUrl, function(err, database) {
		if(err){
			console.log(err);
			console.log("unable to connect Mongodb database on host: " + config.db.host  + " port: " + config.db.port)
		} else{
			db = database;
			exports.db = database;
			console.log("Mongodb database connected to server on host: " + config.db.host  + " port: " + config.db.port);			
		}
	});
}

// Create super admin for the first time
exports.createAdmin = function(){
	db.collection('admin').findOne({role: 101}, function(err, result){
		if(!err && result) {
			console.log('Super admin already exists!');
		} else {
			console.log('Creating super admin here!');
			db.collection('admin').insert({username: "amrendra", password: "password", role: 101, createdAt: new Date(), name: "Amrendra Singh"}, function(err, result){
				if(!err && result) {
					console.log('Super admin has been created successfully!');
				} else {
					console.error('Error while creating super admin: ' + JSON.stringify(err));
				}
			})
		}
	})
}