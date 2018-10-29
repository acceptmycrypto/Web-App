var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); //generates uuid for us
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
      // if (result) return res.status(404).json({ error: 'User already exists' });
      console.log("successfully query", result);

      bcrypt.genSalt(10, function(err, salt) {

        bcrypt.hash(req.body.password, salt, function(err, password_hash) {

//1) insert into users table
          connection.query('INSERT INTO users (email, password, username, email_verification_token) VALUES (?, ?, ?, ?)',
          [req.body.email, password_hash, req.body.username, uuidv4()],
          function (error, results, fields) {
            if (error) {
              console.log(error)
            } else {
              //send a notificiation to the client side to let user verify their email
              res.json({
                  message: "We sent you an email for email verification. Please confirm your email."
              });

              //query the new inserted user to get the user-id and email verification code
              connection.query(
                'SELECT * FROM users WHERE email = ?',
                [req.body.email],
                function(error, result, fields) {
                  if (error) throw error;
                   //use sendgrid to send email
                  const email_verification = {
                    to: req.body.email,
                    from: 'simon@acceptmycrypto.com',
                    subject: 'Please click the link below to verify your email!',
                    text: 'Thank You for signing up! Go to this url to complete the registration.',
                    html: `<a href="http://localhost:3001/email-verify/${result.id}/${result.email_verification_token}>Verify My Email</a>`
                  };
                  sgMail.send(email_verification);
                }
              );

              //Once the user clicks on the email verification, we get the id and email verification params
              router.get('/email-verify/:user_id/:email_verification_token', function(req, res) {
                console.log("params: ", req.params);
                connection.query(
                  'SELECT * FROM users WHERE id = ?',
                  [req.params.user_id],
                  function(error, result, fields) {
                    if (error) throw error;

                    //if user is verified already then send a message to user that the account is verified
                    if (result.verified_email === 1) {
                      res.json("Your email has been verified, please login.")
                    }

                    //update verified email to true
                    connection.query(
                      'UPDATE users SET ? WHERE ?',
                      [{verified_email: 1}, {id: req.params.user_id}],
                      function(error, results, fields) {
                        if (error) throw error;
                        res.json(results); //Redirect user to the matched deal page
                        //TODO: rediect user to the matched deal page
                      }
                    );

                  }
                );
              });

              console.log("new user created", results);
            }
          });

//2) insert selected cryptos into users_cryptos table
        //========================================================
        //TODO Insert the selected cryptos to users_cryptos table

        });//bcrypt.hash closing bracket

      }); //bcrypt.getsalt closing bracket

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