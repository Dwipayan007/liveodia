
LiveOdiaApp.controller('detailnewsController', ['$scope', '$routeParams', '$location', '$anchorScroll', '$window', '$uibModal', 'detailnewsServiceFactory', 'HotnewsServiceFactory', 'homeServiceFactory', function ($scope, $routeParams, $location, $anchorScroll, $window, $uibModal,detailnewsServiceFactory, HotnewsServiceFactory, homeServiceFactory) {
    $window.ga('send', 'HomePage', $location.path());
    $scope.message = "Welcome to detail view page";
    $scope.detailNews = [];
    $scope.newsid = $routeParams.id;
    $scope.hnews = false;
    $scope.hnewssummary = false;
    $scope.nstory = false;
    $scope.tpnews = false;
    $scope.pnewsclck = false;
    $scope.newstory = [];
    $scope.pNews = "";
    $scope.nNews = "";
    $scope.index = "";
    $scope.hnewsData = [];
    $scope.hnewsid = "";
    $scope.nHNews = "";
    $scope.pHNews = "";

    $scope.editNewstory = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editNewstory.html',
            controller: 'editDetailNewsController',
            resolve: {
                detailNews: function () {
                    return $scope.detailNews;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };



    $scope.getPreviousNews = function (newsid) {
        $window.ga('send', 'event', 'Detailnews Page', 'PreviousNews Clicked');
        $scope.newsid = newsid;
        $scope.GetDetailNews();
    };

    $scope.getNextNews = function (newsid) {
        $window.ga('send', 'event', 'Detailnews Page', 'Next News Clicked');
        $scope.newsid = newsid;
        $scope.GetDetailNews();
    };

    $scope.getPreviousHotNews = function (newsid) {
        $window.ga('send', 'event', 'Detailnews Page', 'PreviousHotNews');
        $scope.hnewsid = newsid;
        $scope.pnewsclck = true;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getNextHotNews = function (newsid) {
        $window.ga('send', 'event', 'Detailnews Page', 'NextHotNews');
        $scope.hnewsid = newsid;
        $scope.getHotNewsOnClick($scope.hnewsid);
    };

    $scope.getHotNewsSummaryData = function (ndid) {
        debugger;
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                if (ndid === 1)
                    $scope.hnewsData1 = hnewsdata;
                else if (ndid === 2)
                    $scope.hnewsData2 = hnewsdata;
                else if (ndid === 3)
                    $scope.hnewsData3 = hnewsdata;
            }
        });
    };

    $scope.getAllTopNews = function () {
        HotnewsServiceFactory.getAllTopNews().then(function (newsData) {

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
                for (var i = 0; i < $scope.hnewsTitle.length; i++)
                    $scope.getHotNewsSummaryData($scope.hnewsTitle[i].ndid);
            }
        });
    };

    $scope.getTopNewsByID = function (newsid) {
        debugger;
        $window.ga('send', 'event', 'Detailnews Page', 'Top News By Id');
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
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


    var trigger = $('.hamburger'),
         overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {
        $window.ga('send', 'event', 'Detailnews Page', 'Mobile Menu Closed');
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



    $scope.getHotNewsSummary = function (ndid) {
        $(".hamburger").trigger("click");
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewssummary = false;
                $scope.hnews = true;
                $scope.nstory = false;
                $scope.tpnews = false;
                $scope.hotnews = hnewsdata;
            }
        });
    };

    $scope.getHotNewsOnClick = function (hnid) {
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top-100 }, 2000);
        }
        $window.ga('send', 'event', 'Detailnews Page', 'Hot News On Click');
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
            }
        });
        homeServiceFactory.getAllNewsStory().then(function (newsData) {

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