var ref = new Firebase("https://markbluth.firebaseio.com/visitors/count");

document.addEventListener("DOMContentLoaded", function() {
  var thisElement = document.getElementById("facebookLogin");
  thisElement.onclick = function(){alert("this is an alert");};
});

ref.on("value", function(snapshot){
  var data = snapshot.val();
  var thisElement = document.getElementById("count");
  thisElement.innerHTML = data;
  console.log(data);
})
