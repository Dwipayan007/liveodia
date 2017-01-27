LiveOdiaApp.controller('homeController', ['$scope', '$rootScope', '$location', '$anchorScroll', '$route', '$routeParams', '$window','$uibModal', 'homeServiceFactory', 'HotnewsServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, $route, $routeParams, $window,$uibModal, homeServiceFactory, HotnewsServiceFactory, mobileCheck) {
    $window.ga('send', 'HomePage', $location.path());
    $scope.mobile = mobileCheck;
    $scope.hotNews = [];
	$scope.vvnews=[];
    $scope.topstories = [];
    $scope.newsories = [];
    $scope.filteredNews = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.fullnews = [];
	$scope.vinews=[];
    $scope.cleanData = [];
    $scope.topnews = [];
    $scope.hotnews = [];
    $scope.newstory = [];
	$scope.hnewsData=[];
	$scope.morenews=[];
	$scope.relatedNews = [];
    $scope.letterLimit = 120;
    $scope.impnewsLimit = 10;
    $scope.tpnews = false;
 	$scope.rid = null;
  	$scope.rfnews = false;
    $scope.hnews = false;
    $scope.nstory = false;
    $scope.ipnews = false;
    $scope.isClosed = false;
	$scope.hnewsdetail=false;
    $scope.impnews = [];
    $scope.imnews = [];
    $scope.rating = 5;

    $scope.getRating = function () {
        debugger;
        $scope.rating = 6;
    };
    $scope.rateFunction = function (rating) {
        $scope.startrating = rating;
    };

	$scope.open = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editnews.html',
            controller: 'editNewsController',
            resolve: {
                impnews: function () {
                    return $scope.imnews;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };

    $scope.editTopNews = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editTopNews.html',
            controller: 'editTopNewsController',
            resolve: {
                tnews: function () {
                    return $scope.tnews;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };
   
 $scope.clicked = function ($event) {
        var a = jQuery($event.target);
        var p = a.next("#panel");
         p.stop().slideToggle(300);
    };

    $scope.GetImpNewsById = function (inid, rid) {
 	$scope.rid = rid;
 		if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top-100 }, 2000);
			$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(e){
				if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove"){
					$("html,body").stop();
				}
        	});
        }
		if (rid != 0 || rid != null) {
            homeServiceFactory.getRelatedNews(rid).then(function (rnews) {
				debugger;
                $scope.relatedNews = rnews;
            });
        }
        $window.ga('send', 'event', 'home', 'Get Imp News by Id');
        homeServiceFactory.GetImpNewsById(inid).then(function (newsData) {
            if (newsData) {
                $scope.imnews = newsData;
				if ($scope.imnews[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.imnews[0].mycolor
                    };
                }
                $scope.ipnews = true;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
 				$scope.rfnews = false;
            }
        });
    };
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
            }
        });
    };
    //$scope.getImpNews = function () {
        //homeServiceFactory.getImpNews().then(function (newsData) {
          //  if (newsData) {
             //   $scope.impnews = newsData;
				//$scope.vinews = $scope.impnews.splice(0,$scope.impnews.length - 1);
 				//$scope.morenews = $scope.vinews.splice(0, $scope.vinews.length - 5);
           // }
        //});
   // };
 	$scope.getImpNews = function () {
			debugger;
			homeServiceFactory.getImpNews().then(function (newsData) {
				if (newsData) {
					$scope.inews = _.find(newsData, { priority: "1" });
					$scope.impnews = newsData;
					if ($scope.impnews[0].mycolor) {
						$scope.CustomStyle = {
							'color': $scope.impnews[0].mycolor
						};
					}
					$scope.vinews= _.reject($scope.impnews, { priority: null });
					$scope.vinews = _.reject($scope.vinews, { priority: "1" });
					$scope.vvnews = _.reject($scope.impnews, { priority: null });
					$scope.morenews = $scope.impnews.splice(0, $scope.impnews.length - 5);
				}
			});
		};


$scope.DeleteImpNews = function (inid) {
        homeServiceFactory.DeleteImpNews(inid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    }

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
    $scope.getTopNewsByID = function (newsid, rid) {
		 $scope.rid = rid;
 		if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top-100 }, 2000);
			$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(e){
				if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove"){
					$("html,body").stop();
				}
        	});
        }
		if (rid != 0 && rid != null) {
            homeServiceFactory.getRelatedNews(rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }
        $window.ga('send', 'event', 'home', 'Get Top News by Id');
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
				$scope.rfnews = false;
                $scope.hnewsdetail = false;
                $scope.tnews = result;
				if ($scope.tnews[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.tnews[0].mycolor
                    };
                }
            }
        });
    };

		 $scope.getHotNewsSummaryData = function (ndid) {
			homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
				if (hnewsdata) {
					if (ndid === 1)
						$scope.hnewsData1 = hnewsdata;
					else if (ndid === 2)
						$scope.hnewsData2 = hnewsdata;
					else if (ndid === 3)
						$scope.hnewsData3 = hnewsdata;
					else if (ndid === 4)
						$scope.hnewsData4 = hnewsdata;
					else if (ndid === 5)
						$scope.hnewsData5 = hnewsdata;
					else if (ndid === 6)
						$scope.hnewsData6 = hnewsdata;
					else if (ndid === 7)
						$scope.hnewsData7 = hnewsdata;
				}
			});
    };
    //Get Title for hot news
    $scope.getHotNewsTitle = function () {
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hotNews = hnewsdata;
 				for (var i = 0; i < $scope.hotNews.length; i++)
                    $scope.getHotNewsSummaryData($scope.hotNews[i].ndid);
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
 $scope.getHotNewsSummaryLast = function (ndid) {
        debugger;

        $window.ga('send', 'event', 'home', 'Get Hot News by Id');
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsdetail = false;
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = true;

                $scope.hnewsDetail = hnewsdata;

            }
        });

    };
    $scope.getHotNewsByID = function (hnid) {
        debugger;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
            $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
                if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove") {
                    $("html,body").stop();
                }
            });
        }
        $window.ga('send', 'event', 'detailhotnews', 'Hot News By Id');
        HotnewsServiceFactory.getHotNewsSummary(hnid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsDetail = [];
                $scope.hnewsdetail = true;
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = false;
     			$scope.rfnews = false;
                $scope.hnewsDetail = hnewsdata;
            }
        });
    };
    //get All hot summary news by ndid
    $scope.getHotNewsSummary = function (ndid) {
		 if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top-100 }, 2000);
			$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(e){
				if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove"){
					$("html,body").stop();
				}
        	});
        }
        $(".hamburger").trigger("click");
        $window.ga('send', 'event', 'home', 'Get Hot News by Id');
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = true;
     			$scope.rfnews = false;
                $scope.hnewsDetail = hnewsdata;
            }
        });
    };
    $scope.getImpNews();
    $scope.getAllNews();

    //home slider js

    $(document).ready(function () {
        debugger;
        var clickEvent = false;
        $('#myCarousel').carousel({
            interval: 4000
        }).on('click', '.list-group li', function () {
            clickEvent = true;
            $('.list-group li').removeClass('active');
            $(this).addClass('active');
        }).on('slid.bs.carousel', function (e) {
            if (!clickEvent) {
                var count = $('.list-group').children().length - 1;
                var current = $('.list-group li.active');
                current.removeClass('active').next().addClass('active');
                var id = parseInt(current.data('slide-to'));
                if (count == id) {
                    $('.list-group li').first().addClass('active');
                }
            }
            clickEvent = false;
        });
    })

    $(window).load(function () {
        var boxheight = $('#myCarousel .carousel-inner').innerHeight();
        var itemlength = $('#myCarousel .item').length;
        var triggerheight = Math.round(boxheight / itemlength + 1);
        $('#myCarousel .list-group-item').outerHeight(triggerheight);
    });

}]);
