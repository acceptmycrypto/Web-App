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

//cryptos list
router.get('/', function(req, res) {
  res.redirect('/cryptos');
});

router.get('/cryptos', function(req, res) {
  connection.query(
    'SELECT crypto_id, count(venue_id) as total FROM cryptos_venues GROUP BY crypto_id',
    function(err, venues_count, fields) {
      for (var i in venues_count) {
        connection.query(
          'UPDATE crypto_metadata SET ? WHERE ?',
          [
            { venues_count: venues_count[i].total },
            { id: venues_count[i].crypto_id }
          ],
          function(err, res) {
            if (err) {
              console.log(err);
            }
          }
        );
      }

      connection.query(
        'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name ORDER by venues_count DESC',
        function(err, data, fields) {
          res.render('pages/index', {
            cryptos: data
          });
        }
      );
    }
  );
});

//crypto detail
router.get('/cryptos/:crypto', function(req, res) {
  res.render('pages/crypto', {
    crypto: req.params.crypto
  });
});

//crypto search
router.post('/cryptos/search', function(req, res) {
  connection.query(
    'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name WHERE ?',
    req.body,
    function(err, data, fields) {
      if (data === undefined || data.length == 0) {
        res.redirect('/');
      } else {
        res.render('pages/index', {
          cryptos: data
        });
      }
    }
  );
});

module.exports = router;