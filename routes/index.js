var express = require('express');
var router = express.Router();
var thisFirebaseCounter = require('../services/firebaseCounter');
var thisNewFirebaseCounter = thisFirebaseCounter.fireBaseCounter;

/* GET home page. */
router.get('/', function(req, res, next) {
  thisNewFirebaseCounter.getOldCountPromise(function(val) {
    console.log(val);
    thisNewFirebaseCounter.increaseCountPromise(val, function(finalMessage) {
      res.currentCount = finalMessage;
      console.log(finalMessage);
      next();
    });
  });
},

function(req, res, next) {
  res.render('index', {
    title: 'Mark is our friend',
    count: res.currentCount
  });
});

// GET gallery //
router.get('/gallery', function(req, res, next) {
  res.render('gallery', {
    title: 'Mark is our friend',
    count: res.currentCount
  });
});



module.exports = router;