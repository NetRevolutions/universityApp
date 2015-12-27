app.config(function($routeProvider){
	
	$routeProvider
		.when('/', {
			templateUrl: 'views/partials/home.html',
			controller: 'homeController'
		})
		.when('/teachers', {
			templateUrl: 'views/partials/teachers.html',
			controller: 'teachersController'
		})
		.when('/students', {
			templateUrl: 'views/partials/students.html',
			controller: 'studentsController'
		})
		.otherwise({ 
			redirectTo: '/' 
		});
});