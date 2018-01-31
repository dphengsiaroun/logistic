export function AdminProposalsCtrl($filter, $stateParams, adminProposal, exportToCsv) {
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
		ctrl.limit = moreData > ctrl.proposals.length ? ctrl.proposals.length : moreData;
	};

	ctrl.$onInit = function() {
		adminProposal.list().then(function(proposals) {
			ctrl.proposals = proposals;
			ctrl.limit();
			console.log('ctrl.proposals', ctrl.proposals);
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	ctrl.export2Csv = () => {
		console.log('export2Csv');

		let csv = ctrl.proposals.map((proposal) => {
			return [
				proposal.id,
				proposal.content.titleAd,
				(proposal.content.adType === 'loader') ? 'Chargeur' : 'Transporteur',
				`"${proposal.content.message.replace(/"/g, '')}"`,
				proposal.content.name,
				proposal.to,
				$filter('date')(new Date(proposal.content.created_t * 1000), `EEEE d LLLL yyyy à H'h'`)
			];
		}).join('\n');
		csv = `Sep=,
ID,TITRE DE L'ANNONCE,TYPE D'ANNONCE,MESSAGE,PROPOSEUR,ANNONCEUR,DATE
` + csv;

		exportToCsv.export(csv);
	};

}
