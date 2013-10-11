var link = "thomassio.nl:2001";
//var link = "localhost:2001";

//console.log = function(){};

$(document).ready(function(){

	include("header/header", "body");

	mainPage();

	include("footer/footer", "body");	
});

function mainPage(){
	include("container", "body");	
}


function include(file,inTo){

	$.ajax({
	     async: false,
	     type: 'GET',
	     url: file,
	     success: function(data) {
	        $(inTo).append(data);
	     }
	});

}