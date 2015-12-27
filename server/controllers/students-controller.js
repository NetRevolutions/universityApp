var Student = require('../models/student'); 	//no requiere extension .js

module.exports = function(app){
	create = function(req, res){
		//console.log('create ');	
		var student = new Student(req.body);
		student.save(function(err, result){
			if(err)
				console.log('Error in create method: ' + err);
			res.json(result);
		});
	};

	list = function(req, res){
		Student.find({}, function(err, results){
			if(err)
				console.log('Error in list method: ' + err);
			res.json(results);
		});
	};

	listById = function(req, res){		
		var id = req.params.id;		
		Student.findOne({_id: id}, function(err, results){
			if(err)
				console.log('Error in listById method: ' + err);
			res.json(results);
		});
	};

	update = function(req, res){
		var id = req.params.id;
		Student.findOne({_id: id}, function(err, student){
			if(err)
				console.log('Error in update method: ' + err);		
			
			if(req.body.name != null) student.name = req.body.name;
			if(req.body.grade != null) student.grade = req.body.grade;
			if(req.body.age != null) student.age = req.body.age;
			if(req.body.resume != null) student.resume = req.body.resume;
			student.updated = Date.now;

			student.save(function(err2, doc){
				if(err2)
					console.log('Error in save (update) method: ' + err2);

				res.json(doc);
			});			
		});
	};

	remove = function(req, res){
		var id = req.params.id;
		Student.remove({_id: id}, function(err, results){
			if(err)
				console.log('Error in remove method: ' + err);
			res.json(results);
		});
	};

	//Links routes and actions
	app.get('/api/students', list);
	app.get('/api/students/:id', listById);	//Call 1.2
	app.post('/api/students', create);
	app.put('/api/students/:id', update);	
	app.delete('/api/students/:id', remove);
}