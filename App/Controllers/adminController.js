
LiveOdiaApp.controller('adminController', ['$scope', '$rootScope', '$filter', '$location', 'adminServiceFactory', function ($scope, $rootScope, $filter, $location, adminServiceFactory) {
    //Save new file 
    $scope.hotnews = {};
    $scope.Newstory = {};
    $scope.Topnews = {};
    $scope.hnewsTitle = {};
    $scope.impnews = {};
    $scope.selectedOption;
    $scope.ntitle = "";
    $scope.mesgHnews = "";
    $scope.mesgTnews = "";
    $scope.mesgNnews = "";
    $scope.mesgInews = "";
    $scope.myDate = new Date();

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
    }
    $scope.changeOption = function () {

        $scope.ntitle = $scope.selectedOption.ndid;
    };

    $scope.AddNewCategory = function (cname) {
        adminServiceFactory.AddCategory(cname).then(function (data) {

        });
    };

    $scope.DownloadNews = function () {
        debugger;
        $scope.SelectedDate = $filter('date')(new Date($scope.myDate), 'dd-MM-yyyy');
        adminServiceFactory.DownloadNews($scope.SelectedDate).then(function (pdfname) {
            debugger;
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
        $scope.loader.loading4 = true;
        var file = {};
        file = $scope.impnews;
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
            file = null;
            $scope.impnews = {};
            $scope.resetForm("submitImpNews");
        });
    };

    $scope.submitHotNews = function () {
        $scope.loader.loading1 = true;
        var file = {};
        file = $scope.hotnews;
        file["HotNews"] = "hnews";
        file["selOption"] = $scope.selectedOption.ndid;
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
            file = null;
            $scope.hotnews = {};
            $scope.resetForm("submitHotNews");
        });
    };

    $scope.submitNewstory = function () {

        $scope.loader.loading2 = true;
        var file = {};
        file = $scope.Newstory;
        file["Newstory"] = "nstory";
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

        $scope.loader.loading3 = true;
        var file = {};
        file = $scope.Topnews;
        file["TopNews"] = "tnews";
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

}]);
