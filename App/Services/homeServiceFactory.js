'use strict';
LiveOdiaApp.factory('homeServiceFactory', ['$http', '$q', 'baseService', function ($http, $q, baseService) {
    debugger;
    var baseService = baseService;
    //var baseService = "http://www.liveodia.co/";
    var homeServiceFactory = {};
    var _getAllNews = function () {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/home').success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _getAllNewsStory = function () {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/NewStory').success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };


    var _DeleteNewsStory = function (id) {
        debugger;
        var deffer = $q.defer();
        $http.delete(baseService + 'api/NewStory/' + id).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _DeleteTopNews = function (id) {
        debugger;
        var deffer = $q.defer();
        $http.delete(baseService + 'api/home/' + id).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };
    var _DeleteHotNews= function (id) {
        debugger;
        var deffer = $q.defer();
        $http.delete(baseService + 'api/HotNews/' + id).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _getTopNewsByID = function (nid) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/home/' + nid).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        })

        return deffer.promise;
    };

    var _getAllHotNews = function () {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/admin2/').success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        })

        return deffer.promise;
    };

    var _getHotNewsSummary = function (ndid) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/HotNews/' + ndid).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        })
        return deffer.promise;
    };

    homeServiceFactory.DeleteTopNews = _DeleteTopNews;
    homeServiceFactory.DeleteHotNews = _DeleteHotNews;
    homeServiceFactory.DeleteNewsStory = _DeleteNewsStory;
    homeServiceFactory.getAllHotNews = _getAllHotNews;
    homeServiceFactory.getAllNewsStory = _getAllNewsStory;
    homeServiceFactory.getAllNews = _getAllNews;
    homeServiceFactory.getTopNewsByID = _getTopNewsByID;
    homeServiceFactory.getHotNewsSummary = _getHotNewsSummary;

    return homeServiceFactory;
}]);