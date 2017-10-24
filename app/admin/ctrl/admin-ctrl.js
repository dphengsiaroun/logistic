export function AdminCtrl($stateParams, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
}

export function AdminConnectionCtrl($stateParams, adminConnection, adminUser, adminCarrier) {
	'ngInject';
	const ctrl = this;
	ctrl.adminConnection = adminConnection;
	ctrl.adminUser = adminUser;
	console.log('ctrl.adminConnection', ctrl.adminConnection);
	console.log('ctrl.adminUser', ctrl.adminUser);
}

export function AdminUsersCtrl($stateParams, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
	ctrl.$onInit = function() {

	};
}

export function AdminLoadersCtrl($stateParams, adminUser, adminConnection, adminLoader) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
	ctrl.adminLoader = adminLoader;
	ctrl.$onInit = function() {
		adminLoader.list().then(function(list) {
			ctrl.loader = list;
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}

export function AdminCarriersCtrl($stateParams, adminUser, adminConnection, adminCarrier) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
	ctrl.adminConnection = adminConnection;
	ctrl.adminCarrier = adminCarrier;
	console.log('AdminCarriersCtrl');
	ctrl.$onInit = function() {
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			console.log('ctrl.list', ctrl.list);
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
