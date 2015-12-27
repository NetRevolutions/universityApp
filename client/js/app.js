var app = angular.module('universityApp', ['ngResource', 'ngRoute']);

app.factory('studentFactory', ['$resource', function($resource){
	return $resource('/api/students/:id', null,
	{
		'update': {method: 'PUT'}
	});
}]);

app.factory('teacherFactory', ['$resource', function($resource){
	return $resource('/api/teachers/:id', null,
	{
		'update': {method: 'PUT'}
	});
}]);

app.controller('mainController', ['$scope', function ($scope) {
	$scope.upperMenu = 'views/partials/menu.html';

	$scope.setActive = function(option){
		$scope.mHome 		= "";	
		$scope.mTeachers	= "";
		$scope.mStudents	= "";

		$scope[option] = "active";	
	};
	
}]);