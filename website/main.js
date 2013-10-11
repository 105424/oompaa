var link = "thomassio.nl:2001";
//var link = "localhost:2001";

//console.log = function(){};

$(document).ready(function(){

	include("header/header.php", "body");

	mainPage();

	include("footer/footer.php", "body");	
});

function mainPage(){
	include("container.html", "body");	
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