const app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state({
        name: 'carrier:list',
        url: '/ads/carriers',
        component: 'lgCarrierListRoute'
    });
    $stateProvider.state({
        name: 'carrier:retrieve',
        url: '/carrier/{id}',
        component: 'lgCarrierRetrieveRoute'
    });
    $stateProvider.state({
        name: 'carrier:updated',
        url: '/updated-carrier',
        component: 'lgMessage',
        resolve: {
            service: function(connection, user, carrier) {
                'ngInject';
                return connection.waitForCheckConnection().then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'carrier:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Revenir à la liste des transports',
                        message: 'Votre annonce de transport a bien été modifiée.'
                    };
                });
            }
        }
    });
    $stateProvider.state({
        name: 'carrier:delete',
        url: '/carrier/{id}/delete',
        component: 'lgConfirm',
        resolve: {
            service: function($rootScope, carrier, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $rootScope.back();
                };
                result.doConfirm = function() {
                    carrier.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de transport&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
    $stateProvider.state({
        name: 'carrier:deleted',
        url: '/deleted-carrier',
        component: 'lgMessage',
        resolve: {
            service: function(connection, user, carrier) {
                'ngInject';
                return connection.waitForCheckConnection().then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'carrier:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Revenir à la liste des transports',
                        message: 'Votre annonce de transport a bien été supprimée.'
                    };
                });
            }
        }
    });
}]);

app.controller('CarrierListCtrl', function CarrierListCtrl(carrier) {
	'ngInject';
	const ctrl = this;
    ctrl.carrier = carrier;
    ctrl.$onInit = function() {
        carrier.list().then(function(carriers) {
			console.log('carriers', carriers);
			ctrl.carriers = carriers;
		}).catch(function(error) {
			console.error('error', error);
		});
    };
});

app.controller('CarrierCtrl', function CarrierCtrl($scope, $injector, connection) {
	'ngInject';
    const ctrl = this;
    ctrl.carrier = $injector.get('carrier');
    ctrl.user = $injector.get('user');
    ctrl.isEditable = false;
    const $stateParams = $injector.get('$stateParams');
    console.log('ctrl.carrier', ctrl.carrier);
    console.log('$stateParams', $stateParams);
    ctrl.$onInit = function() {
        ctrl.carrier.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection();
        }).then(function() {
            ctrl.isEditable = (ctrl.carrier.current.content.userId === ctrl.user.current.id);
            console.log('ctrl.isEditable', ctrl.isEditable);
        }).catch(function() {
            ctrl.isEditable = false;
            console.log('ctrl.isEditable', ctrl.isEditable);
        });
    };
});

const carrierListUrl = require('./tmpl/carrier-list.html');
const carrierDetailUrl = require('./tmpl/carrier-detail.html');

app.component('lgCarrierListRoute', {
    templateUrl: carrierListUrl,
    controller: 'CarrierListCtrl',
});

app.component('lgCarrierRetrieveRoute', {
    templateUrl: carrierDetailUrl,
    controller: 'CarrierCtrl',
});
