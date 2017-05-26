'use strict';

var app = angular.module('lg-carrier');

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
            service: function(user, carrier) {
                'ngInject';
                return user.waitForCheckConnection().then(function() {
                    var login = user.current.content.login;
                    console.log('login', login);
                    var state = 'carrier:list({login: \'' + login + '\'})';
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
                var result = {};
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
            service: function(user, carrier) {
                'ngInject';
                return user.waitForCheckConnection().then(function() {
                    var login = user.current.content.login;
                    console.log('login', login);
                    var state = 'carrier:list({login: \'' + login + '\'})';
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
	var ctrl = this;
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

app.controller('CarrierCtrl', ['$scope', '$injector', function CarrierCtrl($scope, $injector) {
    var ctrl = this;
    ctrl.carrier = $injector.get('carrier');
    ctrl.user = $injector.get('user');
    ctrl.isEditable = false;
    var $stateParams = $injector.get('$stateParams');
    console.log('ctrl.carrier', ctrl.carrier);
    console.log('$stateParams', $stateParams);
    ctrl.$onInit = function() {
        ctrl.carrier.get($stateParams.id).then(function() {
            return ctrl.user.waitForCheckConnection();
        }).then(function() {
            ctrl.isEditable = (ctrl.carrier.current.content.userId === ctrl.user.current.id);
            console.log('ctrl.isEditable', ctrl.isEditable);
        });
    };
}]);

var carrierListUrl = require('./tmpl/carrier-list.html');
var carrierDetailUrl = require('./tmpl/carrier-detail.html');

app.component('lgCarrierListRoute', {
    templateUrl: carrierListUrl,
    controller: 'CarrierListCtrl',
});

app.component('lgCarrierRetrieveRoute', {
    templateUrl: carrierDetailUrl,
    controller: 'CarrierCtrl',
});
