this.Group = function(args,owners){
	this.owners = owners;
	this.id;
	this.name;
	this.plussers = new Object();

	try { this.name = args.name; } catch(err) {}
	try { this.name = args.name; } catch(err) {}

	this.plussers = owners;
}