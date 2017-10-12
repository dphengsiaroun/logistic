

export function TruckListCtrl($scope, user, truck) {
	'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
}

export function TruckCtrl($stateParams, truck, user) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id);
    };
}

export function TruckCreateCtrl($scope, user, truck, formValidator) {
    'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.fv = formValidator;
}

export function TruckUpdateCtrl($scope, $stateParams, truck, user, connection) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;

    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection('TruckUpdateCtrl');
        }).then(function() {
            ctrl.truck.updateData = angular.copy(ctrl.truck.current);
            ctrl.truck.updateData.id = $stateParams.id;
            
        }).catch(function() {
            console.error('you should not see this');
        });
    };
}
