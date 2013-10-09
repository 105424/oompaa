this.Interest = function(args,owners){
	this.owners = owners;
	this.interestId;
	this.nameId;
	this.description;

	try { this.plusserId = args.plusserId; } catch(err){ }
	try { this.interestId = args.interestId; } catch(err){ }
	try { this.nameId = args.nameId; } catch(err){ }
	try { this.description = args.description; } catch(err){ }
}