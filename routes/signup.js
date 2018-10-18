var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
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

// app.post('/', function(req, res) {
//   // Get sent data.
//   var user = req.body;
//   // Do a MySQL query.
//   var query = connection.query('INSERT INTO ____ SET ?', ____, function(err, result) {
//     // Neat!
//   });
//   res.end('Success');
// });

// app.post('/SignUp', function(req, res) {
//   // Get sent data.
//   var user = req.body;
//   // Do a MySQL query.
//   var query = connection.query('INSERT INTO ____ SET ?', ____, function(err, result) {
//     // Neat!
//   });
//   res.end('Success');
// });