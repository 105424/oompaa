var app;
var port;
var data;

var Group = require('./objects/group').Group;
var Plusser = require('./objects/plusser').Plusser;
var Interest = require('./objects/interest').Interest;

this.init = function(args){
	app = args.app;
	port = args.port;
	data = args.data;

	data.load();

	app.listen(process.env.PORT || port);

	app.use(function(req,res,next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});

	app.get('/', function(req, res) {
		res.type('text/plain');
		res.send("i'm back baby"); 
	});

	/* PLUSSERS */
	app.get('/plussers', function(req, res) {
		res.json(data.get('plussers'));
	});
	app.post('/plussers', function(req, res) {
		var plusser = new Plusser(req.body);
		res.json(data.addPlusser(plusser));
	});
	app.get('/plussers/:id', function(req, res) {
		res.json(data.get('plussers',req.params.id));
	});

	/* GROUPS */
	app.get('/groups', function(req, res) {
		res.json(data.get('groups'));
	});
	app.post('/groups', function(req, res) {
		var group = new Group(req.body.group,req.body.owners);
		data.addGroup(group);
		res.json(group);
	});

	app.get('/groups/:id', function(req, res) {
		res.json(data.get('groups',req.params.id));
	});

	app.post('/groups/:id', function(req, res) {
		if(req.body.hasOwnProperty('plussers')){
			console.log(data.get('groups',req.params.id));
			console.log(data.get('plussers',req.body.plussers));
			if(data.addPlusserToGroup(data.get('groups',req.params.id),data.get('plussers',req.body.plussers))){
				res.json(data.get('groups',req.params.id));
			}else{
				res.statusCode = 400;
	    		return res.send('Error 400: No plusser or group found with that ID.');				
			}
		}else{
			res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
		}
	});

	/* INTERESTS */
	app.get('/interests', function(req, res) {
		res.json(data.get('interests'));
	});
	app.post('/interests', function(req, res) {
		var interest = new Interest(req.body);
		res.json(data.addInterest(interest));
	});

	app.get('/plussers/:id', function(req, res) {
		res.json(data.get('interests',req.params.id));
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

depth = 0;
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
}