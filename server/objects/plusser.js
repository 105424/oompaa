this.Plusser = function(args)
{
	this.id = 0;
	this.interests = new Object(); 
	this.groups = new Object();
	this.firstName;
	this.lastName;


	try { this.firstName = args.firstName; } catch(err){ }
	try { this.lastName = args.lastName;  } catch(err){ }
}