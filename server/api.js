var app;
var port;
var data;

var Group = require('./objects/group').Group;
var Plusser = require('./objects/plusser').Plusser;

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

	app.get('/plussers', function(req, res) {
		res.type('application/json');
		res.send(JSON.stringify(data.getPlussers()));
	});
	app.post('/plussers', function(req, res) {
		var plusser = new Plusser(req.body);
		data.addPlusser(plusser);
		res.json(plusser);
		res.statusCode = 400;
	});

	app.get('/plussers/:id', function(req, res) {
		res.type('application/json');
		res.send(JSON.stringify(data.getPlusser(parseInt(req.params.id))));
	});

	app.get('/groups', function(req, res) {
		res.type('application/json');
		res.send(JSON.stringify(data.getGroups()));
	});
	app.post('/groups', function(req, res) {
		var group = new Group(req.body);
		data.addGroup(group);
		res.json(group);
	});

	app.get('/groups/:id', function(req, res) {
		res.type('application/json');
		res.send(JSON.stringify(data.getGroup(parseInt(req.params.id))));
	});

	app.post('/groups/:id', function(req, res) {
		if(req.body.hasOwnProperty('id')){
			if(data.addPlusserToGroup(parseInt(req.params.id),parseInt(req.body.id))){
				res.send(JSON.stringify(data.getGroup(parseInt(req.params.id))));
			}else{
				res.statusCode = 400;
	    		return res.send('Error 400: No plusser found with that ID.');				
			}
		}else{
			res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
		}
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