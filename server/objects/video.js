this.Video = function(args){
  this.id = 0;
  this.type = "videos";

  this.name = "";
  this.description = "";
  this.link = "";

  for(item in this){ // wtf if this is called in a foor loop with the same variable name as keyVar the first var gets overwritten 
    if(args[item] != undefined) this[item] = args[item];
  }
}