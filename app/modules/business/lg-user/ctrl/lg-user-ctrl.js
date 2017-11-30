function initCtrl(ctrl, $scope, $injector) {
	ctrl.user = $injector.get('user');
	ctrl.connection = $injector.get('connection');
	ctrl.afterConnect = $injector.get('afterConnect');
	ctrl.user.error = undefined;
	$scope.$watch('$ctrl.user.signupData.content.login', function() {
	
		ctrl.user.signupData.content.login = angular.lowercase(ctrl.user.signupData.content.login);
	});
	$scope.$watch('$ctrl.user.updateData.content.login', function() {
		
		
		ctrl.user.updateData.content.login = angular.lowercase(ctrl.user.updateData.content.login);
	});
	$scope.$watch('$ctrl.connection.user', function() {
		if (ctrl.connection.user) {
			ctrl.user.updateData = angular.copy(ctrl.connection.user);
		}
	});
}

export function UserCtrl($scope, $injector, formValidator) {
	'ngInject';
	initCtrl(this, $scope, $injector);
	this.fv = formValidator;
}
