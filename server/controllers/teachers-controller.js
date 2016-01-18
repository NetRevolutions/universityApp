var Teacher = require('../models/teacher');

module.exports = function(app){
	create = function(req, res){
		//console.log('create ');	
		var teacher = new Teacher(req.body);
		teacher.save(function(err, result){
			if(err)
				console.log('Error in create method: ' + err);
			res.json(result);
		});
	};

	list = function(req, res){
		Teacher.find({}, function(err, results){
			if(err)
				console.log('Error in list method: ' + err);
			res.json(results);
		});
	};

	listById = function(req,res){
		var id = req.params.id;
		Teacher.findOne({_id: id}, function(err, results){
			if(err)
				console.log('Error in listById method: ' + err);
			res.json(results);
		});
	};

	update = function(req, res){
		var id = req.params.id;
		Teacher.findOne({_id: id}, function(err, teacher){
			if(err)
				console.log('Error in update method: ' + err);		

			if(req.body.name != null) teacher.name = req.body.name;
			if(req.body.age != null) teacher.age = req.body.age;
			if((req.body.course.id != null) && (req.body.course.name != '')) teacher.course = req.body.course;
			if(req.body.bio != null) teacher.bio = req.body.bio;
			teacher.updated = new Date();

			teacher.save(function(err2, doc){
				if(err2)
					console.log('Error in save (update) method: ' + err2);
				res.json(doc);
			});
		});
	};

	remove = function(req, res){
		var id = req.params.id;
		Teacher.remove({_id: id}, function(err, results){
			if(err)
				console.log('Error in remove method: ' + err);
			res.json(results);
		});
	};

	//Links routes and actions
	app.get('/api/teachers', list);
	app.get('/api/teachers/:id', listById);	
	app.post('/api/teachers', create);
	app.put('/api/teachers/:id', update);
	app.delete('/api/teachers/:id', remove);
}