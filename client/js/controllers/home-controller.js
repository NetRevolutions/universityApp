app.controller('homeController', ['$scope', '$resource', '$cookies', 'auth',
	function($scope, $resource, $cookies, auth){
		//debugger;
		$scope.setActive('mHome');	
		
		//debugger;
		//console.log($scope.showUserName);
		//devolvemos a la vista el nombre del usuario
	    $scope.username = $cookies.username;
	    $scope.password = $cookies.password;
	    //la función logout que llamamos en la vista llama a la función    
	    //logout de la factoria auth
	    /*
	    $scope.logout = function()
	    {
	        auth.logout();
	    }
	    */	
	    auth.checkStatus();
}]);