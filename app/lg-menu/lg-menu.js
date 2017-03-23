'use strict';

require('./lg-menu.scss');
module.exports = 'lg-menu';

window.mobilecheck = function() {
	var check = false;
	/* eslint-disable */
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	/* eslint-enable */
	return check;
};

var app = angular.module(module.exports, []);

var lgMenuUrl = require('./tmpl/lg-menu.html');

app.run(function($transitions, $rootScope, carrier) {
	'ngInject';
	$transitions.onStart({}, function(trans) {
		$rootScope.isBackPresent = true;
		console.log('onStart', arguments);
		var from = trans.$from();
		console.log('from', from);
		var to = trans.$to();
		console.log('to', to);
		if (from.noBackForNextState) {
			$rootScope.isBackPresent = false;
		}
		if (from.component === 'lgMessage') {
			$rootScope.isBackPresent = false;
		}
		if (from.component === 'lgConfirm') {
			$rootScope.isBackPresent = false;
		}
		if (to.component === 'lgMessage') {
			$rootScope.isBackPresent = false;
		}

		if (from.name.substr(0, 7) === 'carrier' && to.name.substr(0, 7) !== 'carrier') {
			if (carrier.type === 'update') {
				carrier.initCreateData();
			}
		}
	});
});

// permet de récuperer les valeurs en post sous format json
app.component('lgMenu', {
	templateUrl: lgMenuUrl,
	controller: function LgMenuCtrl($element, $scope, $state, $rootScope, $timeout, user, carrier, loader, proposal) {
		'ngInject';
		this.user = user;
		this.carrier = carrier;
		this.loader = loader;
		this.proposal = proposal;
		console.log('LgMenuCtrl', arguments);
		var ctrl = this;

		ctrl.myCarriers = [];
		ctrl.myLoaders = [];
		ctrl.myProposals = [];
		console.log('user', user);
		ctrl.refreshNotifications = function() {
			ctrl.myCarriers = [];
			ctrl.myLoaders = [];
			user.waitForCheckConnection().then(function() {
				return $timeout(function() { }, 1000);
			}).then(function(carriers) {
				return carrier.list({
					accountId: user.account.id
				});
			}).then(function(carriers) {
				console.log('carriers', carriers);
				ctrl.myCarriers = carriers;
			}).then(function() {
				return loader.list({
					accountId: user.account.id
				});
			}).then(function(loaders) {
				console.log('loaders', loaders);
				ctrl.myLoaders = loaders;
			}).then(function() {
				return proposal.list({
					accountId: user.account.id
				});
			}).then(function(proposals) {
				console.log('proposals', proposals);
				ctrl.myProposals = proposals;
			}).catch(function(error) {
				console.error('error', error);
			});
		};

		this.isMenuOn = false;

		this.toggle = function() {
			console.log('toggle', arguments);
			ctrl.isMenuOn = !ctrl.isMenuOn;
			if (ctrl.isMenuOn) {
				ctrl.lgMenuContentElt.css('display', 'block');
				ctrl.refreshNotifications();
			} else {
				console.log('off', arguments);
				ctrl.isMenuOn = false;
				ctrl.lgMenuContentElt.css('display', 'none');
			}

		};

		this.refresh = function() {
			console.log('refresh', arguments);
			ctrl.isSmallScreen = window.innerWidth < 768;
			ctrl.isMobile = window.mobilecheck() || ctrl.isSmallScreen;
			ctrl.isLandscape = window.innerWidth > window.innerHeight;
			ctrl.innerHeight = window.innerHeight;
			console.log('ctrl.isSmallScreen', ctrl.isSmallScreen);
			console.log('ctrl.isMobile', ctrl.isMobile);
			console.log('ctrl.isLandscape', ctrl.isLandscape);
			console.log('ctrl.innerHeight', ctrl.innerHeight);
		};

		window.onresize = function(event) {
			ctrl.refresh();
			$scope.$apply();
		};
		ctrl.refresh();

	}
});

app.component('lgMenuContent', {
	require: {
		lgMenu: '^^lgMenu',
	},
	controller: ['$element', function LgMenuContentCtrl($element) {
		console.log('lgMenuContent ctrl', arguments, this);
		this.$onInit = function() {
			this.lgMenu.lgMenuContentElt = $element;
		};

	}]
});
