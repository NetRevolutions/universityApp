var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var Student = new Schema({
	name : {
		type	: String,
		require	: true
	},
	grade : {
		type	: String,
		require	: true
	},
	age : {
		type 	: Number,
		require	: true
	},
	resume : {
		type	: String,
		require	: false
	},
	created: {
		type	: Date,
		default	: Date.now,
		require	: true
	},
	updated: {
		type 	: Date,
		require	: false
	}
});

//Validamos cada atributo
Student.path('name').validate(
	function(v){
		return((v != '') && (v!=null));
	});

Student.path('grade').validate(
	function(v){
		return((v != '') && (v!=null));
	});

Student.path('age').validate(
	function(v){
		return((v != '') && (v!=null));
	});

//Exports the model
module.exports = mongoose.model('Student', Student);