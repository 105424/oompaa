$(document).ready(function(){
	getGroups(5);
	getPlussers(5);
	getGroupFromId(614);
	getPlusserFromId(1);

	$('#buttonG').click(function(){
		getGroups($('#amountG').val());
	});

	$('#buttonP').click(function(){
		getPlussers($('#amountP').val());
	});

	$('#buttonF').click(function(){
		getGroupFromId($('#amountF').val());
	});	
	$('#buttonH').click(function(){
		getPlusserFromId($('#amountH').val());
	});	
	$('#buttonI').click(function(){
		addPlusserToGRoup($('#amountIa').val(),$('#amountIb').val())
	});

});

function getGroups(amount){
	var html = $("#groups");

	html.fadeOut(function(){
		html.empty();
		$.get( "http://www.thomassio.nl:2001/groups").done(function(data){
			var i = 0;
			$.each(data,function(key,group){

				if(i >= amount){
					return
				}

				html.append("<div class='group'>"+group.id+" : "+group.name+"</div>");
				i++;
			});
		});
	});
	html.fadeIn();
}

function getPlussers(amount){
	var html = $("#plussers");

	html.fadeOut(function(){
		html.empty();
		$.get( "http://www.thomassio.nl:2001/plussers").done(function(data){
			var i = 0;
			$.each(data,function(key,plusser){

				if(i >= amount){
					return
				}

				html.append("<div class='plusser'>"+plusser.id+" : "+plusser.lastName+" : "+plusser.firstName+"</div>");
				i++;
			});
		});
	});
	html.fadeIn();
}

function getGroupFromId(id){
	var html = $("#groupF");

	html.fadeOut(function(){
		html.empty();
		$.get( "http://www.thomassio.nl:2001/groups/"+id).done(function(data){

			html.append("<div class='plus'>"+data.id+" : "+data.name+"</div>");

			html.find(".plus").append("<ul></ul>");

			$.each(data.plussers, function(key,value){
				console.log(value);
				html.find(".plus").find("ul").append(
					"<li>"+key+
					" id: "+value+"</li>"
				);
			});
		});
	});
	html.fadeIn();
}
function getPlusserFromId(id){
	var html = $("#plusserH");

	html.fadeOut(function(){
		html.empty();
		$.get( "http://www.thomassio.nl:2001/plussers/"+id).done(function(data){
			html.append("<div class='plus'>"+data.id+" : "+data.firstName+"</div>");
			console.log(data);
			html.find(".plus").append("<ul></ul>");

			$.each(data.groups, function(key,value){
				console.log(value);
				html.find(".plus").find("ul").append(
					"<li>"+key+
					" id: "+value+"</li>"
				);
			});
		});
	});
	html.fadeIn();
}

function addPlusserToGRoup(groupId,plusId){
	var html = $("#groupI");
	$.post("http://www.thomassio.nl:2001/groups/"+groupId,{"plussers":plusId}).done(function(data){
		html.html(JSON.stringify(data));
	}).error(function(data){
		html.html(JSON.stringify(data));
	});

}