export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'loader:list',
        url: '/ads/loaders',
        component: 'lgLoaderListRoute'
    });
    $stateProvider.state({
        name: 'loader:retrieve',
        url: '/loader/{id}',
        component: 'lgLoaderRetrieveRoute'
    });
    $stateProvider.state({
        name: 'loader:create',
        url: '/create-loader',
        component: 'lgLoaderCreateRoute'
    });
    $stateProvider.state({
        name: 'loader:created',
        url: '/created-loader',
        component: 'lgMessage',
        resolve: {
            service: function(user) {
                'ngInject';
                const login = user.current.content.login;
                console.log('login', login);
                const state = 'loader:list({login: \'' + login + '\'})';
                console.log('state', state);
                return {
                    state: state,
                    label: 'Voir les annonces de chargements',
                    message: 'Votre annonce de chargement a bien été ajoutée.'
                };
            }
        },
        needsUser: true
    });
    $stateProvider.state({
        name: 'loader:update',
        url: '/loader/{id}/update',
        component: 'lgLoaderUpdateRoute'
    });
    $stateProvider.state({
        name: 'loader:updated',
        url: '/updated-loader',
        component: 'lgMessage',
        resolve: {
            service: function(connection, user, loader) {
                'ngInject';
                return connection.waitForCheckConnection('loader:updated').then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'loader:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Voir les annonces de chargements',
                        message: 'Votre annonce de chargement a bien été modifiée.'
                    };
                });
            }
        }
    });
    $stateProvider.state({
        name: 'loader:delete',
        url: '/loader/{id}/delete',
        component: 'lgConfirm',
        resolve: {
            service: function($rootScope, loader, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $rootScope.back();
                };
                result.doConfirm = function() {
                    loader.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de chargement&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
    $stateProvider.state({
        name: 'loader:deleted',
        url: '/deleted-loader',
        component: 'lgMessage',
        resolve: {
            service: function(connection, user, loader) {
                'ngInject';
                return connection.waitForCheckConnection('loader:deleted').then(function() {
                    const login = user.current.content.login;
                    console.log('login', login);
                    const state = 'loader:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Voir les annonces de chargements',
                        message: 'Votre annonce de chargement a bien été supprimée.'
                    };
                });
            }
        }
    });
}

import loaderCreateHtml from './tmpl/loader-create.html';
import loaderListHtml from './tmpl/loader-list.html';
import loaderDetailHtml from './tmpl/loader-detail.html';
import loaderUpdateHtml from './tmpl/loader-update.html';

import * as lib from './ctrl/lg-loader-ctrl.js';

export const lgLoaderCreateRoute = {
    template: loaderCreateHtml,
    controller: lib.LoaderCreateCtrl,
};

export const lgLoaderListRoute = {
    template: loaderListHtml,
    controller: lib.LoaderListCtrl,
};

export const lgLoaderRetrieveRoute = {
    template: loaderDetailHtml,
    controller: lib.LoaderCtrl,
};

export const lgLoaderUpdateRoute = {
    template: loaderUpdateHtml,
    controller: lib.LoaderUpdateCtrl,
};
