var ref = new Firebase("https://markbluth.firebaseio.com/visitors/count");

document.addEventListener("DOMContentLoaded", function() {
});

ref.on("value", function(snapshot){
  var data = snapshot.val();
  var thisElement = document.getElementById("count");
  thisElement.innerHTML = data;
  console.log(data);
});

function upload (file) {

  //instantiates new form data to hand the request
  var FD = new FormData();

  //appends the binary image data to the request
  //SIDENOTE: UNSURE IF THIS IS NECESSARY
  FD.append('image', file);

  //instantiate the new XMLHttpRequest
  var httpRequest = new XMLHttpRequest();

  //logs the state change when returned by
  //ajax request
  httpRequest.onreadystatechange = function(){
    console.log(httpRequest.readyState);
  };

  //catches errors in request
  httpRequest.addEventListener("error", function(event) {
    alert('Oups! Something goes wrong.');
    console.log(event);
  });

  //Opens AJAX to imjur upload endpoint on API
  httpRequest.open('POST', 'https://api.imgur.com/3/image', true);

  //Sets authorization headers
  httpRequest.setRequestHeader('Authorization','Client-ID a03e22577c6d470');

  httpRequest.onload = function() {
    var link = JSON.parse(httpRequest.responseText).data.link;
    console.log(link);
  };

  //sends request with FD output as body
  httpRequest.send(FD);

}
