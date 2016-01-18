app.controller('studentsController', ['$scope', '$http', 'auth',
	function ($scope, $http, auth) {
		auth.checkStatus();

		$scope.setActive('mStudents');	
		
		var grades = function(){			
			$http.get('/js/json/grades.json').success(function(data){
				$scope.grades = data;
			});

		}

		grades();

		var refresh = function(){
			$scope.disabledUpdate = true;
			$http.get('/api/students').success(function(results){
				$scope.students = results;
				$scope.student = '';
			});
		};

		refresh();

		$scope.edit = function(studentId){			
			$http.get('/api/students/' + studentId).success(function(result){
				$scope.student = result;
				$scope.disabledUpdate = false;
			});
		};

		$scope.createStudent = function(){
			$http.post('/api/students', $scope.student).success(function(result){
				$scope.students.push(result);			
				refresh();
			});
		};

		$scope.deselect = function(){		
			$scope.student = "";
			$scope.disabledUpdate = true;
		};

		$scope.update = function(){
			var studentId = $scope.student._id;
			$http.put('/api/students/' + studentId, $scope.student).success(function(result){
				refresh();
			});
		};

		$scope.remove = function(studentId){
			$http.delete('/api/students/' + studentId).success(function(result){
				$scope.student = "";
				refresh();
			});
		};
	}
]);