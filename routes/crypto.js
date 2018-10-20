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

router.get('/crypto/comments', function (req,res) {
    connection.query(
        'SELECT * FROM crypto_comments LEFT JOIN parents_children ON crypto_comments.id = parents_children.comment_child_id ORDER BY date_commented',
        function(err, data) {
            if (err){
                console.log("error during select query");
                console.log(err);
            } else {
                console.log("data from select query");
                console.log(data);
                let assembledData = assembleComments(data);
                res.json(assembledData);
            }
        }
    )
})

router.post('/crypto/submit-comment', function (req, res){
    console.log("req.body");
    console.log(req.body);
    connection.query(
        'INSERT INTO crypto_comments SET ?',
        req.body,
        function (err, insertData){
            if (err){
                console.log("error during submit query");
                console.log(err);
            } else {
                console.log("data from submit query");
                console.log(insertData);
                connection.query(
                    'SELECT * FROM crypto_comments LEFT JOIN parents_children ON crypto_comments.id = parents_children.comment_child_id ORDER BY date_commented',
                    function (err, data){
                        if (err){
                            console.log("error during select query");
                            console.log(err);
                        } else {
                            console.log("data from select query");
                            console.log(data);
                            let assembledData = assembleComments(data);
                            res.json(assembledData);
                        }
                    }
                )
            }
        }
    )
})

router.post('/crypto/delete-comment', function (req, res){
    console.log("req.body");
    console.log(req.body);
    //does not actually delete comment, but changes the comment state to deleted
    connection.query(
        'UPDATE crypto_comments SET ? WHERE ?',
        [{comment_status: "deleted", points:0},{id:req.body.id}],
        function (err, delete1){
            if (err){
                console.log("error during delete");
                console.log(err);
            } else {
                connection.query(
                    'SELECT * FROM crypto_comments LEFT JOIN parents_children ON crypto_comments.id = parents_children.comment_child_id ORDER BY date_commented',
                    function(err, data) {
                        if (err){
                            console.log("error during select query after delete");
                            console.log(err);
                        } else {
                            console.log("data from select query after delete");
                            console.log(data);
                            let assembledData = assembleComments(data);
                            res.json(assembledData);
                        }
                    }
                )
            }
        }
    )
})



assembleComments = (data) => {
    //function to take query result from mysql and turn it into data that can be directly set into state when returned
    let allComments = [];
    let id, user_id, crypto_id, body, date_commented, comment_status, points, x;
    let children = [];
    for (x of data) {//cycle thru all returned comments
        ({id, user_id, crypto_id, body, date_commented, comment_status, points} = x);
        if (x.comment_parent_id==null) {//if comment does not have parent id, this comment is a parent itself, therefore append to allComments
            allComments = [...allComments,{id, user_id, crypto_id, body, date_commented, comment_status, points, children:[]}];
        } else {//if comment has parent id, this comment is a child, therefore update the appropriate parent comment's "children" key
            allComments = allComments.map(y => {
                if (y.id===x.comment_parent_id){
                    return ({
                        id:y.id,
                        user_id:y.user_id,
                        crypto_id:y.crypto_id,
                        body:y.body,
                        date_commented:y.date_commented,
                        comment_status:y.comment_status,
                        points:y.points,
                        children:[...y.children,{id, user_id, crypto_id, body, date_commented, comment_status, points, children:[]}]
                    });
                } else {
                    return y;
                }
            })
        }
    }
    console.log(allComments);
    return ({allComments});
}


module.exports = router;