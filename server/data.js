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
	for (var i = 0; i < 50; i++) {
		var plusser = add('plussers', new objects.plusser({"firstName":"mark"}));
		add('groups', new objects.group({'name':'test'},[plusser.id,lastPlus.id]));
		lastPlus = plusser;

		add('interests', new objects.interest({"name":"TestInterest","Description":"This interest was created for testing only."},[plusser.id]));
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
			return false; //"get: Invallid command";
		}	

		if(typeof args == 'object'){
			if(Array.isArray(args)){
				var answer;
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

/*addPlusser = function(plusser){
	plusser.id = newId(plussers);
	plussers[plusser.id] = plusser;
	return plusser;
}
exports.addPlusser = addPlusser;


addGroup = function(group){

	group.id = newId(groups);
	groups[group.id] = group;
	for(key in group.owners){
		var plusser = get('plusser',group.owners[key]);
		plusser.groups.push(group.id);
	}
	return group;
}
exports.addGroup = addGroup;*/

/*addInterest = function(interest){
	interest.id = newId(interests);
	interests[interest.name] = interest;
	return interest.id;
}
exports.addInterest = addInterest;*/

/* CONNECTIONS */
addPlusserToGroup = function(group, plusser){
	
	if(!group || !plusser) return false;
	
	var doubleCheck = true;
	for(key in group.plussers){
		var plus = get('plussers',group.plussers[key]);
		if(plus.id == plusser.id){
			doubleCheck = false;
		}
	}

	if(doubleCheck){
		group.plussers.push(plusser.id);
		plusser.groups.push(group.id);
		return true;
	}
	return  false;
}
exports.addPlusserToGroup = addPlusserToGroup;

addInterestToPlusser = function(interest, plusser){
	var doubleCheck = true;
	if(interest && plusser){
		for(key in plusser.interests){
			if(plusser.interests[key] == interest.id){
				doubleCheck = false;
			}			
		}
		if(doubleCheck){
			plusser.interests.push(interest.id);
			interest.owners.push(plusser.id);
			return true;
		}
	}
	return  false;
}
exports.addInterestToPlusser = addInterestToPlusser;


function newId(arr){
	var id = false;
	while(id == false){
		id = Math.floor((Math.random()*100000)+1);
		for(var item in arr){
			if(item.id == id) id = false;
		}
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
		default: return false;
	}	
}
function isNumber(str){
	var parse = parseInt(str);
	if(str == parse) return true;
	else return false;
}