export function AdminCtrl($stateParams, adminUser) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
}

export function AdminConnectionCtrl($stateParams, adminUser) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
}

export function AdminUsersCtrl($stateParams, adminUser) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.$onInit = function() {
        
    };
}

export function AdminLoadersCtrl($stateParams, adminUser, connection, loader) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.loader = loader;
    ctrl.$onInit = function() {
        connection.waitForCheckConnection().then(function() {
            return loader.list({
                adminUserId: adminUser.current.id
            });
        }).then(function(loaders) {
            
            ctrl.loaders = loaders;
        }).catch(function(error) {
            console.error('error', error);
        });
    };
}

export function AdminCarriersCtrl($stateParams, adminUser, connection, carrier) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.carrier = carrier;
    ctrl.$onInit = function() {
        connection.waitForCheckConnection().then(function() {
            return carrier.list({
                adminUserId: adminUser.current.id
            });
        }).then(function(carriers) {
            
            ctrl.carriers = carriers;
        }).catch(function(error) {
            console.error('error', error);
        });             
    };
}

export function AdminTrucksCtrl($stateParams, adminUser, truck) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.truck = truck;
    ctrl.$onInit = function() {
        
        ctrl.truck.list();        
    };
}

export function AdminProposalsCtrl($stateParams, adminUser, connection, proposal) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
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
