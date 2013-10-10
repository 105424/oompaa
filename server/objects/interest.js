this.Interest = function(args,owners){
  this.id;
	this.owners = new Array();
	this.name;
	this.description;

	try { this.name = args.nameId; } catch(err){ }
	try { this.description = args.description; } catch(err){ }

  if(owners != undefined){
    this.owners = owners;
  }
}