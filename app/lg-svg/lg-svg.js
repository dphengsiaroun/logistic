(function() {
	'use strict';

	var app = angular.module('lg-svg', []);

// permet de récuperer les valeurs en post sous format json
	app.directive('lgSvg', ['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');

		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				console.log('lg-svg link', arguments);
            	var c = element.attr('class');
            	var url = element.attr('src');
				var comment = '<!-- lg-svg: replaced ' + element[0].outerHTML + ' -->';

				$http.get(url).then(function(response) {
					var svg = angular.element(comment + response.data);
					console.log('svg', svg);
					element.replaceWith(svg);
				}).catch(function(error) {
					console.log('error', error);
				});
			}
		};
	}]);

	

})();