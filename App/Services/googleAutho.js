LiveOdiaApp.service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
    var clientId = '1000608571190-1iim5squphkt602pvgrdseg8celiv4mv.apps.googleusercontent.com',
        apiKey = 'AIzaSyAZujDp1oXdGJHJq7zotO6cJ6RcNAaEhpA',
        //scopes = '{SCOPES}',
        //domain = '{OPTIONAL DOMAIN}',
        deferred = $q.defer();

    //this.login = function () {
    //    debugger;
    //    gapi.auth.authorize({ 
    //        client_id: clientId, 
    //        //scope: scopes, 
    //        immediate: false
    //        //hd: domain 
    //    }, this.handleAuthResult);

    //    return deferred.promise;
    //}

    //this.handleClientLoad = function () {
    //    gapi.client.setApiKey(apiKey);
    //    gapi.auth.init(function () { });
    //    window.setTimeout(checkAuth, 1);
    //};

    //this.checkAuth = function() {
    //    gapi.auth.authorize({ 
    //        client_id: clientId, 
    //        //scope: scopes, 
    //        immediate: true 
    //        //hd: domain 
    //    }, this.handleAuthResult);
    //};

    //this.handleAuthResult = function(authResult) {
    //    if (authResult && !authResult.error) {
    //        var data = {};
    //        gapi.client.load('oauth2', 'v2', function () {
    //            var request = gapi.client.oauth2.userinfo.get();
    //            request.execute(function (resp) {
    //                data.email = resp.email;
    //            });
    //        });
    //        deferred.resolve(data);
    //    } else {
    //        deferred.reject('error');
    //    }
    //};

    //this.handleAuthClick = function(event) {
    //    gapi.auth.authorize({ 
    //        client_id: clientId, 
    //        //scope: scopes, 
    //        immediate: false 
    //        //hd: domain 
    //    }, this.handleAuthResult);
    //    return false;
    //};



    //var clientId = "contact key";
    //var apiKey = "apiKey";
    var scopes = "https://www.googleapis.com/auth/contacts.readonly";
    authorize();
    function authorize() {
        debugger;
        gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthorization);
    }
    function handleAuthorization(authorizationResult) {
        invitePeersController.gmailContacts = [];
        var gmailData = [];
        if (authorizationResult && !authorizationResult.error) {
            var urlContact = "https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=50000&v=3.0";
            var promiseGoogleData = HttpService.httpGetExternalLink(urlContact);
            promiseGoogleData.then(function (response) {
                var jsonChildData = response.data.feed.entry;
                for (var i = 0; i < jsonChildData.length ; i++) {
                    var item = {};
                    try {
                        var name = jsonChildData[i].title.$t;
                        var email = jsonChildData[i].gd$email[0].address;

                        if (name.substring(1, name.length - 1) && email.substring(1, email.length - 1)) {
                            item["name"] = name.substring(1, name.length - 1);
                            item["email"] = email.substring(1, email.length - 1);
                            item["id"] = email.substring(1, email.length - 1).replace(/[^a-zA-Z ]/g, "");
                            invitePeersController.gmailContacts.push(item);
                            gmailData.push(item);
                        }

                    } catch (error) {
                        console.log("Error is thrown while trying to read gmail resposne");
                    }

                }
                $state.go("app.inviteContacts");
                InvitePeersService.setGmailContactsData(invitePeersController.gmailContacts);

                return response;
            })
                    .catch(function (error) {
                        console.log("Something went terribly wrong while trying to get Gmail Data.");
                    });
        }


    }

}]);