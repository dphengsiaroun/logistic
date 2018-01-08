export function AdminProposalsCtrl($stateParams, adminProposal) {
	'ngInject';
	const ctrl = this;
	ctrl.adminProposal = adminProposal;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 50;
			ctrl.limit = moreData > ctrl.proposal.length ? ctrl.proposal.length : moreData;
	};

	ctrl.$onInit = function() {
		adminProposal.list().then(function(list) {
			ctrl.proposal = list;
			ctrl.limit();
			console.log('ctrl.proposal', ctrl.proposal);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}