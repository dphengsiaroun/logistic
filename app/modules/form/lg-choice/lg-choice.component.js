import lgGeoloc from '../../technic/lg-geoloc/geoloc.service.js';

import './lg-choice.scss';
module.exports = 'lg-choice';

const removeDiacritic = function(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const app = angular.module(module.exports, ['lg-misc', lgGeoloc]);

import lgChoiceHtml from './tmpl/lg-choice.html';

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
			
			$element.find('input')[0].blur();
		};

		ctrl.scrollTopList = function() {
			fixedListElt[0].scrollTop = 0;
		};

		ctrl.start = function() {
			
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
				// 
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
					elt.removeClass('empty');
				} else {
					elt.addClass('empty');
				}
				checkValidity(1);
			};
			

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
