this.Plusser = function(args)
{
	this.id = 0;
	this.type = "PLUSSER";
	this.interests = new Array(); 
	this.groups = new Array();
	this.firstName;
	this.lastName;


	try { this.firstName = args.firstName; } catch(err){ }
	try { this.lastName = args.lastName;  } catch(err){ }
}