var Group = require('./objects/group').Group;
var Plusser = require('./objects/plusser').Plusser;
var Interest = require('./objects/interest').Interest;

var plussers = new Object();  // Stored by id
var groups = new Object();	 // Stored by id
var interests = new Object(); // Stored by name



this.load = function(){
	/*get users from database*/
	for (var i = 0; i < 2; i++) {
		var plusser = addPlusser(new Plusser({"firstName":"mark"}));
		var obj = {};
		obj[plusser.id] = plusser;
		addGroup(new Group({'name':'test'},obj));
	}
}

/*PLUSSERS*/
getPlussers = function(){ return plussers; }; exports.getPlussers = getPlussers;
getPlusser = function(id){ return plussers[id]; }; exports.getPlusser = getPlusser;

addPlusser = function(plusser){
	plusser.id = newId(plussers);
	plussers[plusser.id] = plusser;
	return plusser;
}
exports.addPlusser = addPlusser;

/*GROUPS*/
getGroups = function(){
 return groups; 
}; exports.getGroups = getGroups;
getGroup = function(id){ return groups[id]; }; exports.getGroup = getGroup;

addGroup = function(group){
	group.id = newId(groups);
	groups[group.id] = group;
	for(key in group.owners){
		var plusser = group.owners[key];
		plusser.groups[group.id] = group;
	}
	return group;
}
exports.addGroup = addGroup;


/* INTEREST */
getInterests = function(){ return interests; }; exports.getGroups = getGroups;
getInterest = function(name){ return interests[name]; }; exports.getGroup = getGroup;

function addInterest(interest){
	interest.id = newId(interests);
	interests[interest.name] = interest;
	return interest.id;
}

/* CONNECTIONS */
addPlusserToGroup = function(group, plusser){
	var doubleCheck = true;

	for(key in group.plussers){
		var plus = group.plussers[key];
		if(plus.id == plusser.id){
			doubleCheck = false;
		}
	}
	if(doubleCheck){
		group.plussers[plusser.id] = plusser;
		return true;
	}
	return  false;
}
exports.addPlusserToGroup = addPlusserToGroup;

addInterestToPlusser = function(interest, plusser){
	var interest = getGroup(group.id);
	var plusser = getPlusser(plusser.id);
	var doubleCheck = true;
	if(group && plusser){
		for(key in group.plussers){
			if(group.plussers[key].id == plusser.id){
				doubleCheck = false;
			}			
		}
		if(doubleCheck){
			group.plussers.push(plusser);
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