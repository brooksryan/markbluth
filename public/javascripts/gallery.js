var imageLinkRef = new Firebase("https://markbluth.firebaseio.com/images");

imageLinkRef.orderByChild("timestamp").limitToLast(100).on("child_added", function(snapshot) {
    var newImageUrl = snapshot.val().imgUrl;

    var createImage = document.createElement("img");

    createImage.src = newImageUrl;

    var masterElement = document.getElementById("galleryDiv")

    masterElement.appendChild(createImage);

    console.log(newImageUrl);         //uses current image to replace
                                            //image ofr mark in dom
});