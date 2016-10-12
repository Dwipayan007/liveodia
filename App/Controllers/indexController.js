'use strict';
LiveOdiaApp.controller('indexController', ['$scope', '$rootScope', '$location', 'homeServiceFactory', 'loginServiceFactory', function ($scope, $rootScope, $location, homeServiceFactory, loginServiceFactory) {
    debugger;
    $scope.viewActive = $rootScope.hideit;
    //logout 
    $scope.logOut = function () {
        loginServiceFactory.logOut();
        $location.path('/home');
    };
    $scope.onHomeClick = function () {
       // $rootScope.$on("$routeChangeStart", function (event, next, current) {
            //..do something
            //event.stopPropagation();  //if you don't want event to bubble up 
            debugger;
            $location.path('/about');
        //});
        
    }
    $scope.authentication = loginServiceFactory.authentication;

}]);