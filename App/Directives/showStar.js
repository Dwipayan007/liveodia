/// <reference path="../app.js" />
LiveOdiaApp.directive('showStar',
	function () {
	    return {
	        restrict: 'A',
	        template: '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
	        scope: {
	            ratingValue: '=',
	            max: '=',
	            onRatingSelected: '&',
                getRating:'&'
	        },
	        link: function (scope, elem, attrs) {
	            var updateStars = function () {
	                scope.stars = [];
	                for (var i = 0; i < scope.max; i++) {
	                    scope.stars.push({
	                        filled: i < scope.ratingValue
	                    });
	                }
	            };
	            scope.getRating();
	            scope.$watch('ratingValue',
					function (oldVal, newVal) {
					    if (newVal) {
					        updateStars();
					    }
					}
				);
	        }
	    };
	}
);