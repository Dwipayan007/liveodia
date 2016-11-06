
LiveOdiaApp.controller('indexController', ['$scope', '$rootScope', '$location', '$anchorScroll', 'homeServiceFactory', 'HotnewsServiceFactory', 'loginServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, homeServiceFactory,HotnewsServiceFactory, loginServiceFactory, mobileCheck) {
    
    $scope.mobile = mobileCheck;
    //if ($scope.mobile) {
    //    
    //    $location.hash('middle');
    //    $anchorScroll.yOffset = 20;
    //    $anchorScroll();
    //}

    $scope.selected = undefined;
    $scope.countries = [
     { ititle: 'Afghanistan', code: 'AF' },
     { ititle: 'Antigua and Barbuda', code: 'AG' },
     { ititle: 'Bahamas', code: 'BS' },
     { ititle: 'Cambodia', code: 'KH' },
     { ititle: 'Cape Verde', code: 'CV' }
    ];
    $scope.getAllData = function () {
        debugger;
        $scope.allData = [];
        homeServiceFactory.getImpNews().then(function (data) {
            debugger;
            $scope.countries = data;
        });
    };
    
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