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



var localStoreEnabled;
if (Modernizr.localstorage) {
 // alert("loacal storage is good!")
 localStoreEnabled = true;
 
} else {
  // no native support for HTML5 storage :(
  alert("no storage for web app is available. all added conted will be lost");
  localStoreEnabled = false;
}//end if else

function persist(page, c, n){
	if (localStoreEnabled) {
		// page is identify current page
		// c is the comment object to persist
		//n is the array index of the comment
		
		// ex format for key store is "page1.comment.0.text" (key) and store is any string e.g. "good posting..."
		//  key: "page1.comment.0.text" ->  "good posting..."
		//  key: "page1.comment.0.author" ->  "J Bloggs"
		//  key: "page1.comment.0.email" ->  "J.Bloggs@email.com"
		//  key: "page1.comment.0.date" ->  "GMT 25 Oct 2013 etc..."
		localStorage[page+".comment." + n + ".text"] = c.post.comment;
		localStorage[page+".comment." + n + ".author"] = c.post.author;
		localStorage[page+".comment." + n + ".email"] = c.post.email;
		localStorage[page+".comment." + n + ".date"] = c.post.datetime;
		
		localStorage[page + ".numComments"] = n;
	}//end if
	
}//end function


function restore(indx1, page) {
	
//	persist function had saved comment at array index in memory
//.. but mocked up comments in JS were not persisted, so array index out of sync potentially
// so beware the protocol is to save with the index actuall out of sync
// need to read from indx1 to indx2 and not from 0 which is the in memory first item
	
	// may have existing array mocked up. So those are not save in local storage
	// hence the array indexes saved may be 3,4,5,6 etc where 3 is index1 and 6 is index2
	// then add more comments from local storage to the array of comments in JS memory
	// beware then the indexes are out of sync so just use push() to add to array
	
	//hope it makes sense - undecided as I approached it...
	
	var indx2 = parseInt(localStorage[page + ".numComments"]);
	var c;
		
	if (indx2) {
	//	alert (indx2); 
	
	for (var n = indx1; n <= indx2; n++) { // for each stored comment on page
		
		c = new Comment({
			comment:  localStorage[page + ".comment." + n + ".text"],
			author:   localStorage[page + ".comment." + n + ".author"],
			email:    localStorage[page + ".comment." + n + ".email"],
			datetime: localStorage[page + ".comment." + n + ".date"]
		});
		comments[page].push(c); // add to array of comments
		
	}//end for
	
	}//end if
	
}//end function

