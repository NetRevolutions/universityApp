app.controller('teachersController', ['$scope', '$http', 
	function($scope, $http){
		$scope.setActive('mTeachers');

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