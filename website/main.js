$(document).ready(function(){
	random(20);

	$('#button').click(function(){
		random($('#amount').val());
	});

});

function random(amount){
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