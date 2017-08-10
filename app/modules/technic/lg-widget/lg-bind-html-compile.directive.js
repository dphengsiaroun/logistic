export function lgBindHtmlCompile($compile) {
	'ngInject';
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(function() {
				const html = scope.$eval(attrs.lgBindHtmlCompile);
				return html;
			}, function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			});
		}
	};
};
