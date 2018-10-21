var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//use sendgrid
// var sgMail = require("@sendgrid/mail");
// var keys = require("../key");
// sgMail.setApiKey(keys.sendgrid);

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

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
  });
  require('dotenv').config()

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

  function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
            if (err) {
                res.status(403).json({
                    message: "Wrong Token"
                });
            } else {
                req.decoded = decod;
                next();
            }
        });
    } else {
        res.status(403).json({
            message: "No Token"
        });
    }
}







// app.post('/login', function(req, res) {
//     db.users.findOne({
//         username: req.body.username
//     }, function(error, result) {
//         if (!result) return res.status(404).json({ error: 'user not found' });

//         if (!bcrypt.compareSync(req.body.password, result.password)) return res.status(401).json({ error: 'incorrect password ' });

//         var payload = {
//             _id: result._id,
//             username: result.username
//         };

//         var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

//         return res.json({
//             message: 'successfuly authenticated',
//             token: token
//         });
//     });
// })

module.exports = router;