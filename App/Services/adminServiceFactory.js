﻿
LiveOdiaApp.factory('adminServiceFactory', ['$http', '$q', 'baseService', function ($http, $q, baseService) {
    //var baseService = baseService;
    //var baseService = "http://www.liveodia.co/";
    var adminServiceFactory = {};
    //File Upload
    var getModelAsFormData = function (data) {

        var dataAsFormData = new FormData();
        if (data.HotNews) {
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("hotNews", data.HotNews);
            dataAsFormData.append("title", data.title);
            if (data.hsub)
                dataAsFormData.append("hsub", data.hsub);
            dataAsFormData.append("selOption", data.selOption);
            dataAsFormData.append("hfullNews", data.hnewsTotal);
        }
        if (data.Newstory) {
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("Newstory", data.Newstory);
            dataAsFormData.append("title", data.ntitle);
            if (data.nsub)
                dataAsFormData.append("nsub", data.nsub);
            dataAsFormData.append("nstory", data.newstory);
        }
        if (data.TopNews) {
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("Topnews", data.TopNews);
            dataAsFormData.append("title", data.ttitle);
            if (data.tsub)
                dataAsFormData.append("tsub", data.tsub);
            dataAsFormData.append("tnews", data.topnews);
        }
        return dataAsFormData;
    };
    //File Upload Service
    var _uploadFileToUrl = function (file) {

        var deffer = $q.defer();
        $http({
            url: baseService + 'api/admin2/',
            method: "POST",
            data: getModelAsFormData(file),
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (result, status) {

            deffer.resolve(result, status);
        }).error(function (result, status) {
            deffer.reject(result);
        });
        return deffer.promise;
    };

    var _getHotFullNewsTitle = function () {

        var deffer = $q.defer();
        $http.get(baseService + 'api/HotNews').success(function (data, status) {
            deffer.resolve(data);
        }).error(function (err, status) {
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _AddCategory = function (cname) {
        var deffer = $q.defer();
        //var data = { cname };
        $http.post(baseService + 'api/home/', JSON.stringify(cname), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).success(function (data, status) {

            deffer.resolve(data, status);
        }).error(function (result, status) {
            deffer.reject(result);
        });
        return deffer.promise;
    };
    var _updateNewsDate = function (newsdate) {
        var deffer = $q.defer();
        $http.post(baseService + 'api/HnewsSummary/', JSON.stringify({ 'newsDate': newsdate }), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).success(function (data, status) {
            deffer.resolve(data, status);
        }).error(function (result, status) {
            deffer.reject(result);
        });
        return deffer.promise;
    };
    adminServiceFactory.updateNewsDate = _updateNewsDate;
    adminServiceFactory.AddCategory = _AddCategory;
    adminServiceFactory.getHotFullNewsTitle = _getHotFullNewsTitle;
    adminServiceFactory.uploadFileToUrl = _uploadFileToUrl;

    return adminServiceFactory;
}]);