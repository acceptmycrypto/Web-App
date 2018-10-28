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

// api
router.get('/api/deals', function(req, res) {
  connection.query(
    'SELECT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, venues.venue_name, venues.venue_link FROM deals LEFT JOIN venues ON deals.venue_id = venues.id',
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//get a deal_item api
router.get('/api/deals/:deal_name', function(req, res) {
  //Equal%20Exchange%20Organic%20Love%20Buzz
  connection.query(
    'SELECT * FROM deal_images LEFT JOIN deals ON deals.id = deal_images.deal_id LEFT JOIN venues ON deals.venue_id = venues.id WHERE ?',
    [req.params],
    function(error, deal_images_result, fields) {
      if (error) throw error;

      let newDealItem = [];
      let images = [];

      //find images in the objects and add to images array
      for (let i in deal_images_result) {
        images.push(deal_images_result[i].deal_image);
      }

      //since every object in the array is the same, we just use the first object in the array
      //reassign the deal_image property to images array
      deal_images_result[0].deal_image = images;

      //push the first object into an emptry array so we can use it on the client side for mapping
      newDealItem.push(deal_images_result[0]);
     
      res.json(newDealItem);
    }
  );
});

module.exports = router;
