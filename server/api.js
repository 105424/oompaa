var app;
var port;
var data;

var objects = require('./objectHolder.js')

this.init = function(args){
	app = args.app;
	port = args.port;
	data = args.data;

	data.load();

	app.listen(process.env.PORT || port);

	app.use(function(req,res,next) { // Always called
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");


		if(req.header("Authorization") == "Basic bWFyazptYXJr"){
			next();
		}else{
			res.statusCode = 401;
			res.header("WWW-Authenticate",' Basic realm=http://localhost:2001/)');
			res.send("Error 401: Authorization required");
		}
	});


	app.post("/logIn", function(req,res){
		if(req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName') && req.body.hasOwnProperty('password')){
			//TODO: Add check to see if they are empty 
			var possibles = data.search("plussers",req.body.firstName,"firstName");
			for(key in possibles){
				if(possibles[key].lastName == req.body.lastName && possibles[key].password == req.body.password){
					res.json(possibles[key].id);
				}
			}
			res.statusCode = 400;			
		//	return res.send("Error 400: Bad login");
		}
		res.statusCode = 400;
		return res.send("Error 400: Syntax error");
	});

	app.post('/groups/:id', function(req, res) {
		if(req.body.hasOwnProperty('plussers')){
			if(data.link(data.get('groups',req.params.id),data.get('plussers',req.body.plussers))){
				res.json(data.get('groups',req.params.id));
			}else{
				res.statusCode = 400;
	    	return res.send('Error 400: No plusser or group found with that ID.');				
			}
		}else{
			res.statusCode = 400;
    	return res.send('Error 400: json syntax incorrect.');
		}
	});	
	app.post('/plussers/:id', function(req, res) {
		if(req.body.hasOwnProperty('interests')){
			if(data.link(data.get('interests',req.body.interests),data.get('plussers',req.params.id))){
				res.json(data.get('interests',req.params.id));
			}else{
				res.statusCode = 400;
	    		return res.send('Error 400: No interest or group found with that ID.');				
			}
		}else{
			res.statusCode = 400;
    		return res.send('Error 400: json syntax incorrect.');
		}
	});

	app.get('/', function(req, res) {
		res.json(data.get('all'));
	});

	app.get('/:type', function(req, res){
		res.json(data.get(req.params.type));
	}); 
	
	app.post('/:type', function(req, res){
		var thingy = new objects[req.params.type](req.body);
		res.json(data.add(req.params.type, thingy));
	});

	app.get('/:type/:id', function(req, res){
		res.json(data.get(req.params.type, req.params.id));
	});

	app.delete('/:type/:id', function(req, res){
		console.log("jeeee");
		res.json(data.remove(req.params.type, req.params.id, req.body.hard));
	}); 

	app.get('/:type/random/:amount', function(req, res){
		res.json(data.get(req.params.type,'random',req.params.amount));
	}); 

	app.get('/:type/search/:term', function(req, res){
		res.json(data.search(req.params.type,req.params.term));
	}); 

	app.get('/:type/:id/:item', function(req, res){
		res.json(data.get(req.params.type, req.params.id, req.params.item));
	}); 

	app.delete('/:type/:id/:item', function(req, res){
		res.json(data.remove(req.params.type, req.params.id, req.params.item, req.body.hard));
	}); 

	app.put('/:type/:id', function(req, res){
		res.json(data.modify(req.params.type, req.params.id, res.body));
	});
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/*depth = 0;
function circularJson(json){
	var cache = [];
	var depthMax = 2;
	var answer = JSON.stringify(json, function(key, value) {
	    if (typeof value === 'object' && value !== null) {
	        if (cache.indexOf(value) !== -1) {
	            // Circular reference found, discard key
	            	return value.id;
	        }
	        // Store value in our collection
	        cache.push(value);
	    }
	    return value;
	});
	cache = null;
	return answer;
}*/