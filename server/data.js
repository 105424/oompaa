var Group = require('./objects/group').Group;
var Plusser = require('./objects/plusser').Plusser;

var plussers = new Array();
var groups = new Array();

this.load = function(){
	/*get users from database*/
	for (var i = 0; i < 100; i++) {
		addPlusser(new Plusser());
		addGroup(new Group());
	}
}

/*USERS*/
addPlusser = function(plusser){
	plusser.id = newID(plussers);
	plussers.push(plusser);

	return plusser.id;
}
exports.addPlusser = addPlusser;

getPlussers = function(){
	return plussers;
}
exports.getPlussers = getPlussers;

getPlusser = function(id){
	answer = false;
	plussers.forEach(function(plusser){
		if(plusser.id == id){
			answer = plusser;
		}
	});
	return answer;
}
exports.getPlusser = getPlusser;

/*GROUPS*/
addGroup = function(group){
	group.id = newID(groups);
	groups.push(group);
	return group.id;
}
exports.addGroup = addGroup;

getGroups = function(){
	return groups;
}
exports.getGroups = getGroups;

getGroup = function(id){
	answer = false;
	groups.forEach(function(group){
		if(group.id == id){
			answer = group;
		}
	});
	return answer;
}
exports.getGroup = getGroup;

addPlusserToGroup = function(group,plusser){
	var group = getGroup(group);
	var plusser = getPlusser(plusser);
	var doubleCheck = true;
	if(group && plusser){
		group.plussers.forEach(function(plus){
			if(plus.id == plusser.id){
				doubleCheck = false;
			}
		});
		if(doubleCheck){
			group.plussers.push(plusser);
			return true;
		}else{
			return false;
		}
	}
	return  false;
}
exports.addPlusserToGroup = addPlusserToGroup;

function newID(arr){
	var id = false;
	while(id == false){
		id = Math.floor((Math.random()*100000)+1);
		arr.forEach(function(item){
			if(item.id == id) id = false;
		});
	}
	return id;
}