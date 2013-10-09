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

	app.get('/', function(req, res) {
		res.type('application/json');
		res.send("i'm back baby"); 
	});

	/* PLUSSERS */
	app.get('/plussers', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getPlussers()));
	});
	app.post('/plussers', function(req, res) {
		res.type('application/json');

		var plusser = new Plusser(req.body);
		res.send(circularJson(data.addPlusser(plusser)));
		res.statusCode = 400;
	});
	app.get('/plussers/:id', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getPlusser(req.params.id)));
	});

	/* GROUPS */
	app.get('/groups', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getGroups()));
	});
	app.post('/groups', function(req, res) {
		res.type('application/json');

		var group = new Group(req.body.group,req.body.owners);
		data.addGroup(group);
		res.json(group);
	});

	app.get('/groups/:id', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getGroup(req.params.id)));
	});

	app.post('/groups/:id', function(req, res) {
		res.type('application/json');

		if(req.body.hasOwnProperty('id')){
			if(data.addPlusserToGroup(data.getGroup(req.params.id),data.getPlusser(req.body.id))){
				res.send(circularJson(data.getGroup(req.params.id)));
			}else{
				res.statusCode = 400;
	    		return res.send('Error 400: No plusser found with that ID.');				
			}
		}else{
			res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
		}
	});

	/* INTERESTS */
	app.get('/interests', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getInterests()));
	});
	app.post('/interests', function(req, res) {
		var interest = new Interest(req.body);

		res.type('application/json');
		res.statusCode = 400;
		res.send(circularJson(data.addPlusser(interest)));
	});

	app.get('/plussers/:id', function(req, res) {
		res.type('application/json');
		res.send(circularJson(data.getPlusser(req.params.id)));
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

function circularJson(json){
	var cache = [];

	var depthMax = 1;
	var depthCount = 0;

	var answer = JSON.stringify(json, function(key, value) {
	    if (typeof value === 'object' && value !== null) {
	        if (cache.indexOf(value) !== -1) {
	            // Circular reference found, discard key
	            depthCount++;
	            if(depthCount >= depthMax) return;
	        }
	        // Store value in our collection
	        cache.push(value);
	    }
	    depthCount = 0;
	    return value;
	});
	cache = null;
	return answer;
}