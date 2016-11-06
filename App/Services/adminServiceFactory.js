
LiveOdiaApp.factory('adminServiceFactory', ['$http', '$q', 'baseService', function ($http, $q, baseService) {
    //var baseService = baseService;
    //var baseService = "http://www.liveodia.co/";
    var adminServiceFactory = {};
    //File Upload
    var getModelAsFormData = function (data) {

        var dataAsFormData = new FormData();
        if (data.ImpNews) {
            if (data.relateNews)
                dataAsFormData.append("relateNews", data.relateNews);
            dataAsFormData.append('todaydate', data.impdate);
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("inews", data.inewsTotal);
            dataAsFormData.append("title", data.title);
            dataAsFormData.append("ImpNews", data.ImpNews);
            if (data.isub)
                dataAsFormData.append("isub", data.isub);
            dataAsFormData.append('myColor', data.myColor);
            dataAsFormData.append("priority", data.priority);
        }
        if (data.HotNews) {
            dataAsFormData.append('todaydate', data.hotnewsdt);
            if (data.relateNews)
                dataAsFormData.append("relateNews", data.relateNews);
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("hotNews", data.HotNews);
            dataAsFormData.append("title", data.title);
            dataAsFormData.append('myColor', data.myColor);
            if (data.hsub)
                dataAsFormData.append("hsub", data.hsub);
            dataAsFormData.append("selOption", data.selOption);
            dataAsFormData.append("hfullNews", data.hnewsTotal);
        }
        if (data.Newstory) {
            dataAsFormData.append('todaydate', data.nstorydt);
            if (data.relateNews)
                dataAsFormData.append("relateNews", data.relateNews);
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("Newstory", data.Newstory);
            dataAsFormData.append("title", data.ntitle);
            dataAsFormData.append('myColor', data.myColor);
            if (data.nsub)
                dataAsFormData.append("nsub", data.nsub);
            dataAsFormData.append("nstory", data.newstory);
        }
        if (data.TopNews) {
            dataAsFormData.append('todaydate', data.topnewsdt);
            if (data.relateNews)
                dataAsFormData.append("relateNews", data.relateNews);
            dataAsFormData.append('file', data.file);
            dataAsFormData.append("Topnews", data.TopNews);
            dataAsFormData.append("title", data.ttitle);
            dataAsFormData.append('myColor', data.myColor);
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

    var _getRelated = function () {
        var deffer = $q.defer();
        $http.get(baseService + 'api/RelatedNews').success(function (data, status) {
            deffer.resolve(data);
        }).error(function (err, status) {
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _AddNewRelated = function (rdata) {
        var deffer = $q.defer();
        $http.post(baseService + 'api/RelatedNews/', JSON.stringify({ 'rdata': rdata }), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).success(function (data, status) {
            deffer.resolve(data, status);
        }).error(function (result, status) {
            deffer.reject(result);
        });
        return deffer.promise;
    };
    var _DownloadNews = function (newsdate) {
        var deffer = $q.defer();
        $http.post(baseService + 'api/DownloadNews/', JSON.stringify({ 'newsDate': newsdate }), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).success(function (data, status) {

            deffer.resolve(data, status);
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

    var _DeleteAllNews = function () {
        var id = 1;
        var deffer = $q.defer();
        $http.delete(baseService + 'api/admin2/' + id).success(function (data, status) {
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

    adminServiceFactory.DownloadNews = _DownloadNews;
    adminServiceFactory.getRelated = _getRelated;
    adminServiceFactory.AddNewRelated = _AddNewRelated;
    adminServiceFactory.DeleteAllNews = _DeleteAllNews;
    adminServiceFactory.updateNewsDate = _updateNewsDate;
    adminServiceFactory.AddCategory = _AddCategory;
    adminServiceFactory.getHotFullNewsTitle = _getHotFullNewsTitle;
    adminServiceFactory.uploadFileToUrl = _uploadFileToUrl;

    return adminServiceFactory;
}]);