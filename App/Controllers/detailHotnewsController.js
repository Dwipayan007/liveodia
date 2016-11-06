
LiveOdiaApp.controller('detailHotnewsController', ['$scope', '$rootScope', '$location', '$routeParams', '$anchorScroll', '$window', '$uibModal', 'HotnewsServiceFactory', 'sharedService', 'homeServiceFactory', function ($scope, $rootScope, $location, $routeParams, $anchorScroll, $window, $uibModal, HotnewsServiceFactory, sharedService, homeServiceFactory) {
    $window.ga('send', 'detailhotnews', $location.path());
    debugger;
    var matrixParams = getIds($routeParams.ids);
    $scope.newsid = matrixParams.ids;
    $scope.rid = matrixParams.rid;
    $scope.viewActive = $rootScope.hideit;
    $scope.hnewsDetail = [];
    $scope.hnewsTitle = [];
    $scope.hotnews = [];
    $scope.topstories = [];
    $scope.relatedNews = [];
    $scope.hnews = false;
    $scope.hnewssummary = false;
    $scope.tpnews = false;
    $scope.rfnews = false;
    $scope.index = "";
    $scope.hnewsData = [];
    $scope.hnewsid = "";
    $scope.nHNews = "";
    $scope.pHNews = "";
    $scope.editNewstory = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editHotNews.html',
            controller: 'editHotNewsController',
            resolve: {
                hnewsDetail: function () {
                    return $scope.hnewsDetail;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };

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

    $scope.getTopNewsByID = function (newsid, rid) {
        $scope.rid = rid;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        $window.ga('send', 'event', 'detailhotnews', 'Top News By Id');
        if (rid != 0 && rid != null) {
            homeServiceFactory.getRelatedNews(rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.hnews = false;
                $scope.hnewssummary = [];
                $scope.hnewssummary = false;
                $scope.rfnews = false;
                $scope.tnews = result;
            }
        });
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


    $scope.getHotNewsTitle = function () {
        $window.ga('send', 'event', 'detailhotnews', 'All Hot News Title');
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hnewsTitle = [];
                $scope.hnewsTitle = hnewsdata;
                for (var i = 0; i < $scope.hnewsTitle.length; i++)
                    $scope.getHotNewsSummaryData($scope.hnewsTitle[i].ndid);
            }
        });
    };
    //related news
    $scope.getFullRnews = function (fnid) {
        homeServiceFactory.getFullRnews(fnid).then(function (newsData) {
            if (newsData) {
                $scope.rnewsdata = newsData;
                if ($scope.rnewsdata[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.rnewsdata[0].mycolor
                    };
                }
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.rfnews = true;
                $scope.hnewssummary = false;

            }
        });
    };


    $scope.getHotNewsByID = function () {
        debugger;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
            $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
                if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove") {
                    $("html,body").stop();
                }
            });
        }
        $(".hamburger").trigger("click");
        $window.ga('send', 'event', 'detailhotnews', 'Hot News By Id');
        $scope.hnewsid = $scope.newsid;

        if ($scope.rid != 0 && $scope.rid != null) {
            homeServiceFactory.getRelatedNews($scope.rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }

        HotnewsServiceFactory.getHotNewsSummary($scope.newsid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsDetail = [];
                $scope.hnewssummary = true;
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.rfnews = false;
                $scope.hnewsDetail = hnewsdata[0];
                $scope.getHotNewsTitle();
                $scope.getAllTopNews();
                $scope.getHotNewsData();
            }
        });
    };

    $scope.getHotNewsOnClick = function (hnid, rid) {
        debugger;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        $window.ga('send', 'event', 'detailhotnews', 'Hot News Clicked');
        $scope.hnewsid = hnid;  
        $scope.rid = rid;
        if ($scope.rid != 0 && $scope.rid != null) {
            homeServiceFactory.getRelatedNews($scope.rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }

        HotnewsServiceFactory.getHotNewsByID(hnid).then(function (result) {
            if (result) {
                $scope.hnews = false;
                $scope.tpnews = false;
                $scope.hnewssummary = [];
                $scope.hnewssummary = true;
                $scope.rfnews = false;
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


    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;

    trigger.click(function () {
        $window.ga('send', 'event', 'home', 'Mobile Menu Clicked');
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



    $scope.getHotNewsSummary = function (ndid) {
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        $(".hamburger").trigger("click");
        $window.ga('send', 'event', 'detailhotnews', 'hot news Summary');
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewssummary = false;
                $scope.hnews = true;
                $scope.tpnews = false;
                $scope.rfnews = false;
                $scope.hotnews = hnewsdata;
            }
        });
    };
    $scope.getHotNewsByID();
}]);