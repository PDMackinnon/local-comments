/*
Copyright 2013 Paul Mackinnon, Dundee University

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


DJCADpersist.init("session");	//over-ride default so using session storage - change to suit

//DJCADpersist.init("local");	// this is default...

var Content = function (post) { // Content javasript object Contructor
	this.post = post;
};

var Comment = function (post) { // Comment javasript object Contructor
	this.post = post;
};

var contents = { //initialise object
};


//Content hard coded:  (this time hard code into storage right away...)

persistContent("page1", new Content({
	pageRef: "page1",
	imgSrc: "images/alice_cheshire_cat.png",
	headLineTxt: "Comments Please!!!"
}));

persistContent("page2", new Content({
	pageRef: "page2",
	imgSrc: "images/mad-hatter.png",
	headLineTxt: "Mad Hatter !!!"
}));

addPageIndex("page1");	//persist the set of pages
addPageIndex("page2");


// same as prev version....
// comments hard coded:
var comments = { //initialise object
	page1: [],
	page2: [],
	page3: []
	
};


//put in dummy data for prototyping purposes:

comments["page1"].push(new Comment({
	author: "Joe Bloggs",
	email: "J.Bloggs@example.com",
	comment: "I really liked this post. It is the best thing I have seens for a while",
	datetime: new Date()
}));

comments["page1"].push(new Comment({
	author: "Another Blogger",
	email: "A.Bogger@blog.com",
	comment: "I like the post too. Its great!",
	datetime: new Date()
}));

comments["page2"].push(new Comment({
	author: "Joe Bloggs",
	email: "J.Bloggs@example.com",
	comment: "Can't get enough of these mad hatters",
	datetime: new Date()
}));







//get stored page of content:

//using url query string to send the page ref to the code here e.g. file://index.html?page="page1"
// would give below page = "page1"
var page = window.location.search.substring(1).split("=")[1]; //obtains page ref from url query

restoreContent(page);

//get all stored comments:
restore(2,"page1");	// 2 because there are 2 dummy comments above (page1)
restore(1,"page2"); // 1 for same reason above (page2)

restore(0,"page3");  //temp test page3


if (["page1","page2","page3"].indexOf(page) == -1) {// page is not one of these mockups
comments[page] = []; //init comments array
restore(0,page);  //actual user page we are on - not mocked up comments
}



$(function() { // this jquery closure ensures all contained will execute only after the page is 'ready'

var p = window.location.search.substring(1).split("=")[1]; //obtains page ref from url query

//display content 

// theHeading
$("#theHeading").text(contents[p].post.headLineTxt);

// theImage
$("#theImage").attr("src",contents[p].post.imgSrc);


//init variables:
var newComment;
var newCommentContent;
var newCommentAuthor;
var newCommentDate;
var newCommentEmail;

// now the pre saved comments:
for (var i = 0; i < comments[p].length ;i++){
	newComment = $("<div class='comment' />");

	newCommentContent = $("<p class='commentText' />");
	newCommentAuthor = $("<p class='commentAuthor' />");
	newCommentDate = $("<p class='commentDate' />");
	newCommentEmail = $("<p class='commentEmail' />");
	
	newCommentContent.html(comments[p][i].post.comment);
	newCommentAuthor.html(comments[p][i].post.author);
	newCommentEmail.html(comments[p][i].post.email);
	newCommentDate.html(comments[p][i].post.datetime);

	newComment.append([newCommentContent,newCommentAuthor,newCommentEmail,newCommentDate]);
	
	$("#comments").prepend(newComment);
	
}//end for



//add event handlers - 
$("#submitComment").on("click",function(e){
	
	var c = new Comment({
	author: $("#newAuthor").val(),
	email: $("#newEmail").val(),
	comment: $("#newComment").val(),
	datetime: new Date()
	})
	
comments[p].push(c);


//IMPORTANT! persists the comment - see persist.js
//+++++++++++++++++++++++++++++++++++++++++++++++
//
var arrayInx = comments[p].length-1; //curent array index of comment inserted
persist(p, c, arrayInx);

//+++++++++++++++++++++++++++++++++++++++++++++++

		
newComment = $("<div class='comment' />");

newCommentContent = $("<p class='commentText' />");
newCommentAuthor = $("<p class='commentAuthor' />");
newCommentDate = $("<p class='commentDate' />");
newCommentEmail = $("<p class='commentEmail' />");

newCommentContent.html(c.post.comment);
newCommentAuthor.html(c.post.author);
newCommentEmail.html(c.post.email);
newCommentDate.html(c.post.datetime);

newComment.append([newCommentContent,newCommentAuthor,newCommentEmail, newCommentDate]);

$("#comments").prepend(newComment);

//clear form fields:
$("#newAuthor").val("");
$("#newEmail").val("");
$("#newComment").val("");

	
});


});//end onReady