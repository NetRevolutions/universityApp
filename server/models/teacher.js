var mongoose = require('mongoose');
var Schema 		= mongoose.Schema;

var Teacher = new Schema({
	name : {
		type 	: String,
		require	: true
	},
	age : {
		type 	: Number,
		require	: true
	},
	course : {
		id: {
			type	: String,
			require : true
		},
		name: {
			type 	: String,
			require : true
		}
	},
	bio : {
		type 	: String,
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

//Validate each attribute
Teacher.path('name').validate(
	function(v){
		return((v != '') && (v!=null));
	});
Teacher.path('age').validate(
	function(v){
		return((v != '') && (v!=null));
	});
/*
Teacher.path('course').validate(
	function(v){
		return((v != '') && (v!=null));
	});
*/
//Exports the model
module.exports = mongoose.model('Teacher', Teacher);