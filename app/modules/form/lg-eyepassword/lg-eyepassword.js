module.exports = 'lg-eyepassword';
require('./lg-eyepassword.css');
const app = angular.module(module.exports, []);

app.directive('input', ['$injector', function($injector) {
	const $compile = $injector.get('$compile');
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attr, ctrl) {
			if (attr.type !== 'eyepassword') {
				return;
			}
			console.log('input type="eyepassword"', arguments);

			const elt = angular.element('<!-- input type="eyepassword" ng-model="' + attr.ngModel + '" -->' +
				'<lg-eyepassword password="' + attr.ngModel +
				'" placeholder="' + attr.placeholder + '" name="' + attr.name + '"></lg-eyepassword>');
			element.after(elt);
			element.attr('style', 'display: none !important');
			$compile(elt)(scope);

		}
	};

}]);

const lgEyePasswordUrl = require('./tmpl/lg-eyepassword.html');

app.component('lgEyepassword', {
	templateUrl: lgEyePasswordUrl,
	controller: function() {
		console.log('lgEyepassword controller', arguments, this);
		this.show = false;
		this.$onInit = function() {
			console.log('lgEyepassword controller onInit', arguments, this);
		};
		this.toggle = function() {
			console.log('lgEyepassword toggle', arguments, this);
			this.show = !this.show;
		};

	},
	bindings: {
		password: '=',
		placeholder: '@',
		name: '@',
	}
});
