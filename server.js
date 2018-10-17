require("dotenv").config();

var express = require("express");
var app = express();
var mysql = require("mysql");
var request = require("request");
var async = require("async");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var flash = require("express-flash");
var path = require("path");
//use session
var cookieParser = require("cookie-parser");
var session = require("express-session");
//coinpayment
var Coinpayments = require("coinpayments");
var keys = require("./key");
var client = new Coinpayments(keys.coinpayment);

//allow the api to be accessed by other apps
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

//routers
var adminRoutes = require("./routes/admin.js");
var venueRoutes = require("./routes/venue.js");
var cryptoRoutes = require("./routes/crypto.js");
var apiRoutes = require("./routes/api.js");
var supportRoutes = require("./routes/support.js");
var userProfileRoutes = require("./routes/user_profile.js");
var matchedFriendsRoutes = require("./routes/matched_friends.js");
var dealsRoutes = require("./routes/deals.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: "app",
    cookie: { maxAge: 60000 }
  })
);
app.use(flash());
app.use("/", adminRoutes);
app.use("/", venueRoutes);
app.use("/", cryptoRoutes);
app.use("/", apiRoutes);
app.use("/", supportRoutes);
app.use("/", userProfileRoutes);
app.use("/", matchedFriendsRoutes);
app.use("/", dealsRoutes);

path.join(__dirname, "public");

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

//pass options as a param to request
var options = [
  {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
    qs: {
      symbol: "BTC,ETH,LTC,BCH,DASH,ETC,DOGE,XRP,XVG,XMR"
    },
    headers: {
      "X-CMC_PRO_API_KEY": "0972c733-b48c-4f2e-8da9-21e39cff4fc9",
      Accept: "application/json"
    }
  },
  {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
      symbol: "BTC,ETH,LTC,BCH,DASH,ETC,DOGE,XRP,XVG,XMR"
    },
    headers: {
      "X-CMC_PRO_API_KEY": "0972c733-b48c-4f2e-8da9-21e39cff4fc9",
      Accept: "application/json"
    }
  }
];

//use aynch to map two request ojects and return all results in one callback
async.map(
  options,
  function(obj, callback) {
    // iterator function
    request(obj, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // transform data here or pass it on
        var body = JSON.parse(body);
        callback(null, body);
      } else {
        callback(error || response.statusCode);
      }
    });
  },
  function(err, results) {
    // all requests have been made
    if (err) {
      // console.log(err);
    } else {
      var coin_info = results[0].data;
      var coin_metadata = results[1].data;

      for (var i in coin_metadata) {
        var crypto_name = coin_metadata[i].name;
        var crypto_symbol = coin_metadata[i].symbol;
        var crypto_price = coin_metadata[i].quote.USD.price;

        connection.query(
          "INSERT INTO crypto_metadata SET ?",
          {
            crypto_name: crypto_name,
            crypto_symbol: crypto_symbol,
            crypto_price: crypto_price
          },
          function(err, res) {
            if (err) {
              // console.log(err);
            }
          }
        );
      }

      for (var j in coin_info) {
        var crypto_site = coin_info[j].urls.website[0];
        var crypto_logo = coin_info[j].logo;
        var crypto_metadata_name = coin_info[j].name;
        connection.query(
          "INSERT INTO crypto_info SET ?",
          {
            crypto_logo: crypto_logo,
            crypto_link: crypto_site,
            crypto_metadata_name
          },
          function(err, res) {
            if (err) {
              // console.log(err);
            }
          }
        );
      }
    }
  }
);

// set the view engine to ejs
app.set("view engine", "ejs");

//get list of checkouts
app.get('/api/checkout', function(req, res) {
  connection.query(
    'SELECT * FROM users_purchases',
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//coinpayment
app.post("/checkout", function(req, res) {
  console.log("deal_info", req.body);
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
        'INSERT INTO users_purchases SET ?',
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
            console.log(err)
          }
        })
      }
    }
  );
});

//Heroku tells us which port our app to use. For production, we use Heroku port. For development, we use 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("Backend server is listening on 3001");
});
