var express = require('express');
var router = express.Router();
var getYearWiseData = require('../utilities/apiHelpers').getYearWiseData;
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getYearWiseData', function(req, res, next) {
  getYearWiseData().then(function (data) {
    res.send(data);
  })
});


module.exports = router;
