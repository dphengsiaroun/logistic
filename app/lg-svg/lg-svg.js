'use strict';

module.exports = 'lg-svg';

var app = angular.module(module.exports, []);

// permet de récuperer les valeurs en post sous format json
app.directive('lgSvg', function($http, $compile) {
	'ngInject';

	return {
		restrict: 'C',
		link: function(scope, element, attrs) {
			console.log('lg-svg link', arguments);
			var url = element.attr('src');
			var comment = '<!-- lg-svg: replaced ' + element[0].outerHTML + ' -->';

			$http.get(url).then(function(response) {
				var svg = angular.element(comment + response.data);
				var svgElt = svg.contents().parent();
				svgElt.addClass('ng-cloak');
				element.replaceWith(svg);
				$compile(svg)(scope);
			}).catch(function(error) {
				console.log('error', error);
			});
		}
	};
});

