
LiveOdiaApp.controller('detailHotnewsController', ['$scope', '$rootScope', '$location', '$routeParams', '$anchorScroll', '$window', 'HotnewsServiceFactory', 'sharedService', 'homeServiceFactory', function ($scope, $rootScope, $location, $routeParams, $anchorScroll, $window, HotnewsServiceFactory, sharedService, homeServiceFactory) {
    $window.ga('send', 'detailhotnews', $location.path());
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
        $window.ga('send', 'event', 'detailhotnews', 'PreviousHotNews');
        $scope.hnewsid = newsid;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getNextHotNews = function (newsid) {
        $window.ga('send', 'event', 'detailhotnews', 'NextHotNews');
        $scope.hnewsid = newsid;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getAllTopNews = function () {
        $window.ga('send', 'event', 'detailhotnews', 'All Top News Called');
        HotnewsServiceFactory.getAllTopNews().then(function (newsData) {
            if (newsData) {
                $scope.topstories = [];
                $scope.topstories = newsData;
            }
        });
    };

    $scope.getTopNewsByID = function (newsid) {
        $window.ga('send', 'event', 'detailhotnews', 'Top News By Id');
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
        $window.ga('send', 'event', 'detailhotnews', 'All Hot News Title');
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hnewsTitle = [];
                $scope.hnewsTitle = hnewsdata;

            }
        });
    };

    $scope.getHotNewsByID = function () {
        $window.ga('send', 'event', 'detailhotnews', 'Hot News By Id');
        $scope.hnewsid = $scope.newsid;
        HotnewsServiceFactory.getHotNewsSummary($scope.newsid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsDetail = [];
                $scope.hnewssummary = true;
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.hnewsDetail = hnewsdata[0];
                $scope.getHotNewsTitle();
                $scope.getAllTopNews();
                $scope.getHotNewsData();
            }
        });
    };

    $scope.getHotNewsOnClick = function (hnid) {
        $window.ga('send', 'event', 'detailhotnews', 'Hot News Clicked');
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
            if (hnewsData) {
                $scope.hnewsData = hnewsData;
                if ($scope.hnewsid !== "") {
                    $scope.index = _.findIndex($scope.hnewsData, { "hnid": parseInt($scope.hnewsid) });
                    $scope.pHNews = $scope.hnewsData[$scope.index - 1];
                    $scope.nHNews = $scope.hnewsData[$scope.index + 1];
                }
            }
        });
    };



    $scope.getHotNewsSummary = function (ndid) {
        $window.ga('send', 'event', 'detailhotnews', 'hot news Summary');
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewssummary = false;
                $scope.hnews = true;
                $scope.tpnews = false;
                $scope.hotnews = hnewsdata;
            }
        });
    };


    if ($scope.mobile) {

        //$location.hash('middle');
        $anchorScroll.yOffset = 20;
        $anchorScroll();
    }

    $(document).ready(function () {
        $window.ga('send', 'event', 'home', 'Mobile Menu Clicked');
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
           isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {
            $window.ga('send', 'event', 'home', 'Mobile Menu Closed');
            if (isClosed === true) {
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
    //    
    //    sharedService.getHotDetailNews(hid);
    //    $location.path('/detailhotnews');
    //};

    $scope.getHotNewsByID();
}]);