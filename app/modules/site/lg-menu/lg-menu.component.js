import './lg-menu.scss';

import lgMenuHtml from './tmpl/lg-menu.html';

export const lgMenu = {
	template: lgMenuHtml,
	controller: function LgMenuCtrl($element, $scope, $state, $rootScope,
		$timeout, $window, user, carrier, loader, proposal, connection) {

		'ngInject';
		const ctrl = this;
		ctrl.user = user;
		ctrl.carrier = carrier;
		ctrl.loader = loader;
		ctrl.proposal = proposal;
		console.log('LgMenuCtrl', arguments);

		ctrl.myCarriers = [];
		ctrl.myLoaders = [];
		ctrl.myProposals = [];

		ctrl.refreshNotifications = function() {
			console.log('refreshNotifications');
			ctrl.myCarriers = [];
			ctrl.myLoaders = [];
			ctrl.myProposals = [];
			connection.waitForCheckConnection().then(function() {
				return $timeout(function() {}, 2000);
			}).then(function(carriers) {
				return carrier.list({
					userId: user.current.id
				});
			}).then(function(carriers) {
				ctrl.myCarriers = carriers;
				console.log('ctrl.myCarriers', ctrl.myCarriers);
			}).then(function(loaders) {
				return loader.list({
					userId: user.current.id
				});
			}).then(function(loaders) {
				ctrl.myLoaders = loaders;
				console.log('ctrl.myLoaders', ctrl.myLoaders);
			}).then(function(proposals) {
				return proposal.list({
					userId: user.current.id
				});
			}).then(function(proposals) {
				ctrl.myProposals = proposals;
				console.log('ctrl.myProposals', ctrl.myProposals);
			}).catch(function(error) {
				console.error('error', error);
			});
		};
		ctrl.isMenuOn = false;

		ctrl.toggle = function() {
			console.log('toggle', arguments);
			console.log('ctrl.lgMenuContentElt', ctrl.lgMenuContentElt);
			console.log('1 ctrl.isMenuOn', ctrl.isMenuOn);
			ctrl.isMenuOn = !ctrl.isMenuOn;
			console.log('2 ctrl.isMenuOn', ctrl.isMenuOn);
			if (ctrl.isMenuOn) {
				ctrl.lgMenuContentElt.css('display', 'block');
				if (ctrl.user.current) {
					ctrl.refreshNotifications();
				}
			} else {
				console.log('off', arguments);
				ctrl.isMenuOn = false;
				ctrl.lgMenuContentElt.css('display', 'none');
			}

		};

		ctrl.off = function() {
			console.log('off', arguments);
			if (ctrl.isMenuOn === true) {
				ctrl.isMenuOn = false;
				ctrl.lgMenuContentElt.css('display', 'none');
				return true;
			}
			return false;
		};

		this.refresh = function() {
			console.log('refresh', arguments);
			ctrl.isSmallScreen = $window.innerWidth < 768;
			ctrl.isMobile = $window.mobilecheck() || ctrl.isSmallScreen;
			ctrl.isLandscape = $window.innerWidth > $window.innerHeight;
			ctrl.innerHeight = $window.innerHeight;
			// console.log('ctrl.isSmallScreen', ctrl.isSmallScreen);
			// console.log('ctrl.isMobile', ctrl.isMobile);
			// console.log('ctrl.isLandscape', ctrl.isLandscape);
			// console.log('ctrl.innerHeight', ctrl.innerHeight);
		};

		$window.onresize = function(event) {
			ctrl.refresh();
			$scope.$apply();
		};
		ctrl.refresh();

	}
};

