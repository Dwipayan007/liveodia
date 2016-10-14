/// <reference path="../app.js" />
LiveOdiaApp.factory('detailTopnewsService', ['$http', '$q', function ($http, $q) {
    //var baseService = "http://www.liveodia.co/";
    var baseService = "http://localhost:51999/";
    var detailTopnewsFactory = {};
    var _getTopDetailNews = function (id) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/topDetailNews/' + id).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };
    detailTopnewsFactory.getTopDetailNews = _getTopDetailNews;


    return detailTopnewsFactory;
}]);
