var express = require('express');
var app = express();
var api = require('./api');
var data = require('./data');
var port = 2001;

app.use(express.bodyParser());

api.init({'port':port,'app':app,'data':data});

/*var arr = new Array();
arr["A"] = "Ac";
arr["B"] = "Bc";
arr["C"] = "Cc";
arr["D"] = "Dc";
console.log(arr.A);
for(var ar in arr) {
	console.log(ar);
}

var s = arr.Z;
if(s) console.log(s);
else console.log("empty");

var s = arr.A;
if(s) console.log(s);
else console.log("empty");

arr.G = "lol";
console.log(arr.G);
*/

/* Experiment for copy variables (Only possible when the variables are objects)*/
/*var Name = function(name){
	this.N = name;
}

var Test = function(test){
	this.id = new Name("mark");
	this.name = this.id;
}

var t = new Test("1");
console.log(t);
t.id.N = "2";
console.log(t);
t.name.N = "3";
console.log(t);
*/


/* Proof of Concept for circular data and data storage/editing*/
/*var testA = new Array();

var TestB = function(name){
	this.name = name;
	this.D;
}
var TestC = function(name){
	this.name = name;
	this.D
}

testA.push(new TestB("B"));
testA.push(new TestC("C"));

console.log("-------111---------");
console.log(testA[0]);
console.log(testA[1]);

console.log("-------222---------");
testA[0].D = testA[1];
console.log(testA[0]);

console.log("-------333---------");
testA[1].name = "C2";
console.log(testA[0]);

console.log("-------444---------");
testA[1].D = testA[0];
console.log(testA[0].D.D);
console.log(testA[1]);

console.log("-------555---------");
var testE = new TestB("E");
testE.D = testA[0];
testA[1].D = testE;
console.log(testE);
console.log(testA[1]);

console.log("-------666---------");
var testE = new TestB("E");
testE.name = "D2";
testA[1].D = testE;
console.log(testE);
console.log(testA[1]);*/
