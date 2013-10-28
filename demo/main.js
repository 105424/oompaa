var link = "thomassio.nl:2001";
var firstPage = "all";
//var link = "localhost:2001";

//console.log = function(){}; //Turns of console.log();

$(document).ready(function(){

	include("header/header", "body");
	
	include("menu", "body");
	
	include("pages/"+firstPage,"body");

	include("footer/footer", "body");	
});

function navToPage(page){
/*	$('.page').fadeOut(function(){
		$('.page').remove();

		include("pages/"+page, "body");

		$('.page').css("display","none");
		$('.page').fadeIn('slow');
	});*/

	$('.page').animate({
			opacity: 0.25,
    	left: "+=5000",
   		height: "toggle"
		},1000,function(){
			$('.page').remove();

			include("pages/"+page, "body");
			
			$('.page').css("display","none");
			$('.page').fadeIn('slow');
	});
}

function include(file,inTo,shouldReturn,async){
	var answer;
	var asyn = false;

	if(async != undefined) var asyn = async;

	$.ajax({
	     async: asyn,
	     type: 'GET',
	     url: file + '.html', // Nodig omdat somigee servers geen bestanden vinden zonder extensie
	     success: function(data) {
	        if(shouldReturn){
	        	answer = data;
		      }
					else{
	        	$(inTo).append(data);
					}
	     }
	});
	if(shouldReturn) return answer;
}