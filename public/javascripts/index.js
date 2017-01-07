// establishes a connection to firebase "count"
var ref = new Firebase("https://markbluth.firebaseio.com/visitors/count");

//establishes a connection to firebase "images"
var imageLinkRef = new Firebase("https://markbluth.firebaseio.com/images");

//when the data at the firebase link location changes
//change the value of the "count" element in the HTML
//keeping this number as the most updated and live changes
ref.on("value", function(snapshot){
    var data = snapshot.val();
    var thisElement = document.getElementById("count");
    thisElement.innerHTML = data;
    console.log(data);
});

//file upload function
/**
 * @param  {file} imageFile - image file to be uplaoded
 * @return {[type]}
 */
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
        alert('Oops! Something goes wrong.');
        console.log(event);
    });

    //Opens AJAX to imjur upload endpoint on API
    httpRequest.open('POST', 'https://api.imgur.com/3/image', true);

    //Sets authorization headers
    httpRequest.setRequestHeader('Authorization','Client-ID a03e22577c6d470');

    //when the request has finished logs the link to
    //the image uploaded.
    //Function also saves the img url to firebase once
    //it receives it
    httpRequest.onload = function() {
        var link = JSON.parse(httpRequest.responseText).data.link;
        console.log(link);

        //saves the image url to firebase
        saveImageUrlToFirebase (link);

        //sets the image in the webpage to the image just
        //uploaded
        replaceCurrentImage(link);

    };

  //sends request with FD output as body
  httpRequest.send(FD);

}

//pushes the new image url retreived from imgur
//to the firebase reference /images and applies
//a timestamp for ordering
function saveImageUrlToFirebase (imgUrl) {
    imageLinkRef.push({
        imgUrl: imgUrl,
        timestamp: Firebase.ServerValue.TIMESTAMP,
    });
}

//retreives the image at pictureOfMark with the most
//recent picture of mark received by the firebase databse
imageLinkRef.orderByChild("timestamp").limitToLast(1).on("child_added", function(snapshot) {
    var newImageUrl = snapshot.val().imgUrl;
    replaceCurrentImage(newImageUrl);         //uses current image to replace
                                            //image ofr mark in dom
});

//gets the picture of mark image tag and
//replaces it with the provided url
function replaceCurrentImage (imgUrl) {
    document.getElementById("pictureOfMark").src = imgUrl;
}
