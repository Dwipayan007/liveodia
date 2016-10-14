'use strict';
LiveOdiaApp.controller('adminController', ['$scope', '$rootScope', 'adminServiceFactory', function ($scope, $rootScope, adminServiceFactory) {

    //Save new file 
    $scope.hotnews = {};
    $scope.Newstory = {};
    $scope.Topnews = {};
    $scope.hnewsTitle = {};
    $scope.selectedOption;
    $scope.ntitle = "";
    $scope.mesgHnews = "";
    $scope.mesgTnews = "";
    $scope.mesgNnews = "";
    $scope.loader = {
        loading1: false,
        loading2: false,
        loading3: false,
    };
    $scope.changeOption = function () {
        debugger;
        $scope.ntitle = $scope.selectedOption.ndid;
    };

    $scope.AddNewCategory = function (cname) {
        adminServiceFactory.AddCategory(cname).then(function (data) {

        });
    }

    $scope.submitHotNews = function () {
        debugger;
        $scope.loader.loading1 = true;
        var file = {};
        file = $scope.hotnews;
        file["HotNews"] = "hnews";

        file["selOption"] = $scope.selectedOption.ndid;
        if ($scope.myFile1 != undefined)
            file["file"] = $scope.myFile1;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {
            debugger;
            if (data == "") {
                $scope.loader.loading1 = false;
                $scope.mesgHnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading1 = false;
                $scope.mesgHnews = "Not Successful";
            }
            file = null;
            $scope.hotnews = {};
            $scope.resetForm("submitHotNews");
        });
    };

    $scope.submitNewstory = function () {
        debugger;
        $scope.loader.loading2 = true;
        var file = {};
        file = $scope.Newstory;
        file["Newstory"] = "nstory";
        if ($scope.myFile2 != undefined)
            file["file"] = $scope.myFile2;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {
            debugger;
            if (data == "") {
                $scope.loader.loading2 = false;
                $scope.mesgNnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading2 = false;
                $scope.mesgNnews = "Not Successful";
            }
            file = null;
            $scope.Newstory = {};
            $scope.resetForm('submitNewstory');
        });
    };

    $scope.getAllHotNewsTitle = function () {
        debugger;
        adminServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                debugger;
                $scope.hnewsTitle = hnewsdata;
                $scope.selectedOption = $scope.hnewsTitle[0];
            };
        })
    };

    $scope.submitTopNews = function () {
        debugger;
        $scope.loader.loading3 = true;
        var file = {};
        file = $scope.Topnews;
        file["TopNews"] = "tnews";
        if ($scope.myFile3 != undefined)
            file["file"] = $scope.myFile3;
        adminServiceFactory.uploadFileToUrl(file).then(function (data) {
            debugger;
            if (data == "") {
                $scope.loader.loading3 = false;
                $scope.mesgTnews = "Uploaded Successfully";
            }
            else {
                $scope.loader.loading3 = false;
                $scope.mesgTnews = "Not Successful";
            }
            file = null;
            $scope.Topnews = {};
            $scope.resetForm("submitTopNews");
        });
    };
    $scope.getAllHotNewsTitle();

    $scope.resetForm = function (filereset) {
        if (filereset == "submitNewstory") {
            angular.element(document.querySelector('#file2')).val(null);
            $scope.myFile2 = undefined;
        }
        else if (filereset == "submitTopNews")
            angular.element(document.querySelector('#file3')).val(null);
        else if (filereset == "submitHotNews")
            angular.element(document.querySelector('#file1')).val(null);
    };

}]);
