var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

//you need this to be able to process information sent to a POST route
	var bodyParser = require('body-parser');

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());

var path = require("path");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "crypto_db"
});

router.get('/cryptos', function(req, res){

  connection.query('SELECT * FROM crypto_info', function (error, results, fields) {
    if (error) throw error;
    
    res.json(results);
  });

});

router.get('/cryptos:crypto', function(req, res){
	connection.query('SELECT * FROM crypto_info WHERE id = ?', [req.params.cryptos],function (error, results, fields) {
	  if (error) throw error;
	  
	  res.json(results[0]);
	});
});
