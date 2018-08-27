import './lg-menu.scss';

import lgMenuHtml from './tmpl/lg-menu.html';

export const lgMenu = {
	template: lgMenuHtml,
	controller: function LgMenuCtrl($element, $scope, $state, $rootScope,
		$timeout, $window, carrier, loader, proposal, connection, lgMobile, lgI18n) {

		'ngInject';
		const ctrl = this;
		ctrl.connection = connection;
		ctrl.carrier = carrier;
		ctrl.loader = loader;
		ctrl.proposal = proposal;
		ctrl.lgI18n = lgI18n;
		

		ctrl.myCarriers = [];
		ctrl.myLoaders = [];
		ctrl.myProposals = [];

		ctrl.refreshNotifications = function() {
			
			connection.waitForCheckConnection().then(function(carriers) {
				return carrier.list({
					userId: connection.user.id
				});
			}).then(function(carriers) {
				ctrl.myCarriers = carriers;
				
			}).then(function(loaders) {
				return loader.list({
					userId: connection.user.id
				});
			}).then(function(loaders) {
				ctrl.myLoaders = loaders;
				
			}).then(function(proposals) {
				return proposal.list({
					userId: connection.user.id
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
				if (ctrl.connection.user) {
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

		ctrl.chooseLanguage = function(lang) {
			console.log('chooseLanguage');
			lgI18n.current = lang;
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

		$window.addEventListener('resize', function(event) {
			ctrl.refresh();
			$scope.$apply();
		});
		ctrl.refresh();

	}
};

