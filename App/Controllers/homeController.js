LiveOdiaApp.controller('homeController', ['$scope', '$rootScope', '$location', '$anchorScroll', '$route', '$routeParams', '$window', 'homeServiceFactory', 'HotnewsServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, $route, $routeParams, $window, homeServiceFactory, HotnewsServiceFactory, mobileCheck) {
    $window.ga('send', 'HomePage', $location.path());
    $scope.mobile = mobileCheck;
    $scope.hotNews = [];
    $scope.topstories = [];
    $scope.newsories = [];
    $scope.filteredNews = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.fullnews = [];
    $scope.cleanData = [];
    $scope.topnews = [];
    $scope.hotnews = [];
    $scope.newstory = [];
    $scope.letterLimit = 120;
    $scope.impnewsLimit = 10;
    $scope.tpnews = false;
    $scope.hnews = false;
    $scope.nstory = false;
    $scope.ipnews = false;
    $scope.isClosed = false;
    $scope.impnews = [];
    $scope.imnews = [];

    $scope.GetImpNewsById = function (inid) {
        $window.ga('send', 'event', 'home', 'Get Imp News by Id');
        homeServiceFactory.GetImpNewsById(inid).then(function (newsData) {
            if (newsData) {
                $scope.imnews = newsData;
                $scope.ipnews = true;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
            }
        });
    };

    if ($scope.mobile) {
        $anchorScroll.yOffset = 20;
        $anchorScroll();
    }

    $scope.getImpNews = function () {
        homeServiceFactory.getImpNews().then(function (newsData) {
            if (newsData) {
                $scope.impnews = newsData;
            }
        });
    };

    $scope.DeleteNewsStory = function (nsid) {
        homeServiceFactory.DeleteNewsStory(nsid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    };

    $scope.DeleteTopNews = function (tnid) {
        homeServiceFactory.DeleteTopNews(tnid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.tpnews = true;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
            }
        });
    };
    $scope.DeleteHotNews = function (hnid) {
        homeServiceFactory.DeleteHotNews(hnid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    };

    $scope.getAllNews = function () {
        homeServiceFactory.getAllNews().then(function (newsData) {
            if (newsData) {
                $scope.topstories = newsData;
                $scope.getHotNewsTitle();
            }
        });
        homeServiceFactory.getAllNewsStory().then(function (newsData) {
            if (newsData) {
                $scope.nstory = true;
                $scope.ipnews = false;
                $scope.newstory = newsData;
            }
        });
    };

    //Get top news by tnid
    $scope.getTopNewsByID = function (newsid) {
        $window.ga('send', 'event', 'home', 'Get Top News by Id');
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.tnews = result;
            }
        });
    };

    //Get Title for hot news
    $scope.getHotNewsTitle = function () {
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hotNews = hnewsdata;
            }
        });
    };

    var trigger = $('.hamburger'),
        overlay = $('.overlay');

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {
        $window.ga('send', 'event', 'home', 'Mobile Menu Clicked');
        if ($scope.isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            $scope.isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            $scope.isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });

    //get All hot summary news by ndid
    $scope.getHotNewsSummary = function (ndid) {
        $window.ga('send', 'event', 'home', 'Get Hot News by Id');
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = true;
                $scope.hnewsDetail = hnewsdata;
            }
        });
    };
    $scope.getImpNews();
    $scope.getAllNews();




    //$scope.FormatData();
}]);
//}]).filter('orderObjectBy', function () {
//    return function (items, field, reverse) {
//        var filtered = [];
//        angular.forEach(items, function (item) {
//            filtered.push(item);
//        });
//        if (items[0].newstory) {
//            filtered.sort(function (a, b) {
//                return (a.newstory[field] > b.newstory[field] ? 1 : -1);
//            });
//        }
//        if (items[0].topnews) {
//            filtered.sort(function (a, b) {
//                return (a.topnews[field] > b.topnews[field] ? 1 : -1);
//            });
//        }
//        //if (items.topnews) {//For hot News
//        //    filtered.sort(function (a, b) {
//        //        return (a.topnews[field] > b.topnews[field] ? 1 : -1);
//        //    });
//        //}
//        if (reverse) filtered.reverse();
//        return filtered;
//    };
//});