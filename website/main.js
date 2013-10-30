// globals (Allways uppercase)
var SERVER = "thomassio.nl:2001";
//var SERVER = "localhost:2001";
var FIRSTPAGE = "home";
var PLUSSER;
var PARAMS; // Parameters object pased to  next page
//console.log = function(){}; //Turns of console.log();

$(document).ready(function(){

	include("header/header", "body");

	$('body').append("<div id='content'></div>")
	
	include("blocks/menu", "#content");
	
	include("pages/"+FIRSTPAGE,"#content");

	include("footer/footer", "body");	

});

function navToPage(page, params){
	PARAMS = params;

	$('.page').fadeOut(function(){
		$('.page').remove();

		include("pages/"+page, "#content");

		$('.page').css("display","none");
		$('.page').fadeIn('slow');
	});

/*	$('.page').animate({
			opacity: 0.25,
    	left: "+=5000",
   		height: "toggle"
		},1000,function(){
			$('.page').remove();

			include("pages/"+page, "#content");
			
			$('.page').css("display","none");
			$('.page').fadeIn('slow');
	});*/
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
		},
		error: function(err){
			return err;
		}
	});
	if(shouldReturn) return answer;
}

function logIn(id){
	PLUSSER = 1;
	$.get("http://"+SERVER+"/plussers/"+PLUSSER+"/firstName", function(data){
		$("#info-logIn").html("Logged in as <u>"+data+"</u>");
		$("#btn-info").html("Uitloggen");
	});
	navToPage("profile");
}

function logOut(){
	PLUSSER = 0;

	$("#info-logIn").html("");
	$("#btn-info").html("");

	navToPage("home");
}