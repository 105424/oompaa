this.Group = function(args,owners){;
	this.type = "GROUP"
	this.id;
	this.name;
	this.plussers = new Array();
	this.owners = new Array();

	try { this.name = args.name; } catch(err) {}
	try { this.name = args.name; } catch(err) {}

	if(owners != undefined){
		this.plussers = owners;
		this.owners = this.plussers;
	}
}