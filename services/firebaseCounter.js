var Firebase = require("firebase");
var ref = new Firebase("https://markbluth.firebaseio.com/visitors/");

function fireBaseCounter () {
  this.ref = new Firebase("https://markbluth.firebaseio.com/visitors/");
}


fireBaseCounter.prototype.getOldCountPromise = function(callback){
    ref.once("value", function(snapshot) {
      var theNewUserCount = snapshot.val();
      console.log('the read has started and the old count is', theNewUserCount);
      callback(theNewUserCount);
    },function (err) {
      callback(err);
    });
    return Promise;
};

fireBaseCounter.prototype.increaseCountPromise = function (val,callback) {
      console.log("increaseCountPromise has started and the current count is", val);
      var thisOldCount = val.count+1;
      ref.set({count: thisOldCount},function(error){
        if (error) {
          console.log(error);
          reject("Error in saving this data increaseCountPromise." + error);
        } else {
          console.log('the write has finished happening');

          callback(thisOldCount);
        }
      });
};

module.exports = {
  fireBaseCounter : new fireBaseCounter()
};
