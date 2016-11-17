(function() {
	'use strict';

	var app = angular.module('lg-menu', []);

// permet de récuperer les valeurs en post sous format json
	app.directive('lgMenu', ['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');

		return {
			restrict: 'A',
			controller: ['$element', function($element) {
				console.log('lgMenu controller', arguments);
				this.toggle = function() {
					console.log('toggle', arguments);
				};
			}],
			controllerAs: 'lgMenu',
			link: function(scope, element, attrs) {
				console.log('lgMenu link', arguments);
				element.css('cursor', 'pointer');
			}
		};
	}]);

	

})();
