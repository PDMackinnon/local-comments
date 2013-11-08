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

/*
	the DJCADpersist object below is intended to provide a uniform interface to storage of objects from a web app
	this is designed for prototyping and demo purposes, rather than production
	In the default config, localStorage API will be used
	Alternatively if you want SessionStorage, first call:

	DJCADpersist.init("session");

	or alternatively turn off the data persistance with:

	DJCADpersist.init("none");

	As yet no implementation for web storage so don't use that, or else implement the backend first... (noSQL perhaps ? MongoDB for example)

	to save an object:
	DJCADpersist.persist(key,obj);

	to restore the object:
	obj = DJCADpersist.restore(key);
	
*/

var DJCADpersist = {
	init: function(type) {
		if ((type == "local" && Modernizr.localstorage) || (type =="session" && Modernizr.sessionstorage) || type == "none" || type =="web") {
		this.persist = this[type].persist;	//strategy pattern
		this.restore = this[type].restore;
		}
		else {
		this.persist = this.none.persist;	//safe fail...
		this.restore = this.none.restore;
		}//end if else
		return this;
	},
	localStoreEnabled: Modernizr.localstorage, //alias to library that tests if API is enabled
	sessionStoreEnabled: Modernizr.sessionstorage, //alias to library that tests if API is enabled
	websqlStoreEnabled: Modernizr.websqldatabase, //alias to library that tests if API is enabled
	indexedDBStoreEnabled: Modernizr.indexeddb, //alias to library that tests if API is enabled
	
	local: {
		//////////////////////////////////////////////////////////
		persist: function(key,obj){
				localStorage[key] = JSON.stringify(obj);		
		},//end function


		restore: function(key) {
			var k = localStorage[key];
			var obj;
			if (k) { obj = JSON.parse(k); }
			return obj;		
		}//end function
		
	},
	session: {
		//////////////////////////////////////////////////////////
		persist: function(key,obj){		
				sessionStorage[key] = JSON.stringify(obj);			
		},//end function


		restore: function(key) {
			var k = sessionStorage[key];
			var obj;
			if (k) { obj = JSON.parse(k); }
			return obj;			
		}//end function
		
	},
	none: {
		persist: function(key,obj){}, //nothing
		restore: function(key) {}
		
	},
	web: {
		//TODO
		persist: function(key,obj){}, //nothing yet ...
		restore: function(key) {}
	},
	rndstr: function()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}
}.init("local");

////////////////////////////////////////////////////////////

