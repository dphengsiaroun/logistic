(function() {
	'use strict';

	console.log('Coucou');

	$(window).load(function() {
		$('.flexslider').flexslider();
	});

	var app = angular.module('mainApp', []);

	app.directive('jlgHeader', function() {
		console.log('Hello');
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-header.html'
		};
	});

	app.directive('jlgFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-footer.html'
		};
	});

})();
