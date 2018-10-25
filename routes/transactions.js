var express = require("express");
var app = express();
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
//coinpayment
var Coinpayments = require("coinpayments");
var keys = require("../key");
var client = new Coinpayments(keys.coinpayment);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

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

// api
//get list of transactions that are shared to the community and have received the payment.
//info we need to send to the client: the deal name, the user name, the crypto symbol, the venue name, date purchased
router.get("/api/transactions/community/payment_received", function(req, res) {
  connection.query(
    "SELECT users_purchases.date_purchased, users_purchases.amount, deals.deal_name, users.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = users.id WHERE permission = ? AND payment_received = ?",
    ["community", 1], //1 is true for payment received //community means any user on acceptmycrypto platform
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//coinpayment
router.post("/checkout", function(req, res) {
  //Inserting to user_purchases table, this doens't mean purchase is successful
  //Need to listen to IPA when payment has recieved and then update payment_recieved to true

  client.createTransaction(
    {
      currency1: "USD",
      currency2: req.body.crypto_name, // The currency the buyer will be sending.
      amount: req.body.amount // Expected amount to pay, where the price is expressed in currency1
    },
    function(err, paymentInfo) {
      if (err) {
        console.log("coinpayment error: ", err);
      } else {
        //send the paymentInfo to the client side
        res.json(paymentInfo);

        connection.query(
          "INSERT INTO users_purchases SET ?",
          {
            user_id: req.body.user_id,
            deal_id: req.body.deal_id,
            crypto_name: req.body.crypto_name,
            amount: paymentInfo.amount,
            txn_id: paymentInfo.txn_id, //coinpayment transaction address
            address: paymentInfo.address, //coinpayment temporary address
            confirms_needed: paymentInfo.confirms_needed,
            timeout: paymentInfo.timeout, //in seconds
            status_url: paymentInfo.status_url,
            qrcode_url: paymentInfo.qrcode_url
          },
          function(err, transactionInitiated) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
