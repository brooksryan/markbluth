var Firebase = require("firebase");
var ref = new Firebase("https://markbluth.firebaseio.com/visitors/");

function fireBaseCounter () {
  this.ref = new Firebase("https://markbluth.firebaseio.com/visitors/");
}


fireBaseCounter.prototype.getOldCountPromise = function(callback){

    // ref.once returns SNAPSHOT object of the values found at the
    // reference url "ref" and returns the value to a
    // callback function
    ref.once("value", function(snapshot) {

    //sets var theNewUserCount to equal the value found
    // at the reference URL at ref
      var theNewUserCount = snapshot.val();

    //logs the success of the function and returns the old object
      console.log('the read has started and the old count is', theNewUserCount);

    //starts the callback function with the object returned from
    //snapshot.val
      callback(theNewUserCount);

    //Handles errors
    },function (err) {
      callback(err);
    });
};

fireBaseCounter.prototype.increaseCountPromise = function (val,callback) {
      console.log("increaseCountPromise has started and the current count is", val);
      var thisOldCount = val.count+1;
      ref.set({count: thisOldCount},function(error){
        if (error) {
          callback(error);
        } else {
          console.log('the write has finished happening');
          callback(thisOldCount);
        }
      });
};

module.exports = {
  fireBaseCounter : new fireBaseCounter()
};
