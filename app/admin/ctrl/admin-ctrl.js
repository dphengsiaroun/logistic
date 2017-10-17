export function AdminCtrl($stateParams, adminUser) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
}

export function AdminConnectionCtrl($stateParams, adminConnection) {
    'ngInject';
    const ctrl = this;
    ctrl.adminConnection = adminConnection;
    console.log('ctrl.adminConnection', ctrl.adminConnection);
}

export function AdminUsersCtrl($stateParams, adminUser) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.$onInit = function() {
        
    };
}

export function AdminLoadersCtrl($stateParams, adminUser, adminConnection, loader) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.loader = loader;
    ctrl.$onInit = function() {
        adminConnection.waitForCheckConnection().then(function() {
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

export function AdminCarriersCtrl($stateParams, adminUser, adminConnection, carrier) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.carrier = carrier;
    ctrl.$onInit = function() {
        adminConnection.waitForCheckConnection().then(function() {
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

export function AdminProposalsCtrl($stateParams, adminUser, adminConnection, proposal) {
    'ngInject';
    const ctrl = this;
    ctrl.adminUser = adminUser;
    ctrl.proposal = proposal;
    ctrl.$onInit = function() {
        adminConnection.waitForCheckConnection().then(function() {
            return proposal.list();
        }).then(function(proposals) {
            
            ctrl.proposals = proposals;
        }).catch(function(error) {
            console.error('error', error);
        });  
    };
}
