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



var Comment = function (post) { // Comment javasript object Contructor
	this.post = post;
};

var comments = { //initialise object
	index: [],
	page2: []
	
};


//put in dummy data for prototyping purposes:

comments["index"][0] = new Comment({
	author: "Joe Bloggs",
	email: "J.Bloggs@example.com",
	comment: "I really liked this post. It is the best thing I have seens for a while",
	datetime: new Date()
});

comments["index"].push(new Comment({
	author: "Another Blogger",
	email: "A.Bogger@blog.com",
	comment: "I like the post too. Its great!",
	datetime: new Date()
}));

comments["page2"][0] = new Comment({
	author: "Joe Bloggs",
	email: "J.Bloggs@example.com",
	comment: "Can't get enough of these mad hatters",
	datetime: new Date()
});


//get all stored comments:
restore(2,"index");	// 2 because there are 2 dummy comments above (index page)
restore(1,"page2"); // 1 for same reason above (page2)

$(function() { // this jquery closure ensures all contained will execute only after the page is 'ready'

var p = $("#commentsSection")[0].dataset.page; //gets page as string using data- attribute


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