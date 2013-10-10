this.Plusser = function(args){
	this.id = 0;
	this.type = "plusser";

  this.firstName = "";
  this.lastName = "";

	this.interests = new Array(); 
	this.groups = new Array();
  this.videos = new Array();
  this.images = new Array();

	try { this.firstName = args.firstName; } catch(err){ }
	try { this.lastName = args.lastName;  } catch(err){ }
}