export function AdminCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}
