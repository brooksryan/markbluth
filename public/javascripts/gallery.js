var imageLinkRef = new Firebase("https://markbluth.firebaseio.com/images");

imageLinkRef.orderByChild("timestamp").limitToLast(100).on("child_added", function(snapshot) {
    var newImageUrl = snapshot.val().imgUrl;

    var createDiv = document.createElement("div");

    var createImage = document.createElement("img");

    createImage.src = newImageUrl;

    var masterElement = document.getElementById("galleryDiv")

    masterElement.appendChild(createDiv);

    createDiv.appendChild(createImage);

    console.log(newImageUrl);
});