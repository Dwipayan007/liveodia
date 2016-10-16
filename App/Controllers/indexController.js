'use strict';
LiveOdiaApp.controller('indexController', ['$scope', '$rootScope', '$location', '$anchorScroll', 'homeServiceFactory', 'HotnewsServiceFactory', 'loginServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, homeServiceFactory,HotnewsServiceFactory, loginServiceFactory, mobileCheck) {
    debugger;
    $scope.mobile = mobileCheck;
    //if ($scope.mobile) {
    //    debugger;
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
    
    $(document).ready(function () {
        debugger;
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
           isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });
    });

    $scope.authentication = loginServiceFactory.authentication;

}]);