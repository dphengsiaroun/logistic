'use strict';

require('./lg-choice.scss');
module.exports = 'lg-choice';

var removeDiacritic = function(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

var app = angular.module(module.exports, ['lg-misc']);

app.directive('input', ['$injector', function($injector) {
	var $compile = $injector.get('$compile');
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attr, ctrl) {
			if (attr.type !== 'choice') {
				return;
			}
			var requiredAttr = '';
			if (element.prop('required')) {
				console.log('required');
				requiredAttr = ' is-mandatory="true" ';
			}
			var optionsAttr = '';
			if (attr.options) {
				console.log('options');
				optionsAttr = 'options="' + attr.options + '" ';
			}
			var elt = angular.element('<!-- input type="choice" ng-model="' + attr.ngModel + '" -->' +
				'<lg-choice-wrapper ' +
				'placeholder="\'' + attr.placeholder + '\'" ' +
				'choices="' + attr.choices + '" ' +
				'title="\'' + attr.title + '\'" ' +
				'ng-model="' + attr.ngModel + '" ' +
				requiredAttr +
				optionsAttr +
				'></lg-choice-wrapper>');
			element.after(elt);
			element.attr('style', 'display: none !important');
			$compile(elt)(scope);
		}
	};

}]);

var lgChoiceWrapperUrl = require('./tmpl/lg-choice-wrapper.html');

app.component('lgChoiceWrapper', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgChoiceWrapperUrl,
	controller: function LgChoiceWrapperCtrl($scope, $element, $window, $http, $rootScope, lgScroll) {
		'ngInject';
		var ctrl = this;

		ctrl.showLgChoice = false;
		ctrl.defaultsOptions = {
			place: false
		};

		ctrl.start = function() {
			console.log('start');
			lgScroll.save();
			ctrl.showLgChoice = true;
		};

		ctrl.stop = function() {
			lgScroll.restore();
			ctrl.showLgChoice = false;
		};

		ctrl.update = function(choice) {
			ctrl.stop();

			ctrl.ngModel.$setViewValue(choice);
			ctrl.ngModel.$render();
			// because we have no blur event, then we must set the touched ourselves.
			ctrl.ngModel.$setTouched();
		};

		ctrl.geoloc = function() {
			console.log('geoloc', arguments);
			if (!$window.navigator.geolocation) {
				return;
			}
			$window.navigator.geolocation.getCurrentPosition(function(geopos) {
				console.log('getCurrentPosition', arguments);
				$http({
					url: 'http://nominatim.openstreetmap.org/reverse',
					method: 'GET',
					params: {
						format: 'json',
						lat: geopos.coords.latitude,
						lon: geopos.coords.longitude,
						zoom: 18,
						addressdetails: 1
					}
				}).then(function(response) {
					console.log('response', response.data.address.county);
					var city = response.data.address.county;
					if ($rootScope.config.cities.indexOf(city) === -1) {
						$rootScope.config.cities.push(city);
					}

					ctrl.myInput = response.data.address.county;
				}).catch(function(error) {
					console.error('error', error);
				});
			});
		};

		ctrl.$onInit = function() {
			var ngModel = this.ngModel;
			angular.extend(this.defaultsOptions, this.options);

			ngModel.$render = function() {
				var choice = (ngModel.$viewValue === '') ? undefined : ngModel.$viewValue;
				var html = choice || ctrl.placeholder;
				var elt = $element.find('my-input');
				if (choice !== undefined) {
					console.log('filled');
					elt.addClass('filled');
				} else {
					console.log('not filled');
					elt.removeClass('filled');

				}
				elt.html(html);
				// var linkingFn = $compile(elt.contents()); // compare this line with the next one...
				checkValidity(1);
			};
			console.log('ngModel', ngModel);
			var checkValidity = function(value) {
				var isOutOfChoice = false;
				ngModel.$setValidity('outOfChoice', isOutOfChoice);
			};

			ctrl.myFilter = function(value, index, array) {
				if (ngModel.$modelValue !== undefined && ngModel.$modelValue === value) {
					return false;
				}
				if (ctrl.myInput === undefined) {
					return true;
				}
				if (removeDiacritic(value.toLowerCase()).indexOf(removeDiacritic(ctrl.myInput.toLowerCase())) !== -1) {
					return true;
				}
				return false;
			};
		};
	},
	bindings: {
		title: '<',
		options: '<',
		choices: '<',
		placeholder: '<',
		isMandatory: '<',
	}
});

