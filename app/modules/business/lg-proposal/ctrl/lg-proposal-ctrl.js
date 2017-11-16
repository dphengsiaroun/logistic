export function ProposalCtrl($scope, $injector, connection, proposal) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = proposal;
	ctrl.connection = connection;
	ctrl.isEditable = false;
	const $stateParams = $injector.get('$stateParams');
	
	
	ctrl.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection();
		}).then(function() {
			ctrl.isEditable = (ctrl.proposal.current.content.userId === ctrl.connection.user.id);
			
		});
	};
}

export function ProposalCreateCtrl($scope, $window, $stateParams, proposal, 
	connection, loader, carrier, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = proposal;
	ctrl.loader = loader;
	ctrl.carrier = carrier;
	ctrl.fv = formValidator;
	
	this.$onInit = function() {
		
		connection.waitForCheckConnection('ProposalCreateCtrl').then(function() {
			console.log('youpi');
			ctrl.proposal.createData.name = connection.user.content.login;
			ctrl.proposal.createData.email = connection.user.email;
			ctrl.proposal.createData.proposalAccountId = connection.user.id;
			ctrl.proposal.createData.adId = $stateParams.id;

			console.log('$stateParams.type', $stateParams.type);

			if ($stateParams.type === 'loader') {
				ctrl.proposal.createData.titleAd = ctrl[$stateParams.type].current.content.title;
			} else {
				ctrl.proposal.createData.titleAd = ctrl[$stateParams.type].current.content.truck.name;
			}

			if ($stateParams.type === 'loader') {
				ctrl.proposal.createData.imageUrl = ctrl[$stateParams.type].current.content.image.url;
			} else {
				ctrl.proposal.createData.imageUrl = ctrl[$stateParams.type].current.content.truck.image.url;
			}
			ctrl.proposal.createData.adAccountId = ctrl[$stateParams.type].current.content.userId;
			ctrl.proposal.createData.adType = $stateParams.type;
			
			
		}).catch(function() {
			console.error('you should not see this');
		});
	};
}

export function ProposalUpdateCtrl($scope, $stateParams, 
	proposal, connection, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = proposal;
	ctrl.fv = formValidator;	
	this.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection('ProposalUpdateCtrl');
		}).then(function() {
			ctrl.proposal.updateData = angular.copy(ctrl.proposal.current.content);
			ctrl.proposal.updateData.id = $stateParams.id;
			
		}).catch(function() {
			console.error('you should not see this');
		});
	};
}
