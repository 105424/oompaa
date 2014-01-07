// globals (Allways uppercase)
//var SERVER = "http://thomassio.nl:2001";
var SERVER = "http://localhost:2001";
var FIRSTPAGE = "home";
var PLUSSER;
var PARAMS; // Parameters object pased to  next page
//console.log = function(){}; //Turns of console.log();

$(document).ready(function(){
	init('body');
});

function navToPage(page, params){
	PARAMS = params;
/*	$('.page').fadeOut(function(){
		$('.page').remove();

		include("pages/"+page, "#content");

		$('.page').css("display","none");
		$('.page').fadeIn('slow');
	});*/

	$('.page').animate({
			opacity: 0.25,
    	left: "+=5000",
   		height: "toggle"
		},1000,function(){
			$('.page').remove();

			include("pages/"+page, "#content");
			
			$('.page').css("display","none");
			$('.page').fadeIn('slow');
	});
}
  
function replace(file,target,async){
	var html = include(file,target,true,false)
	$(target).replaceWith(html);
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
		  	$(inTo).append(data); // Activates all inputs in div. TODO: Check if this creates loops or shit. Not sure why it wors good here
			}
		},
		error: function(err){
			return err;
		}
	});
	if(shouldReturn) return answer;
}

function logIn(id,shouldNav){
	PLUSSER = id;
	$.get(SERVER+"/plussers/"+PLUSSER+"/firstName", function(data){
		$("#info-logIn").html("Logged in as <u>"+data+"</u>");
		$("#btn-info").html("Uitloggen");
	});

	if(shouldNav) navToPage("profile");
}

function logOut(){
	PLUSSER = 0;

	$("#info-logIn").html("");
	$("#btn-info").html("");

	navToPage("home");
}

// Puts all input fields values into a object with the input class as data
function parseForm(data){
	var answer = new Object();
	data = $(data); // Just in case;
	data.find('input, textarea').each(function(key, value){
		answer[$(value).attr("class")] = $(value).val();
	});
	return answer;
}

// Activates all include fields in the target
function init(target){
	$(target).find("include").each(function(key,value){
    replace($(value).attr("src"),value);
  });
}

function formInit(form, callback, always){
  var forms = $(form+" .form");
  var data = new Object();
  var showing = 0;

  forms.hide();

  forms.each(function(key,value){
    forms[key] = $(value);
    if(key == 0) 
      $(value).fadeIn();

    $(value).find(".next").on("click",function(target){
      next();
    });

    $(value).find(".previous").on("click",function(target){
      previous();
    });

  });

  function previous(){
    navTo(showing-1)
  }

  function next(){
    var sub = parseForm(forms[showing]);
    $.extend(data, sub);

    navTo(showing+1)
  }

  function navTo(target){

  	if(always != undefined) always(data);

    forms[showing].fadeOut("fast",function(){
      showing = target;
      if(showing > (forms.length - 1)){
        if(callback != undefined){
          callback(data);
          return data;
        }
        else
          return data;
      }
      else{
        forms[showing].fadeIn();
      }
    });
  }
}

$( window ).resize(function(event){
  $('section').height(window.height());
});