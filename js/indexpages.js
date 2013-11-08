



contents=[];


$(function() { // this jquery closure ensures all contained will execute only after the page is 'ready'


var pageIndxs = getPageIndexs(); //should be an object

var pageListItem;
var img;
var anchor;
var span;

for (p in pageIndxs) {
	
	restoreContent(p);
		
	img = $("<img border='0' height='60'>").attr("src", contents[p].post.imgSrc);


	span=$("<span>").append(img).append(contents[p].post.headLineTxt);
	anchor = $("<a></a>").attr("href", "page.html?page=" + p).append(span);
	pageListItem = $("<li></li>").append(anchor);

	$("#pageList").append(pageListItem);
}


});//end onReady