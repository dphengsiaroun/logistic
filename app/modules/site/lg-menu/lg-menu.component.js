import './lg-menu.scss';

import lgMenuHtml from './tmpl/lg-menu.html';

export const lgMenu = {
	template: lgMenuHtml,
	controller: function LgMenuCtrl($element, $scope, $state, $rootScope,
		$timeout, $window, user, carrier, loader, proposal, connection, lgMobile) {

		'ngInject';
		const ctrl = this;
		ctrl.user = user;
		ctrl.carrier = carrier;
		ctrl.loader = loader;
		ctrl.proposal = proposal;
		

		ctrl.myCarriers = [];
		ctrl.myLoaders = [];
		ctrl.myProposals = [];

		ctrl.refreshNotifications = function() {
			
			connection.waitForCheckConnection().then(function(carriers) {
				return carrier.list({
					userId: user.current.id
				});
			}).then(function(carriers) {
				ctrl.myCarriers = carriers;
				
			}).then(function(loaders) {
				return loader.list({
					userId: user.current.id
				});
			}).then(function(loaders) {
				ctrl.myLoaders = loaders;
				
			}).then(function(proposals) {
				return proposal.list({
					userId: user.current.id
				});
			}).then(function(proposals) {
				ctrl.myProposals = proposals;
				
			}).catch(function(error) {
				
			});
		};
		ctrl.refreshNotifications();
		ctrl.isMenuOn = false;

		ctrl.toggle = function() {
			
			
			
			ctrl.isMenuOn = !ctrl.isMenuOn;
			
			if (ctrl.isMenuOn) {
				ctrl.lgMenuContentElt.css('display', 'block');
				if (ctrl.user.current) {
					ctrl.refreshNotifications();
				}
			} else {
				
				ctrl.isMenuOn = false;
				ctrl.lgMenuContentElt.css('display', 'none');
			}

		};

		ctrl.off = function() {
			
			if (ctrl.isMenuOn === true) {
				ctrl.isMenuOn = false;
				ctrl.lgMenuContentElt.css('display', 'none');
				return true;
			}
			return false;
		};

		this.refresh = function() {
			
			ctrl.isSmallScreen = $window.innerWidth < 768;
			ctrl.isMobile = lgMobile.isMobile() || ctrl.isSmallScreen;
			ctrl.isLandscape = $window.innerWidth > $window.innerHeight;
			ctrl.innerHeight = $window.innerHeight;
			// 
			// 
			// 
			// 
		};

		$window.onresize = function(event) {
			ctrl.refresh();
			$scope.$apply();
		};
		ctrl.refresh();

	}
};

