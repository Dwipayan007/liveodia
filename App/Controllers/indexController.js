﻿
LiveOdiaApp.controller('indexController', ['$scope', '$rootScope', '$location', '$anchorScroll', 'homeServiceFactory', 'HotnewsServiceFactory', 'loginServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, homeServiceFactory,HotnewsServiceFactory, loginServiceFactory, mobileCheck) {
    
    $scope.mobile = mobileCheck;
    //if ($scope.mobile) {
    //    
    //    $location.hash('middle');
    //    $anchorScroll.yOffset = 20;
    //    $anchorScroll();
    //}
    $scope.viewActive = $rootScope.hideit;
    //logout 
    $scope.logOut = function () {
        loginServiceFactory.logOut();
        $location.path('/home');
    };
    $scope.onHomeClick = function () {
        $location.path('/about');
    };
    
   

    $scope.authentication = loginServiceFactory.authentication;

}]);