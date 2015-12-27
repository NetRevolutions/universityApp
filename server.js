var express 			= require('express'),
	app 				= express(),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	favicon 			= require('serve-favicon');
	
mongoose.connect('mongodb://localhost:27017/student-demo3');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

//Used for save css, libs(js), styles, etc
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/js', express.static(__dirname + '/client/js'));

//Rest API (server side)
require('./server/controllers/students-controller.js')(app);
require('./server/controllers/teachers-controller.js')(app);

app.listen(3000, function(){
	console.log('I\'m Listening...port 3000');
});