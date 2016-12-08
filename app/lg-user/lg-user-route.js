(function() {
	'use strict';

	var app = angular.module('lg-user');

	app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
			name: 'user:signin',
			url: '/signin',
			component: 'lgUserSigninRoute'
		});
		$stateProvider.state({
			name: 'user:signup',
			url: '/signup',
			component: 'lgUserSignupRoute'
		});
		$stateProvider.state({
			name: 'user:signupSuccess',
			url: '/signup',
			component: 'lgUserSignupSuccessRoute'
		});
		$stateProvider.state({
			name: 'user:signout',
			url: '/signout',
			component: 'lgUserSignoutRoute'
		});
		$stateProvider.state({
			name: 'user:retrieve',
			url: '/profile',
			component: 'lgUserRetrieveRoute'
		});
		$stateProvider.state({
			name: 'user:updated',
			url: '/profile',
			component: 'lgUserUpdatedRoute'
		});
		$stateProvider.state({
			name: 'user:confirmDelete',
			url: '/profile',
			component: 'lgUserConfirmDeletedRoute'
		});
		$stateProvider.state({
			name: 'user:deleted',
			url: '/profile',
			component: 'lgUserDeletedRoute'
		});
	
	}]);

	app.component('lgUserSigninRoute', {
		templateUrl: 'lg-user/tmpl/signin.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserSignupRoute', {
		templateUrl: 'lg-user/tmpl/signup.html',
		controller: 'UserCtrl'
	});
	app.component('lgUserSignupSuccessRoute', {
		templateUrl: 'lg-user/tmpl/signup_success.html',
		controller: ['$injector', function User($injector) {
			this.state = 'home';
			this.label = 'Accueil';
			this.message = 'Votre compte a bien été crée&nbsp;!';
		}]
	});

	app.component('lgUserSignoutRoute', {
		templateUrl: 'lg-widget/tmpl/lg-prompt.html',
		controller: ['$injector', function User($injector) {
			this.user = $injector.get('user');
			var $rootScope = $injector.get('$rootScope');
			this.doNo = function() {
				$rootScope.back();
			};
			this.doYes = function() {
				this.user.signout();
			};
			this.questionMsg = 'Voulez vous vraiment vous déconnecter&nbsp;?';
		}]
	});

	app.component('lgUserRetrieveRoute', {
		templateUrl: 'lg-user/tmpl/profile.html',
		controller: 'UserUpdateCtrl'
	});

	app.component('lgUserUpdatedRoute', {
		templateUrl: 'lg-user/tmpl/update_success.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserConfirmDeletedRoute', {
		templateUrl: 'lg-widget/tmpl/lg-confirm.html',
		controller: ['$injector', function User($injector) {
			this.user = $injector.get('user');
			var $state = $injector.get('$state');
			this.doCancel = function() {
				$state.go('user:retrieve');
			};
			this.doConfirm = function() {
				this.user.delete();
			};
			this.confirmationMsg = 'Voulez-vous vraiment supprimer votre compte&nbsp;?';
			this.cancelMsg = 'Non, annuler';
			this.confirmMsg = 'Oui, supprimer';
		}]
	});

	app.component('lgUserDeletedRoute', {
		templateUrl: 'lg-widget/tmpl/lg-message.html',
		controller: ['$injector', function User($injector) {
			this.state = 'home';
			this.label = 'Accueil';
			this.message = 'Votre compte a bien été supprimé.';
		}]
	});

	
	
	

})();
