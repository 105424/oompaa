this.Image = function(args){
  this.id = 0;
  this.type = "images";

  this.name = "";
  this.description = "";
  this.link = "";

  try { this.name = args.name; } catch(err){ }
  try { this.description = args.description; } catch(err){ }
  try { this.link = args.link; } catch(err){ }
}