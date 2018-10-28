require('dotenv').config()

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
      console.log("Database is connected ... signin");
  } else {
      console.log("Error connecting database ... nn");
  }
  });
  

  function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
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
        console.log(token);
    }
}


// router.get('/signin', function(req, res) {
//     res.send('routes available: signin : post -> /signin, signup : post -> /signup');
// });

router.post('/signin', function(req, res) {
    console.log("first post");
    connection.query('SELECT * FROM users WHERE email ?',[req.body.email],
     function(error, result) {
        if (!result) return res.status(404).json({ error: 'user not found' });

        if (!bcrypt.compareSync(req.body.password, result.password)) return res.status(401).json({ error: 'incorrect password ' });

        var payload = {
            email: result.email,
            password: result.password
        };
            console.log("second post");
        var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
            message: 'successfuly authenticated',
            token: token
        });
    });
})

module.exports = router;