this.Interest = function(args,plussers){
  this.id;
  this.type = "interests"

	this.name;
	this.description;

  this.plussers = new Array();

	try { this.name = args.name; } catch(err){ }
	try { this.description = args.description; } catch(err){ }

  if(plussers != undefined){
    this.plussers = plussers;
  }
}