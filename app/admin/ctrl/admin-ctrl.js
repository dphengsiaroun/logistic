export function AdminCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
}

export function AdminLoginCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
}

export function AdminUsersCtrl($stateParams, user) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.$onInit = function() {
        
    };
}

export function AdminLoadersCtrl($stateParams, user, connection, loader) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.loader = loader;
    ctrl.$onInit = function() {
        connection.waitForCheckConnection().then(function() {
            return loader.list({
                userId: user.current.id
            });
        }).then(function(loaders) {
            
            ctrl.loaders = loaders;
        }).catch(function(error) {
            console.error('error', error);
        });
    };
}

export function AdminCarriersCtrl($stateParams, user, connection, carrier) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.carrier = carrier;
    ctrl.$onInit = function() {
        connection.waitForCheckConnection().then(function() {
            return carrier.list({
                userId: user.current.id
            });
        }).then(function(carriers) {
            
            ctrl.carriers = carriers;
        }).catch(function(error) {
            console.error('error', error);
        });             
    };
}

export function AdminTrucksCtrl($stateParams, user, truck) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.truck = truck;
    ctrl.$onInit = function() {
        
        ctrl.truck.list();        
    };
}

export function AdminProposalsCtrl($stateParams, user, connection, proposal) {
    'ngInject';
    const ctrl = this;
    ctrl.user = user;
    ctrl.proposal = proposal;
    ctrl.$onInit = function() {
        connection.waitForCheckConnection().then(function() {
            return proposal.list();
        }).then(function(proposals) {
            
            ctrl.proposals = proposals;
        }).catch(function(error) {
            console.error('error', error);
        });  
    };
}
