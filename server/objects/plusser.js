this.Plusser = function(args){
	this.id = 0;
	this.type = "plussers";

  this.firstName = "";
  this.lastName = "";
  this.dayOfBirth = "";

  this.address = "";
  this.city = "";
  this.zipcode = "";
  
  this.bio = "";
  this.motivation = "";
  this.image = "";

  this.password = "";

	this.interests = new Array(); 
	this.groups = new Array();
  this.videos = new Array();
  this.images = new Array();

  for(item in this){ // wtf if this is called in a foor loop with the same variable name as keyVar the first var gets overwritten 
    if(args[item] != undefined) this[item] = args[item];
  }
}