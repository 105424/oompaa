var link = "www.thomassio.nl:2001";
//var link = "localhost:2001";

$(document).ready(function(){

	$('h1').html(link);

	var container = $("#container")
	container.masonry( {
	  itemSelector: '.demo'
	});

	getGroups(5);
	getPlussers(5);
	getGroupFromId(614);
	getPlusserFromId(1);


	$('#linkB').click(function(){
		link = $('#linkV').val();
		getGroups(5);
		getPlussers(5);
		getGroupFromId(614);
		getPlusserFromId(1);		
		$('h1').html(link);
	});

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
	$('#buttonJ').click(function(){
		customGet($('#amountJ').val());
	});
});


function getGroups(amount){
	var html = $("#groups");
	var html2 = "";

	html.fadeOut(function(){
		//html.empty();
		$.get( "http://"+link+"/groups").done(function(data){
				console.log(data);
			var i = 0;
			$.each(data,function(key,group){

				if(i >= amount){
					return
				}

				html2 += "<div class='group'>"+group.id+" : "+group.name+"</div>";
				i++;
			});
			html.html(html2);
			html.fadeIn();
			$("#container").masonry();
		});
	});
}

function getPlussers(amount){
	var html = $("#plussers");
	var html2 = "";

	html.fadeOut(function(){
		$.get( "http://"+link+"/plussers").done(function(data){
				console.log(data);
			var i = 0;
			$.each(data,function(key,plusser){

				if(i >= amount){
					return
				}

				html2 += ("<div class='plusser'>"+plusser.id+" : "+plusser.lastName+" : "+plusser.firstName+"</div>");
				i++;
			});
			html.html(html2);
			html.fadeIn();
			$("#container").masonry();
		});
	});
}

function getGroupFromId(id){
	var html = $("#groupF");
	var html2 = $("<div class='plus'>");;
	html.fadeOut(function(){
		html.empty();
		$.get( "http://"+link+"/groups/"+id).done(function(data){
			console.log(data);
			html2.append(data.id+" : "+data.name);

			html2.append("<ul></ul>");

			$.each(data.plussers, function(key,value){
				html2.find("ul").append(
					"<li>"+key+
					" id: "+value+"</li>"
				);
			});
			html.html(html2.html());
			html.fadeIn();
			$("#container").masonry();
		});
	});
}
function getPlusserFromId(id){
	var html = $("#plusserH");

	html.fadeOut(function(){
		html.empty();
		$.get( "http://"+link+"/plussers/"+id).done(function(data){
				console.log(data);
			html.append("<div class='plus'>"+data.id+" : "+data.firstName+"</div>");
			console.log(data);
			html.find(".plus").append("<ul></ul>");

			$.each(data.groups, function(key,value){
				html.find(".plus").find("ul").append(
					"<li>"+key+
					" id: "+value+"</li>"
				);
			});
			html.fadeIn();
			$("#container").masonry();
		});
	});
}

function addPlusserToGRoup(groupId,plusId){
	console.log(plusId);
	var html = $("#groupI");
	$.post("http://"+link+"/groups/"+groupId,{"plussers":plusId}).done(function(data){
		html.html(JSON.stringify(data));
					$("#container").masonry();
	}).error(function(data){
		html.html(JSON.stringify(data));
					$("#container").masonry();
	});

}
function customGet(get){
	var html = $("#groupJ");
	var html2 = $("<div class='plus'>");;
	console.log(1);
	html.fadeOut(function(){
		html.empty();
		console.log("http://"+link+"/"+get);
		$.get( "http://"+link+"/"+get).done(function(data){
			console.log(data);
			html2.append(JSON.stringify(data));

			//html2.append("<ul></ul>");

			html.html(html2.html());
			html.fadeIn();
			$("#container").masonry();
		}).error(function(err){
			console.log(err);
			html2.append(err.responseText);

			//html2.append("<ul></ul>");

			html.html(html2.html());
			html.fadeIn();
			$("#container").masonry();
		});
	});
}