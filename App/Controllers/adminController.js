
LiveOdiaApp.controller('adminController', ['$scope', '$rootScope', '$filter', '$location', '$window', '$log', 'adminServiceFactory', 'homeServiceFactory', function ($scope, $rootScope, $filter, $location, $window, $log, adminServiceFactory, homeServiceFactory) {
    $window.ga('send', 'adminview', $location.path());
    $scope.hotnews = {};
    $scope.Newstory = {};
    $scope.Topnews = {};
    $scope.hnewsTitle = {};
    $scope.impnews = {};
    $scope.selectedOption;
    $scope.ntitle = "";
    $scope.relatednews = "";
    $scope.rnewsdata = "";
    $scope.mesgHnews = "";
    $scope.mesgTnews = "";
    $scope.mesgNnews = "";
    $scope.mesgInews = "";
    $scope.impnews.impdate = "";
    $scope.hotnews.nstorydt = "";
    $scope.Newstory.hotnewsdt = "";
    $scope.Topnews.topnewsdt = "";
    $scope.related = [];
    $scope.impnewsDate = new Date();
    $scope.hotnewsDate = new Date();
    $scope.newstoryDate = new Date();
    $scope.topnewsDate = new Date();
    $scope.myDate = new Date();

    $scope.myColor1 = "#000000";

    $scope.$watch('myColor1', function (val) {
        $scope.myColor1 = val;
    });

    $scope.myColor1 = "#000000";

    $scope.$watch('myColor1', function (val) {
        $scope.myColor2 = val;
    });

    $scope.myColor2 = "#000000";

    $scope.$watch('myColor3', function (val) {
        $scope.myColor3 = val;
    });

    $scope.myColor4 = "#000000";

    $scope.$watch('myColor4', function (val) {
        $scope.myColor4 = val;
    });

    $scope.getRelated = function () {
        adminServiceFactory.getRelated().then(function (rdata) {
            // $scope.related[0] = { rid: "0", rnews: "Please Select" };
            $scope.related = rdata;
            $scope.related.splice(0, 0, { rid: "0", rnews: "Please Select" });
            $scope.relatednews = $scope.related[0];
        });
    };
    $scope.changeRelated = function () {
        debugger;
        $scope.rnewsdata = $scope.relatednews.rid;
    };
    $scope.AddNewRelated = function (rdata) {
        adminServiceFactory.AddNewRelated(rdata).then(function (res) {
            if (res)
                $scope.getRelated();
        });
    };
    //$scope.selected = undefined;
    //$scope.countries = [
    // { rnews: 'Afghanistan', rid: '1' },
    // { rnews: 'Antigua and Barbuda', rid: '2' },
    // { rnews: 'Bahamas', rid: '3' },
    // { rnews: 'Cambodia', rid: '4' },
    // { rnews: 'Cape Verde', rid: '5' }
    //];
    //$scope.rnews = [];
    //$scope.getRelatedNews= function () {
    //    debugger;
    //    $scope.allData = [];
    //    adminServiceFactory.getRelatedNews().then(function (data) {
    //        debugger;
    //        $scope.rnews = data;
    //    });
    //};

    //$scope.getRelatedNews();
    //$scope.selected = undefined;
    //$scope.countries = [
    // { ititle: 'Afghanistan', code: 'AF' },
    // { ititle: 'Antigua and Barbuda', code: 'AG' },
    // { ititle: 'Bahamas', code: 'BS' },
    // { ititle: 'Cambodia', code: 'KH' },
    // { ititle: 'Cape Verde', code: 'CV' }
    //];
    //$scope.getAllData = function () {
    //    debugger;
    //    $scope.allData = [];
    //    homeServiceFactory.getImpNews().then(function (data) {
    //        debugger;
    //        $scope.countries = data;
    //    });
    //};
    $scope.myModel = null;
    $scope.myModelId = null;
    $scope.isDisabled = true;

    $scope.tab = 1;

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.loader = {
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false
    };

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());

    $scope.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    };

    $scope.updateDate = function () {
        debugger;
        $scope.SelectedDate = $filter('date')(new Date($scope.myDate), 'dd-MM-yyyy');
        adminServiceFactory.updateNewsDate($scope.SelectedDate).then(function (res) {
            if (res) {
                //$location.path('/admin');
                $location.path('/home');
            }
        });

    };
    $scope.DeleteAllNews = function () {
        adminServiceFactory.DeleteAllNews().then(function (res) {
            if (res) {
                $scope.mesg = "You have deleted all News Please add some fresh news...";
            }
        });
    };

    $scope.changeOption = function () {
        $scope.ntitle = $scope.selectedOption.ndid;
    };

    $scope.AddNewCategory = function (cname) {
        adminServiceFactory.AddCategory(cname).then(function (data) {

        });
    };

    $scope.DownloadNews = function () {
        $scope.SelectedDate = $filter('date')(new Date($scope.myDate), 'dd-MM-yyyy');
        adminServiceFactory.DownloadNews($scope.SelectedDate).then(function (pdfname) {
            var blob = new Blob(([pdfname]), { type: "application/pdf" });
            var fileURL = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = "mynews" + '.pdf';
            document.body.appendChild(a);
            a.click();
            //saveAs(blob, "download.pdf");
        });
    };

    $scope.submitImpNews = function () {
        debugger;
        $scope.impnews.impdate = $filter('date')(new Date($scope.impnewsDate), 'dd-MM-yyyy');
        $scope.loader.loading4 = true;
        var file = {};
        file = $scope.impnews;
        file['myColor'] = $scope.myColor1;
        file["relateNews"] = $scope.relatednews.rid;
        file["ImpNews"] = "Inews";
        if ($scope.myFile4 !== undefined)
            file["file"] = $scope.myFile4;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {
            if (data === "") {
                $scope.loader.loading4 = false;
                $scope.mesgInews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading4 = false;
                $scope.mesgInews = "Not Successful";
            }
            $scope.myColor1 = "#000000";
            file = null;
            $scope.impnews = {};
            $scope.resetForm("submitImpNews");
        });
    };

    $scope.submitHotNews = function () {
        $scope.hotnews.hotnewsdt = $filter('date')(new Date($scope.hotnewsDate), 'dd-MM-yyyy');
        $scope.loader.loading1 = true;
        var file = {};
        file = $scope.hotnews;
        file["HotNews"] = "hnews";
        file["relateNews"] = $scope.relatednews.rid;
        file["selOption"] = $scope.selectedOption.ndid;
        file['myColor'] = $scope.myColor2;
        if ($scope.myFile1 !== undefined)
            file["file"] = $scope.myFile1;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {
            if (data === "") {
                $scope.loader.loading1 = false;
                $scope.mesgHnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading1 = false;
                $scope.mesgHnews = "Not Successful";
            }
            $scope.myColor2 = "#000000";
            file = null;
            $scope.hotnews = {};
            $scope.resetForm("submitHotNews");
        });
    };

    $scope.submitNewstory = function () {
        $scope.Newstory.nstorydt = $filter('date')(new Date($scope.newstoryDate), 'dd-MM-yyyy');
        $scope.loader.loading2 = true;
        var file = {};
        file = $scope.Newstory;
        file["Newstory"] = "nstory";
        file["relateNews"] = $scope.relatednews.rid;
        file['myColor'] = $scope.myColor3;
        if ($scope.myFile2 !== undefined)
            file["file"] = $scope.myFile2;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {

            if (data === "") {
                $scope.loader.loading2 = false;
                $scope.mesgNnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading2 = false;
                $scope.mesgNnews = "Not Successful";
            }
            $scope.myColor3 = "#000000";
            file = null;
            $scope.Newstory = {};
            $scope.resetForm('submitNewstory');
        });
    };

    $scope.getAllHotNewsTitle = function () {

        adminServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsTitle = hnewsdata;
                $scope.selectedOption = $scope.hnewsTitle[0];
            }
        });
    };

    $scope.submitTopNews = function () {
        $scope.Topnews.topnewsdt = $filter('date')(new Date($scope.topnewsDate), 'dd-MM-yyyy');
        $scope.loader.loading3 = true;
        var file = {};
        file = $scope.Topnews;
        file["TopNews"] = "tnews";
        file['myColor'] = $scope.myColor4;
        file["relateNews"] = $scope.relatednews.rid;
        if ($scope.myFile3 !== undefined)
            file["file"] = $scope.myFile3;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {

            if (data === "") {
                $scope.loader.loading3 = false;
                $scope.mesgTnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading3 = false;
                $scope.mesgTnews = "Not Successful";
            }
            file = null;
            $scope.Topnews = {};
            $scope.myColor4 = "#000000";
            $scope.resetForm("submitTopNews");
        });
    };
    $scope.getAllHotNewsTitle();

    $scope.resetForm = function (filereset) {
        if (filereset === "submitNewstory") {
            angular.element(document.querySelector('#file2')).val(null);
            $scope.myFile2 = undefined;
        }
        else if (filereset === "submitTopNews") {
            angular.element(document.querySelector('#file3')).val(null);
            $scope.myFile3 = undefined;
        }
        else if (filereset === "submitHotNews") {
            angular.element(document.querySelector('#file1')).val(null);
            $scope.myFile1 = undefined;
        }
        else if (filereset === "submitImpNews") {
            angular.element(document.querySelector('#file4')).val(null);
            $scope.myFile4 = undefined;
        }
    };
    $scope.getAllData();
    $scope.getRelated();

}]).directive('autocomplete', ['$http', function ($http) {
    return function (scope, element, attrs) {
        element.autocomplete({
            minLength: 3,
            source: function (request, response) {
                var url = "http://localhost/words.php?keyword=" + request.term;
                $http.get(url).success(function (data) {
                    response(data.results);
                });
            },
            focus: function (event, ui) {
                element.val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                scope.myModelId.selected = ui.item.value;
                scope.$apply;
                return false;
            },
            change: function (event, ui) {
                if (ui.item === null) {
                    scope.myModelId.selected = null;
                }
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };
    }
    
}]);//.directive("autoComplete",function(){
//    return function (scope, element, attrs) {
//        debugger;
//        var names = $.map(scope.rnews, function (value) {
//            return value.rnews;
//        });
//        element.autocomplete({
//            source: names
//        });
//    };
//});
//.directive('typeahead', function ($timeout, homeServiceFactory) {
//    debugger;
//    return {
//        restrict: 'AEC',
//        scope: {
//            title: '@',
//            retkey: '@',
//            displaykey: '@',
//            modeldisplay: '=',
//            subtitle: '@',
//            modelret: '='
//        },
//        link: function (scope, elem, attrs) {
//            debugger;
//            scope.current = 0;
//            scope.selected = false;
//            scope.da = function (txt) {
//                scope.ajaxClass = 'loadImage';
//                homeServiceFactory.getImpNews().then(function (data) {
//                    debugger;
//                    scope.TypeAheadData = data;
//                    scope.ajaxClass = '';
//                });

//                // $http({ method: 'Get', url: 'Account_JSON?AccName=' + txt }).
//                //success(function (data, status) {
//                // scope.TypeAheadData = data;
//                //scope.ajaxClass = '';
//                //});
//            }
//            scope.handleSelection = function (key, val) {
//                debugger;
//                scope.modelret = key;
//                scope.modeldisplay = val;
//                scope.current = 0;
//                scope.selected = true;
//            }
//            scope.isCurrent = function (index) {
//                return scope.current == index;
//            }
//            scope.setCurrent = function (index) {
//                scope.current = index;
//            }
//        },
//        template: '<input type="text" ng-model="modeldisplay" ng-KeyPress="da(modeldisplay)"  ng-keydown="selected=false"' +
//        'style="width:100%;" ng-class="ajaxClass">' +
//        '<div class="list-group table-condensed overlap" ng-hide="!modeldisplay.length || selected" style="width:100%">' +
//        '<a href="javascript:void();" class="list-group-item noTopBottomPad" ng-repeat="item in TypeAheadData|filter:model  track by $index" ' +
//        'ng-click="handleSelection(item[title],item[title])" style="cursor:pointer" ' +
//        'ng-class="{active:isCurrent($index)}" ' +
//        'ng-mouseenter="setCurrent($index)">' +
//        ' {{item[title]}}<br />' +
//        '<i>{{item[subtitle]}} </i>' +
//        '</a> ' +
//        '</div>' +
//        '</input>'
//    };
//});

