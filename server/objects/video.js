this.Video = function(args){
  this.id = 0;
  this.type = "video";

  this.name = "";
  this.description = "";
  this.link = "";

  try { this.name = args.name; } catch(err){ }
  try { this.description = args.description; } catch(err){ }
  try { this.link = args.link; } catch(err){ }
}