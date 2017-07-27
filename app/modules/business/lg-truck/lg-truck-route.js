const app = angular.module('lg-truck');

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
                const login = user.current.content.login;
                console.log('login XXXXXX', login);
                let state = context.pop();
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
            service: function(user, truck, connection) {
                'ngInject';
                return connection.waitForCheckConnection().then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'truck:list({login: \'' + login + '\'})';
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
                const result = {};
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
            service: function(user, truck, connection) {
                'ngInject';
                return connection.waitForCheckConnection('truck:deleted').then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'truck:list({login: \'' + login + '\'})';
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
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
});

app.controller('TruckCtrl', function TruckCtrl($stateParams, truck, user) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id);
    };
});

app.controller('TruckCreateCtrl', function TruckCtrl($scope, user, truck) {
    'ngInject';
	const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;
});

app.controller('TruckUpdateCtrl', function TruckUpdateCtrl($scope, $stateParams, truck, user, connection) {
    'ngInject';
    const ctrl = this;
    ctrl.truck = truck;
    ctrl.user = user;

    ctrl.$onInit = function() {
        ctrl.truck.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection('TruckUpdateCtrl');
        }).then(function() {
            ctrl.truck.updateData = angular.copy(ctrl.truck.current);
            ctrl.truck.updateData.id = $stateParams.id;
            console.log('ctrl.truck.updateData', ctrl.truck.updateData);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
});

const truckCreateUrl = require('./tmpl/truck-create.html');
const truckListUrl = require('./tmpl/truck-list.html');
const truckDetailUrl = require('./tmpl/truck-detail.html');
const truckUpdateUrl = require('./tmpl/truck-update.html');

app.component('lgTruckCreateRoute', {
    template: truckCreateUrl,
    controller: 'TruckCreateCtrl',
});

app.component('lgTruckListRoute', {
    template: truckListUrl,
    controller: 'TruckListCtrl',
});

app.component('lgTruckRetrieveRoute', {
    template: truckDetailUrl,
    controller: 'TruckCtrl',
});

app.component('lgTruckUpdateRoute', {
    template: truckUpdateUrl,
    controller: 'TruckUpdateCtrl',
});
