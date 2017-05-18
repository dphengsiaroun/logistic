'use strict';

var app = angular.module('lg-truck');

app.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state({
        name: 'truck:list',
        url: '/{login}/truck',
        component: 'lgTruckListRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'truck:retrieve',
        url: '/{login}/truck/{id}',
        component: 'lgTruckRetrieveRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'truck:create',
        url: '/create-truck',
        component: 'lgTruckCreateRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'truck:created',
        url: '/created-truck',
        component: 'lgMessage',
        resolve: {
            service: function(user, context) {
                'ngInject';
                var login = user.account.content.login;
                console.log('login XXXXXX', login);
                var state = context.pop();
                if (state === undefined) {
                    state = 'truck:list({login: \'' + login + '\'})';
                }
                console.log('state', state);
                return {
                    state: state,
                    label: '<i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Continuer',
                    message: 'Votre véhicule a bien été ajouté.'
                };
            }
        },
        needsUser: true
    });
    $stateProvider.state({
        name: 'truck:update',
        url: '/{login}/truck/{id}/update',
        component: 'lgTruckUpdateRoute'
    });
    $stateProvider.state({
        name: 'truck:updated',
        url: '/updated-truck',
        component: 'lgMessage',
        resolve: {
            service: function(user, truck) {
                'ngInject';
                return user.waitForCheckConnection().then(function() {
                    var login = user.account.content.login;
                    console.log('login', login);
                    var state = 'truck:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Revenir à la liste des véhicules',
                        message: 'Votre véhicule a bien été modifié.'
                    };
                });
            }
        }
    });
    $stateProvider.state({
        name: 'truck:delete',
        url: '/{login}/truck/{id}/delete',
        component: 'lgConfirm',
        resolve: {
            service: function($rootScope, truck, $stateParams) {
                'ngInject';
                var result = {};
                result.doCancel = function() {
                    $rootScope.back();
                };
                result.doConfirm = function() {
                    truck.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer ce véhicule&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
    $stateProvider.state({
        name: 'truck:deleted',
        url: '/deleted-truck',
        component: 'lgMessage',
        resolve: {
            service: function(user, truck) {
                'ngInject';
                return user.waitForCheckConnection('truck:deleted').then(function() {
                    var login = user.account.content.login;
                    console.log('login', login);
                    var state = 'truck:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Revenir à la liste des véhicules',
                        message: 'Votre véhicule a bien été supprimé.'
                    };
                });
            }
        }
    });

}]);

app.controller('TruckListCtrl', function TruckCtrl($scope, user, truck) {
	'ngInject';
	var ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
});

app.controller('TruckCtrl', function TruckCtrl($stateParams, truck, user) {
    'ngInject';
    var ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id);
    };
});

app.controller('TruckCreateCtrl', function TruckCtrl($scope, user, truck) {
    'ngInject';
	var ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
});

app.controller('TruckUpdateCtrl', function TruckUpdateCtrl($scope, $stateParams, truck, user) {
    'ngInject';
    var ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;

    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id).then(function() {
            return ctrl.user.waitForCheckConnection('TruckUpdateCtrl');
        }).then(function() {
            ctrl.truck.updateData = angular.copy(ctrl.truck.current);
            ctrl.truck.updateData.id = $stateParams.id;
            console.log('ctrl.truck.updateData', ctrl.truck.updateData);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
});

var truckCreateUrl = require('./tmpl/truck-create.html');
var truckListUrl = require('./tmpl/truck-list.html');
var truckDetailUrl = require('./tmpl/truck-detail.html');
var truckUpdateUrl = require('./tmpl/truck-update.html');

app.component('lgTruckCreateRoute', {
    templateUrl: truckCreateUrl,
    controller: 'TruckCreateCtrl',
});

app.component('lgTruckListRoute', {
    templateUrl: truckListUrl,
    controller: 'TruckListCtrl',
});

app.component('lgTruckRetrieveRoute', {
    templateUrl: truckDetailUrl,
    controller: 'TruckCtrl',
});

app.component('lgTruckUpdateRoute', {
    templateUrl: truckUpdateUrl,
    controller: 'TruckUpdateCtrl',
});
