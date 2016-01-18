var app = angular.module('universityApp', ['ngResource', 'ngRoute', 'ngCookies']);

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


app.factory('auth', ['$cookies', '$cookieStore', '$location',
    function($cookies, $cookieStore, $location){       
        return{
            login: function(username, password){
                //creamos la cookie con el nombre que nos han pasado
                $cookies.username = username,
                $cookies.password = password;
                //mandamos a la home
                $location.path("/");
            },
            logout: function(){
                //al hacer logout eliminamos la cookie con $cookieStore.remove
                //$cookieStore.remove("username"),
                //$cookieStore.remove("password");
                //debugger;               

                delete $cookies['username'];
                delete $cookies['password'];
                
                                                
                //mandamos al login
                $location.path("/login");
            },
            checkStatus: function(){
                //debugger;
                //creamos un array con las rutas que queremos controlar
                var rutasPrivadas = ["/teachers", "/students","/login", "/profile"];                
                //var rutasPrivadas = []; //Pendiente de corregir para habilitar las rutas privadas
                
                /*
                URL: http://uno-de-piera.com/login-con-angularjs-utilizando-cookies-con-el-modulo-ngcookies/
                */                
                if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
                {
                    $location.path("/login");
                    return;
                }                
                if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) != "undefined")
                {
                    $location.path();
                    return;
                }               
                /*
                //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
                if(this.in_array("/login",rutasPrivadas) && typeof($cookies.username) != "undefined")
                {
                    $location.path("/");
                }
                */
                else
                {
                    $location.path("/");
                }
                
            },
            in_array: function(needle, haystack){
                var key = '';
                for(key in haystack)
                {
                    if(haystack[key] == needle)
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
]);

app.controller('mainController', ['$scope', '$cookies', 'auth', 
    function ($scope, $cookies, auth) {        
        //debugger;
        
    	$scope.upperMenu = 'views/partials/menu.html';        

        if(typeof($cookies.username) != "undefined"){
            $('html').find('#menulblUserName').html($cookies.username);
            $('html').find('#menulblSigInOut').html('Sign Out');
            $('html').find('#liProfile').removeAttr('style')
            //$scope.menulblUserName = $cookies.username;
        }
        else{
            $('html').find('#menulblUserName').html('Username');
            $('html').find('#menulblSigInOut').html('Sign In');
            $('html').find('#liProfile').css('display', 'none');
            //$scope.menulblUserName = 'Username';
        }

    	$scope.setActive = function(option){
            if(typeof($cookies.username) != "undefined"){
                $('html').find('#menulblUserName').html($cookies.username);
                $('html').find('#menulblSigInOut').html('Sign Out');
                $('html').find('#liProfile').removeAttr('style')
                //$scope.menulblUserName = $cookies.username;
            }
            else{
                $('html').find('#menulblUserName').html('Username');
                $('html').find('#menulblSigInOut').html('Sign In');
                $('html').find('#liProfile').css('display', 'none');
                //$scope.menulblUserName = 'Username';
            }

    		$scope.mHome 		= "";	
    		$scope.mTeachers	= "";
    		$scope.mStudents	= "";

    		$scope[option] = "active";	
            
    	};

        $scope.logout = function(){
            debugger;
            if($('html').find('#menulblUserName').html() != 'Username'){
                $('html').find('#menulblUserName').html('Username');
                $('html').find('#menulblSigInOut').html('Sign In');
                $('html').find('#liProfile').css('display', 'none');
                auth.logout();
            }
        };
    }
]);

/*
//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
app.run(function($rootScope, auth)
{
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
});
*/

//Filter to make the first letter uppercase
app.filter("capitalize", function(){
    return function(text) {
        if(text != null){
            return text.substring(0,1).toUpperCase()+text.substring(1);
        }
    }
});

//Filter to make all text uppercase
app.filter("toUpper", function(){
    return function(text){
        if(text != null){
            return text.toUpperCase();
        }
    }
});

//Filter to put dots from x characters.
app.filter("maxLength", function(){
    return function(text,max){
        if(text != null){
            if(text.length > max)
                return text.substring(0,max) + "...";
            else
            	return text;
        }
    }
});

/*
String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
*/