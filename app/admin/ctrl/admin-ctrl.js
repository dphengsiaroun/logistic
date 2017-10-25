export function AdminCtrl($stateParams, adminUser, adminLoader, adminCarrier, adminProposal) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
	ctrl.$onInit = function() {
		adminUser.list().then(function(list) {
			ctrl.user = list;
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminLoader.list().then(function(list) {
			ctrl.loader = list;
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			console.log('ctrl.carrier', ctrl.carrier);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminProposal.list().then(function(list) {
			ctrl.proposal = list;
			console.log('ctrl.proposal', ctrl.proposal);
		}).catch(function(error) {
			console.error('error', error);
		});
		
	};
}

export function AdminConnectionCtrl($stateParams, adminConnection, adminUser) {
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
		adminUser.list().then(function(list) {
			ctrl.user = list;
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}

export function AdminLoadersCtrl($stateParams, adminLoader) {
	'ngInject';
	const ctrl = this;
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

export function AdminCarriersCtrl($stateParams, adminCarrier) {
	'ngInject';
	const ctrl = this;
	ctrl.adminCarrier = adminCarrier;
	console.log('AdminCarriersCtrl');
	ctrl.$onInit = function() {
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			console.log('ctrl.carrier', ctrl.carrier);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}

export function AdminProposalsCtrl($stateParams, adminProposal) {
	'ngInject';
	const ctrl = this;
	ctrl.adminProposal = adminProposal;
	ctrl.$onInit = function() {
		adminProposal.list().then(function(list) {
			ctrl.proposal = list;
			console.log('ctrl.proposal', ctrl.proposal);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}
