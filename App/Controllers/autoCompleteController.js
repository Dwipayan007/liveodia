LiveOdiaApp.controller('autoCompleteController', ['$scope', '$timeout', '$q', '$log', '$routeParams', '$location', '$anchorScroll', '$window', 'detailnewsServiceFactory', 'HotnewsServiceFactory', 'homeServiceFactory', function ($scope, $timeout, $q, $log, $routeParams, $location, $anchorScroll, $window, detailnewsServiceFactory, HotnewsServiceFactory, homeServiceFactory) {
    debugger;
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
    $scope.getAllData();

}]);