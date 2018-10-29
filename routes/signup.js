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
var sgMail = require("@sendgrid/mail");
var keys = require("../key");
sgMail.setApiKey(keys.sendgrid);

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



router.post('/register', function(req, res) {
  console.log(req.body);

//First we make a query to see if user exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [req.body.email],
    function(error, result, fields) {
      if (error) throw error;

//if we find the user exists in the database, we send "User already exists" to the client
      if (result) return res.status(404).json({ error: 'User already exists' });
      console.log("successfully query", result);

      bcrypt.genSalt(10, function(err, salt) {

        bcrypt.hash(req.body.password, salt, function(err, password_hash) {

//1) insert into users table
          connection.query('INSERT INTO users (email, password, username, email_verification_token) VALUES (?, ?, ?, ?)',
          [req.body.email, password_hash, req.body.username, uuid()],
          function (error, results, fields) {
            if (error) {
              res.send(error);
            } else {
              res.json({
                  message: "We sent you an email for email verification. Please confirm your email."
              });
              console.log("new user created", results);
            }
          });

        });

      });

    }
  );
});




















//sign up
  // router.post("/register", function(req,res) {
  //   // var today = new Date();
  //   console.log(req.body);

  //   //First we make a query to see if user exists in the database
  //   connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (error, result, fields) {

  //     //if we find the user exists in the database, we send "User already exists" to the client
  //     if (result) return res.status(404).json({ error: 'User already exists' });

  //     if (error) console.log(error);
  //     console.log("line 58")
  //     //if user doesn't exist, then we hash their password
  //     bcrypt.genSalt(10, function(err, salt) {
  //       bcrypt.hash(req.body.password, salt, function(err, password_hash) {

  //         //1) insert into users table
  //         connection.query('INSERT INTO users (email, password, username, email_verification_token) VALUES (?, ?, ?, ?)',
  //         [req.body.email, password_hash, req.body.username, uuid()],
  //         function (error, results, fields) {
  //           if (error) {
  //             res.send(error);
  //           } else {
  //             res.json({
  //                 message: "We sent you an email for email verification. Please confirm your email."
  //             });
  //             console.log("new user created", results);
  //           }
  //         });


  //         //2)Find the user_id from the user's email
  //         // connection.query(
  //         //   'SELECT * from users where email = ?',
  //         //   [req.body.email],
  //         //   function(error, userInfo, fields) {
  //         //     if (error) throw error;

  //         //     let query = 'SELECT * FROM crypto_info WHERE crypto_name IN (' + req.body.cryptoProfile.join() + ')';
  //         //     connection.query(query),
  //         //     function (error, cryptoInfo, fields) {
  //         //         if (error) console.log(error);
  //         //         console.log(cryptoInfo);
  //         //       }
  //         //     });


  //             //insert into users_cryptos table
  //             // connection.query('INSERT INTO users_cryptos (user_id, crypto_id) VALUES (?, ?)',
  //             // [userInfo.id, 'crypto_id'],
  //             // function (error, results, fields, next) {
  //             //   if (error) {
  //             //     res.send(error);
  //             //   } else {
  //             //     res.json({
  //             //         message: "We sent you an email for email verification. Please confirm your email."
  //             //     });
  //             //   }
  //             // });

  //           }
  //         );

  //       });
  //     });

  //   });

  //   bcrypt.genSalt(10, function(err, salt) {
  //           bcrypt.hash(req.body.password, salt, function(err, hash) {

  //             let users={
  //               "first_name":req.body.first_name,
  //               "last_name":req.body.last_name,
  //               "username": req.body.username,
  //               "email":req.body.email,
  //               "password": hash
  //               // "created":today,
  //               // "modified":today
  //             }

  //             // res.json(users);
  //             connection.query('INSERT INTO users SET ?',[users], function (error, results, fields, next) {
  //               if (error) {
  //                 console.log("error ocurred",error);
  //                 res.send({
  //                   "code":400,
  //                   "failed":"error ocurred"
  //                 })
  //               }

  //               res.json(results)

  //             });
  //   });

  // });

// });

// This doens't work the way it supposed to, yet. Will work on this next.
// I need to be able to insert info into two diffrent tables simultainously on formSubmit.

  //   let cryptos = req.body.cryptosProfile;
  //
  // connection.query('INSERT INTO cryptos_id SET ?',cryptos, function (error, results, fields, next) {
  //   if (error) {
  //     console.log("error ocurred",error);
  //     res.send({
  //       "code":400,
  //       "failed":"error ocurred"
  //     })
  //   }else{
  //     console.log('The solution is: ', results);
  //     // Redirect to next page (first user page).
  //     res.send({
  //       "code":200,
  //       "success":"user registered sucessfully"
  //         });
  //   }
  //   });

  // router.post('/login',login.login)
  // app.use('/api', router)

/*
Sendgrid Example. Wait for singup to be completed before this can be integrated
const msg = {
  to: 'simonnguyen3054@gmail.com',
  from: 'simon@acceptmycrypto.com',
  subject: 'Email Testing: Generated by our server',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
*/

module.exports = router;