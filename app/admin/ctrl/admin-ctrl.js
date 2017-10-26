export function AdminCtrl($scope, $stateParams, adminUser, adminLoader, adminCarrier, adminProposal) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
	ctrl.$onInit = function() {
		adminUser.list().then(function(list) {
			ctrl.user = list;
			ctrl.user.total = ctrl.user.length;
			console.log('ctrl.user.count', ctrl.user.count);
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminLoader.list().then(function(list) {
			ctrl.loader = list;
			ctrl.loader.total = ctrl.loader.length;
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			ctrl.carrier.total = ctrl.carrier.length;			
			console.log('ctrl.carrier', ctrl.carrier);
		}).catch(function(error) {
			console.error('error', error);
		});
		adminProposal.list().then(function(list) {
			ctrl.proposal = list;
			ctrl.proposal.total = ctrl.proposal.length;						
			console.log('ctrl.proposal', ctrl.proposal);
		}).catch(function(error) {
			console.error('error', error);
		});
		$scope.date = new Date();
	};
}

