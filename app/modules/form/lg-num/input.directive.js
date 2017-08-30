export function inputDirective($compile) {
	'ngInject';
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			if (attrs.type !== 'num') {
				return;
			}
			console.log('input type="num"', arguments);
			const myClass = ('vertical' in attrs) ? 'class="vertical"' : '';
			const elt = angular.element('<!-- input type="num" ng-model="' + attrs.ngModel + '" -->' +
				'<lg-num ' + myClass + ' ng-model="' + attrs.ngModel +
				'" options="' + attrs.options +
				'" placeholder="\'' + attrs.placeholder + '\'"></lg-num>');
			element.after(elt);
			element.attr('style', 'display: none !important');
			$compile(elt)(scope);
		}
	};

}
