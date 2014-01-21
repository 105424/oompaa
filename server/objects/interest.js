this.Interest = function(args,plussers){
  this.id = 0;
  this.type = "interests"

	this.name = "";
	this.description = "";

  this.plussers = new Array();

  for(item in this){ // wtf if this is called in a foor loop with the same variable name as keyVar the first var gets overwritten 
    if(args[item] != undefined) this[item] = args[item];
  }

  if(plussers != undefined){
    this.plussers = plussers;
  }
}