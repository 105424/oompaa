this.Group = function(args,owners){;
	this.id = 0;;
	this.type = "groups"

	this.name = "";
	this.description = "";
	this.motivation = "";
	this.interests = "";
	
	this.location;

	this.image = "";
	this.video = "";

	this.plussers = new Array();
	this.owners = new Array();
	this.videos = new Array();
  this.images = new Array();


  for(item in this){ // wtf if this is called in a foor loop with the same variable name as keyVar the first var gets overwritten 
    if(args[item] != undefined) this[item] = args[item];
  }



	if(owners != undefined){
		this.plussers = owners;
		this.owners = this.plussers;
	}
}