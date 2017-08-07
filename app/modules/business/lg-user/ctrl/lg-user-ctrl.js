const app = angular.module('lg-user');

function initCtrl(ctrl, $scope, $injector) {
	ctrl.user = $injector.get('user');
	ctrl.connection = $injector.get('connection');
	ctrl.user.error = undefined;
	$scope.$watch('$ctrl.user.signupData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.signupData.content.login', ctrl.user.signupData.content.login);
		ctrl.user.signupData.content.login = angular.lowercase(ctrl.user.signupData.content.login);
	});
	$scope.$watch('$ctrl.user.updateData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.updateData.content.login', ctrl.user.updateData.content.login);
		ctrl.user.updateData.content.login = angular.lowercase(ctrl.user.updateData.content.login);
	});
	$scope.$watch('$ctrl.user.current', function() {
		if (ctrl.user.current) {
			ctrl.user.updateData = angular.copy(ctrl.user.current);
		}
	});
}

app.controller('UserCtrl', function UserCtrl($scope, $injector, formValidator) {
	'ngInject';
	initCtrl(this, $scope, $injector);
	this.fv = formValidator;
});
