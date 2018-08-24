var express = require('express');
var app = express();
var request = require('request');
var async = require('async');

//pass options as a param to request
var options = [
  {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    qs: {
      symbol: 'BTC,ETH,LTC'
    },
    headers: {
      'X-CMC_PRO_API_KEY': '0972c733-b48c-4f2e-8da9-21e39cff4fc9',
      Accept: 'application/json'
    }
  },
  {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      limit: '10',
      convert: 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': '0972c733-b48c-4f2e-8da9-21e39cff4fc9',
      Accept: 'application/json'
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
      console.log(err);
    } else {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].data);
      }
    }
  }
);

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(3000, function() {
  console.log('listening on 3000');
});
