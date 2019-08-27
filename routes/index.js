var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Connect to DB
// mongoose.connect(
//     process.env.DB_CONNECTION,
//     { useNewUrlParser: true },
//     () => {console.log('Conneted to DB')})


module.exports = router;
