'use strict';
LiveOdiaApp.controller('detailHotnewsController', ['$scope', '$rootScope', '$location', '$routeParams', '$anchorScroll', 'HotnewsServiceFactory', 'sharedService', 'homeServiceFactory', function ($scope, $rootScope, $location, $routeParams, $anchorScroll,HotnewsServiceFactory, sharedService, homeServiceFactory) {
    debugger;
    $scope.newsid = $routeParams.id;
    $scope.viewActive = $rootScope.hideit;
    $scope.hnewsDetail = [];
    $scope.hnewsTitle = [];
    $scope.hotnews = [];
    $scope.topstories = [];
    $scope.hnews = false;
    $scope.hnewssummary = false;
    $scope.tpnews = false;

    $scope.index = "";
    $scope.hnewsData = [];
    $scope.hnewsid = "";
    $scope.nHNews = "";
    $scope.pHNews = "";


    $scope.getPreviousHotNews = function (newsid) {
        $scope.hnewsid = newsid;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getNextHotNews = function (newsid) {
        $scope.hnewsid = newsid;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getAllTopNews = function () {
        HotnewsServiceFactory.getAllTopNews().then(function (newsData) {
            debugger;
            if (newsData) {
                $scope.topstories = [];
                $scope.topstories = newsData;
            }
        });
    };

    $scope.getTopNewsByID = function (newsid) {
        debugger;
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.hnews = false;
                $scope.hnewssummary = [];
                $scope.hnewssummary = false;
                $scope.tnews = result;
            }
        });
    };

    $scope.getHotNewsTitle = function () {
        debugger;
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hnewsTitle = [];
                $scope.hnewsTitle = hnewsdata;

            };
        })
    };

    $scope.getHotNewsByID = function () {
        debugger;
        $scope.hnewsid = $scope.newsid;
        HotnewsServiceFactory.getHotNewsSummary($scope.newsid).then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hnewsDetail = [];
                $scope.hnewssummary = true;
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.hnewsDetail = hnewsdata[0];
                $scope.getHotNewsTitle();
                $scope.getAllTopNews();
                $scope.getHotNewsData();
            };
        })
    };

    $scope.getHotNewsOnClick = function (hnid) {
        debugger;
        $scope.hnewsid = hnid;
        HotnewsServiceFactory.getHotNewsByID(hnid).then(function (result) {
            if (result) {
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.hnewssummary = [];
                $scope.hnewssummary = true;
                $scope.hnewsDetail = result[0];
                $scope.getHotNewsData();
            }
        });
    };

    $scope.getHotNewsData = function () {
        homeServiceFactory.getAllHotNews().then(function (hnewsData) {
            debugger;
            if (hnewsData) {
                $scope.hnewsData = hnewsData;
                if ($scope.hnewsid != "") {
                    $scope.index = _.findIndex($scope.hnewsData, { "hnid": parseInt($scope.hnewsid) });
                    $scope.pHNews = $scope.hnewsData[$scope.index - 1];
                    $scope.nHNews = $scope.hnewsData[$scope.index + 1];
                }
            }
        });
    };



    $scope.getHotNewsSummary = function (ndid) {
        debugger;
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hnewssummary = false;
                $scope.hnews = true;
                $scope.tpnews = false;
                $scope.hotnews = hnewsdata;
            };
        })
    };


    if ($scope.mobile) {
        debugger;
        //$location.hash('middle');
        $anchorScroll.yOffset = 20;
        $anchorScroll();
    }

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


    //$scope.getHDetailNews = function (hid) {
    //    debugger;
    //    sharedService.getHotDetailNews(hid);
    //    $location.path('/detailhotnews');
    //};

    $scope.getHotNewsByID();
}]);