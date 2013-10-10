var objects = require('./objectHolder');

var plussers = new Object();  // Stored by id
var groups = new Object();	 // Stored by id
var interests = new Object(); // Stored by id
var videos = new Object(); // Stored by id
var images = new Object(); // Stored by id

var lastPlus = new objects.plusser({"firstName":"first"});
lastPlus.id = 1;
plussers[1] = lastPlus;

this.load = function(){
	/*get users from database*/
	for (var i = 0; i < 50; i++) {
		var plusser = add('plusser', new objects.plusser({"firstName":"mark"}));
		add('group', new objects.group({'name':'test'},[plusser.id,lastPlus.id]));
		lastPlus = plusser;
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

get = function(type,args){
	var arr = getArr(type);
	if(arr){

		if(args == undefined){
			return arr;
		} 

		if(isNumber(args)){;
			if(arr[args]) return arr[args];
			else return false ;//"Incorect id";
		}	

		if(typeof args == 'string'){
			if(args == 'all') return arr; 
			return false; //"Invallid command";
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

		return false; //"Not found";
	}
	return false; // "Invalid type";
}
exports.get = get;

add = function(type,obj){
	var arr = getArr(type);
	if (arr){
		obj.id = newId(arr);
		
		if(type="group"){
			for(key in obj.owners){
				var plusser = get('plusser',obj.owners[key]);
				console.log(obj);
				plusser.groups.push(obj.id);
			}			
		}

		arr[obj.id] = obj;
	}
	return false // Invalid type
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

addInterest = function(interest){
	interest.id = newId(interests);
	interests[interest.name] = interest;
	return interest.id;
}
exports.addInterest = addInterest;

/* CONNECTIONS */
addPlusserToGroup = function(group, plusser){
	
	if(!group || !plusser) return false;
	
	var doubleCheck = true;
	for(key in group.plussers){
		var plus = get('plusser',group.plussers[key]);
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
	if(group && plusser){
		for(key in plusser.interests){
			if(plusser.interests[key] == interests.name){
				doubleCheck = false;
			}			
		}
		if(doubleCheck){
			plusser.interests.push(plusser.name);
			return true;
		}
	}
	return  false;
}
exports.addPlusserToGroup = addPlusserToGroup;


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

function getArr(type){
	switch(type){
		case "plusser": return plussers; break;
		case "group": return groups; break;
		case "interest": return interests; break;
		default: return false;
	}	
}
function isNumber(str){
	var parse = parseInt(str);
	if(str == parse) return true;
	else return false;
}