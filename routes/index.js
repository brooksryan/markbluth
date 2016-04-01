var express = require('express');
var router = express.Router();
var counter = require('../services/visitorCounterService');
var thisCounter = counter.counter;

/* GET home page. */
router.get('/', function(req, res, next) {
  thisCounter.incrementCounterUp();
  thisCounter.logCounter();
  res.currentCount = thisCounter.count
  next();
},
function(req, res, next){
  res.render('index', {
    title: 'Mark is our friend',
    count: res.currentCount
 });
});

module.exports = router;
