app.controller('teachersController', ['$scope', '$http', 'auth', 
	function($scope, $http, auth){
		//debugger;
		auth.checkStatus();

		$scope.setActive('mTeachers');
		$scope.teachers = [];
		$scope.position = 5;


		$scope.courses = [
			{id : '01', name	: 'Mate - 01'},
			{id : '02', name	: 'Mate - 02'},
			{id : '03', name	: 'Matematica Discreta'},
			{id : '04', name	: 'Programacion I'},
			{id : '05', name	: 'Programacion II'},
			{id	: '06', name	: 'Programacion III'},
			{id	: '07', name	: 'Ing. de Software'},
			{id	: '08', name	: 'Sist. Operativos I'},
			{id	: '09', name	: 'Sist. Operativos II'},
			{id	: '10', name	: 'Sist. Digitales I'},
			{id	: '11', name	: 'Sist. Digitales II'},
			{id	: '12', name	: 'Seguridad Informatica'},
			{id	: '13', name	: 'Redes y Comunicaciones I'},
			{id	: '14', name	: 'Redes y Comunicaciones II'},
			{id	: '15', name	: 'Base de Datos I'},
			{id	: '16', name	: 'Base de Datos II'},
			{id	: '17', name	: 'Diseño Grafico I'},
			{id	: '18', name	: 'Diseño Grafico II'},
			{id	: '19', name	: 'Realidad Virtual I'},
			{id	: '20', name	: 'Realidad Virtual II'},
		];

		$scope.follow = function(){
			if($scope.teachers.length > $scope.position){
				$scope.position += 5;
			}
		};

		$scope.before = function(){
			if($scope.position > 5){
				$scope.position -= 5;
			}
		};

		var refresh = function(){
			$http.get('/api/teachers').success(function(results){
				$scope.teachers 		= results;
				$scope.teacher 			= "";
				$scope.isNewTeacher 	= true;
				$scope.disabledUpdate 	= false;
				$scope.showForm 		= false;
			});
		};

		refresh();

		$scope.newTeacher = function(){
			$scope.isNewTeacher 	= true;
			$scope.disabledUpdate 	= true;
			$scope.showForm 		= true;
		};

		$scope.edit = function(teacherId){
			$http.get('/api/teachers/' + teacherId).success(function(result){
				$scope.teacher 			= result;
				$scope.isNewTeacher 	= false;
				$scope.disabledUpdate 	= true;
				$scope.showForm 		= true;
			});
		};

		$scope.save = function(){		
			if($scope.isNewTeacher)		
				$scope.createTeacher();
			else
				$scope.updateTeacher();
		};

		$scope.cancel = function(){		
			$scope.teacher 	= "";	
			refresh();			
		};

		$scope.createTeacher = function(){
			console.log($scope.teacher);
			$http.post('/api/teachers', $scope.teacher).success(function(result){
				$scope.teachers.push(result);			
				refresh();
			});
		};

		$scope.updateTeacher = function(){
			var teacherId = $scope.teacher._id;
			$http.put('/api/teachers/' + teacherId, $scope.teacher).success(function(result){
				refresh();
			});
		};

		$scope.remove = function(teacherId){
			$http.delete('/api/teachers/' + teacherId).success(function(result){
				$scope.teacher = "";
				refresh();
			});
		};
	}
]);