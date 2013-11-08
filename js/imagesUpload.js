DJCADpersist.init("session");	//over-ride default so using session storage - change to suit


var Content = function (post) { // Content javasript object Contructor
	this.post = post;
};

$("#headlineText").on("keyup",function(e){
	//alert(e.target.value)
	$("#theHeading").text(e.target.value);
	
});


$("#dropImage").on("dragover",function(e) {
    e.stopPropagation();
    e.preventDefault();
  //  e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	});//end on drag over

$("#dropImage").on("drop",function(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.originalEvent.dataTransfer.files; // FileList object.
	
	if (files[0].type.match('image.*')) { //file is an image...
	
		var reader = new FileReader();

		reader.onload = function(e) {
				do {//generate unique page id
					newPageIndx = "page" + DJCADpersist.rndstr();		
					}
					while (!addPageIndex(newPageIndx)); //repeat until unique page string added
			
				persistContent(newPageIndx, new Content({
					pageRef: newPageIndx,
					imgSrc: e.target.result,
					headLineTxt: $("#headlineText").val()
					}));
					
					
				$("#testPage").attr("href", "page.html?page=" + newPageIndx);	
				$("#theImage").attr("src", e.target.result);
			
				};//end function onload
			
		// Read in the image file as a data URL.
		reader.readAsDataURL(files[0]);
		}//end if
});//end function ondrop