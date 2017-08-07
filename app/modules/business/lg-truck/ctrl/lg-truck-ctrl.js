const app = angular.module('lg-truck');

app.controller('TruckListCtrl', function TruckCtrl($scope, user, truck) {
	'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
});

app.controller('TruckCtrl', function TruckCtrl($stateParams, truck, user) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id);
    };
});

app.controller('TruckCreateCtrl', function TruckCtrl($scope, user, truck, formValidator) {
    'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.fv = formValidator;
});

app.controller('TruckUpdateCtrl', function TruckUpdateCtrl($scope, $stateParams, truck, user, connection) {
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
            console.log('ctrl.truck.updateData', ctrl.truck.updateData);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
});
