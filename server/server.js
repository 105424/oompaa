var express = require('express');
var app = express();
var api = require('./api');
var data = require('./data');
var port = 2001;

app.use(express.bodyParser());

api.init({'port':port,'app':app,'data':data});



/*
  Gewenste structuur:

  http://localhost:2001//groups/1
  {
    "id": "1",
    "type": "groups",
    "name": "C.D.O",
    "description": "Wij zijn met een kleine groep een ict bedrijfje begonnen. ons team van drie mensen. kan het uitleggen op niveau. inplaats van die jongeren met hun technobabbel",
    "motivation": "Goedkoop en duidelijk dat is onze motto",
    "interests": "",
    "task": "ICT, SCRUM, PHP, NodeJs, Less, Sass, Puppets, Linux",
    "location": "Rotterdam",
    "image": "http://localhost:2001/images/412",
    "video": "",
    "plussers": [
      "http://localhost:2001/plussers/3",
      "http://localhost:2001/plussers/4",
      "http://localhost:2001/plussers/5",
      "http://localhost:2001/plussers/1"
    ],
    "owners": [
      http://localhost:2001/plussers/3,
      http://localhost:2001/plussers/1
    ],
    "videos": [
      http://localhost:2001/videos/2412
    ],
    "images": [
      http://localhost:2001/images/1421,
      http://localhost:2001/images/5814,
      http://localhost:2001/images/412
    ],
    likes: [
      http://localhost:2001/images/1752,
      http://localhost:2001/videos/1142,
    ]
  }
    
  http://localhost:2001/groups/1/plussers
  {
    "1": {
      "id": "1",
      "type": "plussers",
      "firstName": "Mark",
      "lastName": "Arts",
      "dayOfBirth": "06-04-1923",
      "address": "djeddalaan 123",
      "city": "Rotterdam",
      "zipcode": "666GH",
      "bio": "Ik ben een testpersoon die als enige direct gekoppeld word aan alle een groepen zodat het testen daarin makkelijker gaat werken",
      "motivation": "Dit account bestaat om te zorgen dat het gorup systeem gaat werken",
      "image": "http://localhost:2001/images/412"",
      "password": "123",
      "interests": [],
      "groups": [
        "http://localhost:2001/groups/1"
      ]
    },
    "2": {
      "id": "2",
      "type": "plussers",
      "firstName": "Hans",
      "lastName": "Kablam",
      "dayOfBirth": "06-04-1923",
      "address": "Hanslaan 123",
      "city": "Rotterdam",
      "zipcode": "3345GH",
      "bio": "Ik ben een beroeps magician. Nadat ik bekend werd in Nederland met mijn kaart truken werd ik ook internationaal erkend en ging ik door naar las vegas",
      "motivation": "Ik zou graag 2 dagen per week een show willen geven binnen voor een bedrijf.",
      "image": "http://fitness.blog.nl/files/2009/07/vive.jpg",
      "password": "123",
      "interests": [],
      "groups": [
        "http://localhost:2001/groups/1"
      ]
    },
    "3": {
      "id": "3",
      "type": "plussers",
      "firstName": "Hans",
      "lastName": "De Graaf",
      "dayOfBirth": "06-04-1923",
      "address": "Graafhard 123",
      "city": "Rotterdam",
      "zipcode": "3817FB",
      "bio": "Ik ben een bouwvaker die 5 jaar geleden met pensioen is gegaan.",
      "motivation": "Na 5 jaar niks gedaan te hebben wil ik toch weer aan de slag.",
      "image": "http://3.bp.blogspot.com/-JqMhFU66Nv0/TlDgfIRwIkI/AAAAAAAAJLg/-0jT2J4ErxI/s1600/Oude+liefde.jpg",
      "password": "123",
      "interests": [],
      "groups": [
        "http://localhost:2001/groups/1",
        "http://localhost:2001/groups/2"
      ]
    }
  }

*/


/*var a = new Date();
for (var i = 0; i <1000000; i++ ){ // 10^6 = 35 milisec
  var test = data.get(1);
}
var b = new Date();

console.log(b-a);

var arr = data.get('plusser');

var a = new Date();
for (var i = 0; i <1000000; i++ ){ // 10^6 = 6943 milisec
  for(key in arr){
    if(arr.id == 1){
      var test = arr[1]
    }
  }
}
var b = new Date();

console.log(b-a);*/

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
