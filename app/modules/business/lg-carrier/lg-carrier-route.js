export function config($stateProvider) {
    'ngInject';
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
            service: function(connection, carrier) {
                'ngInject';
                return connection.waitForCheckConnection().then(function() {
                    const login = connection.user.content.login;
                    
                    const state = 'carrier:list({login: \'' + login + '\'})';
                    
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
                    const login = connection.user.content.login;
                    
                    const state = 'carrier:list({login: \'' + login + '\'})';
                    
                    return {
                        state: state,
                        label: 'Revenir à la liste des transports',
                        message: 'Votre annonce de transport a bien été supprimée.'
                    };
                });
            }
        }
    });
}
