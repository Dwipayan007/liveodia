'use strict';
LiveOdiaApp.controller('detailnewsController', ['$scope', '$routeParams', 'detailnewsServiceFactory', 'HotnewsServiceFactory', 'homeServiceFactory', function ($scope, $routeParams, detailnewsServiceFactory, HotnewsServiceFactory, homeServiceFactory) {
    debugger;
    $scope.message = "Welcome to detail view page";
    $scope.detailNews = [];
    $scope.newsid = $routeParams.id;
    $scope.hnews = false;
    $scope.hnewssummary = false;
    $scope.nstory = false;
    $scope.tpnews = false;
    $scope.newstory = [];
    $scope.pNews = "";
    $scope.nNews = "";
    $scope.index = "";
    $scope.hnewsData = [];
    $scope.hnewsid = "";
    $scope.nHNews = "";
    $scope.pHNews = "";

    $scope.getPreviousNews = function (newsid) {
        $scope.newsid = newsid;
        $scope.GetDetailNews();
    };

    $scope.getNextNews = function (newsid) {
        $scope.newsid = newsid;
        $scope.GetDetailNews();
    };

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

    $scope.getHotNewsTitle = function () {
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hnewsTitle = [];
                $scope.hnewsTitle = hnewsdata;
            };
        })
    };

    $scope.getTopNewsByID = function (newsid) {
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.hnewssummary = [];
                $scope.hnewssummary = false;
                $scope.tnews = result;
            }
        });
    };


    $scope.getHotNewsSummary = function (ndid) {
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hnewssummary = false;
                $scope.hnews = true;
                $scope.nstory = false;
                $scope.tpnews = false;
                $scope.hotnews = hnewsdata;
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
                $scope.nstory = false;
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


    $scope.GetDetailNews = function () {
        detailnewsServiceFactory.getDetailNews($scope.newsid).then(function (dnewsdata) {
            if (dnewsdata) {
                $scope.nstory = true;
                $scope.hnewssummary = false;
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.detailNews = dnewsdata;
                $scope.getHotNewsTitle();
                $scope.getAllTopNews();
            };
        });

        homeServiceFactory.getAllNewsStory().then(function (newsData) {
            debugger;
            if (newsData) {
                $scope.newstory = newsData;
                $scope.index = _.findIndex($scope.newstory, { "nsid": parseInt($scope.newsid) });
                $scope.pNews = $scope.newstory[$scope.index - 1];
                $scope.nNews = $scope.newstory[$scope.index + 1];
            }
        });
    };
    $scope.GetDetailNews();
}]);