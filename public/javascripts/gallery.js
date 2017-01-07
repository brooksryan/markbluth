var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");

var imageLinkRef = new Firebase("https://markbluth.firebaseio.com/images");

imageLinkRef.orderByChild("timestamp").limitToLast(100).on("child_added", function(snapshot) {
    var newImageUrl = snapshot.val().imgUrl;

    var createDiv = document.createElement("div");

    var createImage = document.createElement("img");

    createImage.src = newImageUrl;

    createImage.onclick = function(){
	    modal.style.display = "block";
	    modalImg.src = newImageUrl;
	    captionText.innerHTML = this.alt;
	}

    var masterElement = document.getElementById("galleryDiv")

    masterElement.appendChild(createDiv);

    createDiv.appendChild(createImage);

    console.log(newImageUrl);
});

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}