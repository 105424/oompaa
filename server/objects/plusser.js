this.Plusser = function(args){
	this.id = 0;
	this.type = "plusser";

  this.firstName = "";
  this.lastName = "";

  this.image = "http://static.zoom.nl/33D3217CB8BE6DE8741AA78FB645AC36-de-opa-.jpg";

	this.interests = new Array(); 
	this.groups = new Array();
  this.videos = new Array();
  this.images = new Array();

	try { this.firstName = args.firstName; } catch(err){ }
	try { this.lastName = args.lastName;  } catch(err){ }
}