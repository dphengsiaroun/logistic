

export function TruckListCtrl($scope, connection, truck) {
	'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.connection = connection;
    this.$onInit = function() {
        this.truck.list();
    };
}

export function TruckCtrl($stateParams, connection, truck) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.connection = connection;
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

export function TruckUpdateCtrl($scope, $stateParams, truck, user, connection, formValidator) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.fv = formValidator;    

    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection('TruckUpdateCtrl');
        }).then(function() {
            ctrl.truck.updateData = angular.copy(ctrl.truck.current);
            ctrl.truck.updateData.id = $stateParams.id;
            console.log('ctrl.truck', ctrl.truck.updateData);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
}
