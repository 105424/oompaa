this.Interest = function(args,owners){
  this.id;
  this.type = "interest"

	this.name;
	this.description;

  this.owners = new Array();

	try { this.name = args.nameId; } catch(err){ }
	try { this.description = args.description; } catch(err){ }

  if(owners != undefined){
    this.owners = owners;
  }
}