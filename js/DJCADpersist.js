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

//////////////////////////////////////////////////////////////////////////////////


function persist(key,obj){
	if (localStoreEnabled) {
		// refactor completley as general case
		
		localStorage[key] = JSON.Stringify(obj);		
		
	}//end if
	
}//end function


function restore(key) {
if (localStoreEnabled) {
	
	var obj = JSON.parse(localStorage[key]);
	
	return obj;		
	
	}//end if
return false;
}//end function

