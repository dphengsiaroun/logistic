const lgGeoloc = require('../../technic/lg-geoloc/lg-geoloc.js');

require('./lg-choice.scss');
module.exports = 'lg-choice';

const removeDiacritic = function(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const app = angular.module(module.exports, ['lg-misc', lgGeoloc]);

app.directive('input', ['$injector', function($injector) {
	const $compile = $injector.get('$compile');
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attr, ctrl) {
			if (attr.type !== 'choice') {
				return;
			}
			let requiredAttr = '';
			if (element.prop('required')) {
				console.log('required');
				requiredAttr = ' is-mandatory="true" ';
			}
			let optionsAttr = '';
			if (attr.options) {
				console.log('options');
				optionsAttr = 'options="' + attr.options + '" ';
			}
			let nameAttr = '';
			if (attr.name) {
				console.log('name');
				nameAttr = 'name="' + attr.name + '" ';
			}
			const elt = angular.element('<!-- input type="choice" ng-model="' + attr.ngModel + '" -->' +
				'<lg-choice ' +
				nameAttr +
				'placeholder="' + attr.placeholder + '" ' +
				'choices="' + attr.choices + '" ' +
				'title="' + attr.title + '" ' +
				'ng-model="' + attr.ngModel + '" ' +
				requiredAttr +
				optionsAttr +
				'></lg-choice>');
			element.after(elt);
			element.attr('style', 'display: none !important');
			$compile(elt)(scope);
		}
	};

}]);

const lgChoiceHtml = require('./tmpl/lg-choice.html');

app.component('lgChoice', {
	require: {
		ngModel: 'ngModel',
	},
	template: lgChoiceHtml,
	controller: function LgChoiceWrapperCtrl($scope, $element, $window, $http, $rootScope, lgScroll, geoloc) {
		'ngInject';
		const ctrl = this;
		const fixedListElt = $element.find('fixed-list');

		ctrl.showLgChoice = false;
		ctrl.defaultsOptions = {
			place: false
		};

		ctrl.closeInput = function() {
			console.log('closeInput');
			$element.find('input')[0].blur();
		};

		ctrl.scrollTopList = function() {
			fixedListElt[0].scrollTop = 0;
		};

		ctrl.start = function() {
			console.log('start');
			lgScroll.save();
			ctrl.showLgChoice = true;
			ctrl.setNormalMode();
		};

		ctrl.stop = function() {
			lgScroll.restore();
			ctrl.showLgChoice = false;
			ctrl.closeInput();
		};

		ctrl.update = function(choice) {
			console.log('update', arguments);
			ctrl.stop();

			ctrl.ngModel.$setViewValue(choice);
			ctrl.ngModel.$render();
			// because we have no blur event, then we must set the touched ourselves.
			ctrl.ngModel.$setTouched();
		};

		ctrl.isProximityMode = false;

		ctrl.setProximityMode = function() {
			ctrl.isProximityMode = true;
			geoloc.guessCity().then(function(displayCity) {
				ctrl.myChoices = [displayCity];
			}).catch(function(error) {
				console.error('error', error);
			});
		};

		ctrl.setNormalMode = function() {
			ctrl.isProximityMode = false;
			ctrl.myChoices = ctrl.choices;
		};

		ctrl.geoloc = function() {
			if (ctrl.isProximityMode) {
				ctrl.setNormalMode();
				return;
			}
			ctrl.setProximityMode();
		};

		ctrl.getLabel = function(label) {
			if (label === undefined) {
				return '';
			}
			if (ctrl.defaultsOptions.label) {
				return ctrl.defaultsOptions.label.apply(null, arguments);
			}
			return label;
		};

		ctrl.getIcon = function() {
			if (ctrl.defaultsOptions.icon) {
				// console.log('ctrl.getIcon', ctrl.defaultsOptions.icon.apply(null, arguments));
				return ctrl.defaultsOptions.icon.apply(null, arguments);
			}
			return '';
		};

		ctrl.getLabelToFilter = function(label) {
			if (label === undefined) {
				return '';
			}
			if (ctrl.defaultsOptions.labelToFilter) {
				return ctrl.defaultsOptions.labelToFilter.apply(null, arguments);
			}
			return label;
		};

		ctrl.$onInit = function() {
			const ngModel = ctrl.ngModel;
			angular.extend(ctrl.defaultsOptions, ctrl.options);

			ctrl.setNormalMode();

			function checkValidity(value) {
				// const isOutOfChoice = true;
				// ngModel.$setValidity('outOfChoice', isOutOfChoice);
			}

			ngModel.$render = function() {
				const choice = (ngModel.$viewValue === '') ? undefined : ngModel.$viewValue;
				ctrl.currentValue = ctrl.getLabel(choice) || ctrl.placeholder;
				const elt = $element.find('my-input');
				if (choice !== undefined) {
					console.log('filled');
					elt.addClass('filled');
				} else {
					console.log('not filled');
					elt.removeClass('filled');

				}
				checkValidity(1);
			};
			console.log('ngModel', ngModel);

			ctrl.myFilter = function(value, index, array) {
				if (ngModel.$modelValue !== undefined && ngModel.$modelValue === value) {
					return false;
				}
				if (ctrl.myInput === undefined) {
					return true;
				}
				const label = ctrl.getLabelToFilter(value);
				if (removeDiacritic(label.toLowerCase()).indexOf(removeDiacritic(ctrl.myInput.toLowerCase())) !== -1) {
					return true;
				}
				return false;
			};
		};
	},
	bindings: {
		name: '@',
		title: '@',
		options: '<',
		choices: '<',
		placeholder: '@',
		isMandatory: '<',
	}
});
