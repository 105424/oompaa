var Group = require('./objects/group').Group;
var Plusser = require('./objects/plusser').Plusser;
var Interest = require('./objects/interest').Interest;

var plussers = new Object();  // Stored by id
var groups = new Object();	 // Stored by id
var interests = new Object(); // Stored by name


var lastPlus = new Plusser({"firstName":"first"});
lastPlus.id = 1;
plussers[1] = lastPlus;

this.load = function(){
	/*get users from database*/
	for (var i = 0; i < 50; i++) {
		var plusser = addPlusser(new Plusser({"firstName":"mark"}));
		addGroup(new Group({'name':'test'},[plusser.id,lastPlus.id]));
		lastPlus = plusser;
	}
}


get = function(type,args){
	var arr;
	var answer;

	var isStringInt = parseInt(args);
	if(args == isStringInt) isStringInt == true;
	else isStringInt = false;

	switch(type){
		case "plussers": arr = plussers; break;
		case "groups": arr = groups; break;
		case "interests": arr = interests; break;
		default: return false;
	}
	if(args == undefined){
		console.log("no args");
		return arr;
	} 

	if(typeof args == 'string' && isStringInt == false){
		if(args == 'all'){
			return arr;
		}
		return false //"Invallid command";
	}	
	if(typeof args == 'number' || isStringInt){;
		if(arr[args]) return arr[args];
		else return false //"Incorect id";
	}
	if(typeof args == 'object'){
		if(Array.isArray(args)){
			args.forEach(function(i){
				answer.push(arr[i]);
			});
			return answer;
		}
	}

	return false //"Not found";
}
exports.get = get;

/*PLUSSERS*/
/*getPlussers = function(){ return plussers; }; exports.getPlussers = getPlussers;
getPlusser = function(id){ return plussers[id]; }; exports.getPlusser = getPlusser;*/

addPlusser = function(plusser){
	plusser.id = newId(plussers);
	plussers[plusser.id] = plusser;
	return plusser;
}
exports.addPlusser = addPlusser;

/*GROUPS*/
/*getGroups = function(){ return groups; }; exports.getGroups = getGroups;
getGroup = function(id){ return groups[id]; }; exports.getGroup = getGroup;*/

addGroup = function(group){
	group.id = newId(groups);
	groups[group.id] = group;
	for(key in group.owners){
		var plusser = get('plussers',group.owners[key]);
		plusser.groups.push(group.id);
	}
	return group;
}
exports.addGroup = addGroup;


/* INTEREST */
/*getInterests = function(){ return interests; }; exports.getGroups = getGroups;
getInterest = function(name){ return interests[name]; }; exports.getGroup = getGroup;*/

function addInterest(interest){
	interest.id = newId(interests);
	interests[interest.name] = interest;
	return interest.id;
}

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
	if(group && plusser){
		for(key in group.plussers){
			if(group.plussers[key] == plusser.id){
				doubleCheck = false;
			}			
		}
		if(doubleCheck){
			group.plussers.push(plusser.id);
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