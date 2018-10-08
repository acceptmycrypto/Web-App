var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

var path = require("path");

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));


var connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'password',  
    database: 'crypto_db'   
});

module.exports = router;