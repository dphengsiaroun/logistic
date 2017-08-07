export function config($stateProvider) {
    'ngInject';
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

}

import truckCreateHtml from './tmpl/truck-create.html';
import truckListHtml from './tmpl/truck-list.html';
import truckDetailHtml from './tmpl/truck-detail.html';
import truckUpdateHtml from './tmpl/truck-update.html';
import * as ctrlLib from './ctrl/lg-truck-ctrl.js';

export const lgTruckCreateRoute =  {
    template: truckCreateHtml,
    controller: ctrlLib.TruckCreateCtrl,
};

export const lgTruckListRoute = {
    template: truckListHtml,
    controller: ctrlLib.TruckListCtrl,
};

export const lgTruckRetrieveRoute = {
    template: truckDetailHtml,
    controller: ctrlLib.TruckCtrl,
};

export const lgTruckUpdateRoute = {
    template: truckUpdateHtml,
    controller: ctrlLib.TruckUpdateCtrl,
};
