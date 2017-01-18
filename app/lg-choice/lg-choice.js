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
	controller: ['$scope', '$element', '$injector', function LgChoiceWrapperCtrl($scope, $element, $injector) {
		var lgScroll = $injector.get('lgScroll');
		var self = this;

		this.showLgChoice = false;
		this.defaultsOptions = {
			place: false
		};

		this.start = function() {
			console.log('start');
			lgScroll.save();
			this.showLgChoice = true;
		};

		this.stop = function() {
			lgScroll.restore();
			this.showLgChoice = false;
		};

		this.update = function(choice) {
			this.stop();

			this.ngModel.$setViewValue(choice);
			this.ngModel.$render();
			// because we have no blur event, then we must set the touched ourselves.
			this.ngModel.$setTouched();
		};

		this.$onInit = function() {
			var ctrl = this.ngModel;
			angular.extend(this.defaultsOptions, this.options);

			ctrl.$render = function() {
				var choice = (ctrl.$viewValue === '') ? undefined : ctrl.$viewValue;
				var html = choice || self.placeholder;
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
			console.log('this.ngModel', this.ngModel);
			var checkValidity = function(value) {
				var isOutOfChoice = false;
				ctrl.$setValidity('outOfChoice', isOutOfChoice);
			};

			this.myFilter = function(value, index, array) {
				if (self.ngModel.$modelValue !== undefined && self.ngModel.$modelValue === value) {
					return false;
				}
				if (self.myInput === undefined) {
					return true;
				}
				if (removeDiacritic(value.toLowerCase()).indexOf(removeDiacritic(self.myInput.toLowerCase())) !== -1) {
					return true;
				}
				return false;
			};
		};
	}],
	bindings: {
		title: '<',
		options: '<',
		choices: '<',
		placeholder: '<',
		isMandatory: '<',
	}
});

