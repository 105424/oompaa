this.Group = function(args,owners){;
	this.id = 0;;
	this.type = "group"

	this.name;
	this.description;
	
	this.location;

	this.img = "";
	this.video = "";

	this.plussers = new Array();
	this.owners = new Array();
	this.videos = new Array();
  this.images = new Array();

	try { this.name = args.name; } catch(err) {}
	try { this.description = args.description; } catch(err) {}
	try { this.location = args.location; } catch(err) {}

	if(owners != undefined){
		this.plussers = owners;
		this.owners = this.plussers;
	}
}