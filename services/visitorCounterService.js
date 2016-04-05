// Deprecated -> now use firebaseCounter.js

var express = require('express');
var path = require('path');

function counter (){

  this.count = 0;

}

counter.prototype.incrementCounterUp = function () {
    this.count++;
};

counter.prototype.logCounter = function () {
    console.log(this.count);
};

module.exports = {
  counter : new counter()
};
