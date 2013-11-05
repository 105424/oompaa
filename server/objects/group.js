this.Group = function(args,owners){;
	this.id = 0;;
	this.type = "groups"

	this.name;
	this.description;
	this.motivation;
	this.interests;
	
	this.location;

	this.image = "";
	this.video = "";

	this.plussers = new Array();
	this.owners = new Array();
	this.videos = new Array();
  this.images = new Array();


	try { this.id = args.id; } catch(err){ } // !!!! ONLY FOR TESTING !!!!!!
  if(args['plussers'] != undefined) this.plussers = args.plussers; // !!!! ONLY FOR TESTING !!!!!!

	try { this.name = args.name; } catch(err) {}
	try { this.description = args.description; } catch(err) {}
	try { this.location = args.location; } catch(err) {}
	try { this.motivation = args.motivation; } catch(err) {}
	try { this.interests = args.interests; } catch(err) {}

	try { this.image = args.image; } catch(err) {}




	if(owners != undefined){
		this.plussers = owners;
		this.owners = this.plussers;
	}
}