module.exports = 'lg-erasable';

const app = angular.module(module.exports, []);

app.directive('lgErasable', () => {
	'ngInject';
	return {
        restrict: 'A',
		controller: function LgErasableCtrl($element) {
			'ngInject';
            console.log('LgErasableCtrl', arguments);

            $element.after('<i class="fa fa-times-circle erasable" aria-hidden="true"></i>');
		}
	};
});
