this.Plusser = function(args){
	this.id = 0;
	this.type = "plussers";

  this.firstName = "";
  this.lastName = "";

  this.address = "";
  this.city = "";
  this.zipcode = "";
  
  this.bio = "";

  this.image = "http://static.zoom.nl/33D3217CB8BE6DE8741AA78FB645AC36-de-opa-.jpg";

	this.interests = new Array(); 
	this.groups = new Array();
  this.videos = new Array();
  this.images = new Array();

	try { this.firstName = args.firstName; } catch(err){ }
	try { this.lastName = args.lastName;  } catch(err){ }

  try { this.address = args.address; } catch(err){ }
  try { this.city = args.city;  } catch(err){ }
  try { this.zipcode = args.zipcode;  } catch(err){ }

  try { this.bio = args.bio;  } catch(err){ }

}