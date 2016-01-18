app.controller('loginController', ['$scope', 'auth', '$controller', '$location',
	function ($scope, auth, $controller, $location){
		//debugger;

		//auth.logout();

		///$controller('mainController',{$scope: $scope});		
		
		//$scope.menulblUserName = 'Username';

		///$scope.setActive(NaN);

		//la función login que llamamos en la vista llama a la función
	    //login de la factoria auth pasando lo que contiene el campo
	    //de texto del formulario	    
	    $scope.login = function()
	    {
	        auth.login($scope.username, $scope.password);
	    }
	}
]);
