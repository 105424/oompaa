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
		next();
	});

	app.post('/groups/:id', function(req, res) {
		if(req.body.hasOwnProperty('plussers')){
			if(data.addPlusserToGroup(data.get('groups',req.params.id),data.get('plussers',req.body.plussers))){
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
			if(data.addInterestToPlusser(data.get('interests',req.body.interests),data.get('plussers',req.params.id))){
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
		var thingy = new objects[req.params.type](res.body);
		res.json(data.add(req.params.type, thingy));
	});

	app.get('/:type/:id', function(req, res){
		res.json(data.get(req.params.type, req.params.id));
	}); 
	app.get('/:type/:id/:item', function(req, res){
		res.json(data.get(req.params.type, req.params.id, req.params.item));
	}); 

	app.put('/:type/:id', function(req, res){
		res.json(data.modify(req.params.type, req.params.id, res.body));
	});

	/* PLUSSERS */
/*	app.get('/plussers', function(req, res) {
		res.json(data.get('plusser'));
	});
	app.post('/plussers', function(req, res) {
		var plusser = new Plusser(req.body);
		res.json(data.addPlusser(plusser));
	});
	app.get('/plussers/:id', function(req, res) {
		res.json(data.get('plusser',req.params.id));
	});
*/
	/* GROUPS */
/*	app.get('/groups', function(req, res) {
		res.json(data.get('group'));
	});*/
/*	app.post('/groups', function(req, res) {
		var group = new Group(req.body.group,req.body.owners);
		data.addGroup(group);
		res.json(group);
	});*/

/*	app.get('/groups/:id', function(req, res) {
		res.json(data.get('group',req.params.id));
	});*/

	/* INTERESTS */
/*	app.get('/interests', function(req, res) {
		res.json(data.get('interest'));
	});
	app.post('/interests', function(req, res) {
		var interest = new Interest(req.body);
		res.json(data.addInterest(interest));
	});

	app.get('/plussers/:id', function(req, res) {
		res.json(data.get('interest',req.params.id));
	});*/
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