var objects = require('./objectHolder');

var database = new Object();

database['plussers'] = new Object();  // Stored by id
database['groups'] = new Object();	 // Stored by id
database['interests'] = new Object(); // Stored by id
database['videos'] = new Object(); // Stored by id
database['images'] = new Object(); // Stored by id

var lastPlus = new objects.plusser({"firstName":"first"});
lastPlus.id = 1;
database.plussers[1] = lastPlus;

var firstInterest = new objects.interest({"name":"first"});
firstInterest.id = 1;
database.interests[1] = firstInterest;


this.load = function(){
	/*get users from database*/
	for (var i = 0; i < 10; i++) {
<<<<<<< HEAD
		var plusser = add('plussers', new objects.plusser({"firstName":"Mark","lastName":"Arts","city":"Rotterdam","address":"Loydstraze 23","zipcode":"3827MG"}));
		add('groups', new objects.group({'name':'test',"description":"Dynamisch gemaakte content",'img':'http://static1.volkskrant.nl/static/photo/2012/17/6/2/20121009110943/media_xl_1382837.jpg'},[plusser.id,lastPlus.id]));
=======
		var plusser = add('plussers', new objects.plusser({"dob":"06-04-1923","firstName":"Mark","lastName":"Arts","city":"Rotterdam","address":"Loydstraze 23","zipcode":"3827MG"}));
		add('groups', new objects.group({'name':'test',"description":"Dynamisch gemaakte content"},[plusser.id,lastPlus.id]));
>>>>>>> 01ae4919003df439ab93c1fc8502d0f8409f5cff
		lastPlus = plusser;

		add('interests', new objects.interest({"name":"TestInterest","description":"This interest was created for testing only."},[plusser.id]));
	}
}

modify = function(type, id, adjustments){
	var arr = getArr(type);
	if(arr){
		var original = arr[id];
		if(original){
			jQuery.extend(original, adjustments);
			return original;
		}
		return false; // "Invalid id";
	}
	return false; // "Invalid type";
}
exports.modify = modify;

get = function(type,args,item){
	
	if(type==="all") return database;

	var arr = getArr(type);
	if(arr){

		if(args == undefined){
			return arr;
		} 

		if(isNumber(args)){;
				if(arr[args]){
					if(item == undefined){
						return arr[args];
					}else if(arr[args][item]){
						return arr[args][item];
					}
					else return false; //"get: No such item" 
				}
				else return false; //"get: Incorect id";
		}	

		if(typeof args == 'string'){
			if(args == 'all') return arr; 
			if(args == 'random'){
				var answer = new Array();
				for(var i = 0; i < item; i++){
					answer.push(arr[randomKey(arr)]);
				}
				return answer;
			}
			return false; //"get: Invallid command";
		}	

		if(typeof args == 'object'){
			if(Array.isArray(args)){
				var answer = new Array();
				args.forEach(function(i){
					answer.push(arr[i]);
				});
				return answer;
			}
		}

		return false; // "get: Not found";
	}
	return false; //"get: Invalid type";
}
exports.get = get;

add = function(type,obj){
	var arr = getArr(type);
	if (arr){
		obj.id = newId(arr);
		
		if(type == "groups"){
			for(key in obj.owners){
				var plusser = get('plussers',obj.owners[key]);
				plusser.groups.push(obj.id);
			}			
		}
		if(type == "interests"){
			for(key in obj.owners){
				var plusser = get('plussers',obj.owners[key]);
				plusser.interests.push(obj.id);
			}			
		}		

		arr[obj.id] = obj;
		return obj;
	}
	return "add: Invalid type";
}
exports.add = add;

link = function(obj1, obj2){
	if(obj1 && obj2)
	{
		if( hasId( obj1[obj2.type], obj2.id ) == false && hasId( obj2[obj1.type], obj1.id ) == false ) { // <-- check for duplicates
			try{
				obj1[obj2.type].push(obj2.id);
				obj2[obj1.type].push(obj1.id);

				return true;
			}
			catch(err){
				return false // "link: link could not be made";
			} 
		}
		else return false; // "link: link has already been (partly) made";
	}
	else return false; // "link: One of those ids doesnt exist";
}
exports.link = link;

search = function(type, args){
	var arr = getArr(type);
	var answer = new Object();
	if (arr){ // all objects
		for(key in arr){ //every object
			var obj = arr[key];
			for(key2 in obj){ //every item of object
				var item = obj[key2];
				if(typeof item == 'object'){
					for (key3 in item){ // every subitem of object
						if(typeof item[key3] == 'string'){
							if(containsString(item[key3], args))
								answer[obj.id] = obj;
						}
					}
				}else if(typeof item == 'string'){
					if(containsString(item, args))
						answer[obj.id] = obj;
				}
			}
		}
	}
	return answer
}
exports.search = search;

function newId(arr){
	var id = 1;
	var check = true; // <-- zorgt dat hij de while altijd 1 keer uitvoerd
	while(check == true){
		id = Math.floor((Math.random()*100000)+1);
		check = hasId(arr,id);
	}
	return id;
}

/* 
	It's possible to replace the calling of this function with database[type]
	but now all calls to the data are passed trough here and some kind of check is possible
*/
function getArr(type){

	switch(type){
		case "plussers": return database.plussers; break;
		case "groups": return database.groups; break;
		case "interests": return database.interests; break;
		case "videos": return database.videos; break;
		case "images": return database.images; break;
		default: return false;
	}	
}

function isNumber(str){
	var parse = parseInt(str);
	if(str == parse) return true;
	else return false;
}

function hasId(arr,id){
	if(Array.isArray(arr)){
		for(var item in arr){
			if(arr[item] == id) return true;
		}	
		return false;
	}
	else{
		if(arr[id] != undefined){
			return true;
		}
		return false;
	}
}

function randomKey(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function containsString(string,toContain){
	if(string.toLowerCase().indexOf(toContain.toLowerCase()) !== -1) return true;
	return false;
}