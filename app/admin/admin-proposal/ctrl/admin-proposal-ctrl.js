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