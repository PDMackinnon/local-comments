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


function persist(page, c, n){

// page is identify current page
// c is the comment object to persist
//n is the array index of the comment
		
// ex format for key store is "page1.comment.0" - comment object for array index 0

//to save an object:
//					DJCADpersist.persist(key,obj);
	
DJCADpersist.persist(page + ".comment." + n, c);
		
DJCADpersist.persist(page + ".numComments", n);
	
}//end function


function restore(indx1, page) {
	
// may have existing array mocked up. So those are not saved in DJCADpersist store
// hence the array indexes saved may be 3,4,5,6 etc where 3 is index1 and 6 is index2
// then add more comments from storage to the array of comments in JS memory
	
// to restore the object:
//							obj = DJCADpersist.restore(key);
	
var indx2 =  DJCADpersist.restore(page + ".numComments");
	
	if (indx2) {
	
		for (var n = indx1; n <= indx2; n++) { // for each stored comment on page
				comments[page].push(DJCADpersist.restore(page + ".comment." + n));	//just restore saved object
				}//end for
	
	}//end if
	
}//end function

