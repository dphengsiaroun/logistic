export function AdminCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}

export function AdminUsersCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}

export function AdminLoadersCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}

export function AdminCarriersCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}

export function AdminTrucksCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}

export function AdminProposalsCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.admin.get($stateParams.id);
    };
}
