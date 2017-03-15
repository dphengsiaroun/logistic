'use strict';

var app = angular.module('lg-loader');

app.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state({
        name: 'proposal:create',
        url: '/create-proposal',
        component: 'lgProposalCreateRoute'
    });
    $stateProvider.state({
        name: 'proposal:created',
        url: '/created-proposal',
        component: 'lgMessage',
        resolve: {
            service: function() {
                var state = 'home';
                console.log('state', state);
                return {
                    state: state,
                    label: 'Retour à l\'accueil',
                    message: 'Votre proposition a bien été envoyée.'
                };
            }
        },
        needsUser: true
    });

}]);

app.controller('ProposalCreateCtrl', function ProposalCreateCtrl(
    $scope, $element, $http, $q, $window, $filter, loader, user, geoloc) {
    'ngInject';
    var ctrl = this;
    ctrl.loader = loader;
    $window.scrollTo(0, 0);
    $scope.$watchGroup(['$ctrl.loader.createData.dimension.height', '$ctrl.loader.createData.dimension.depth',
        '$ctrl.loader.createData.dimension.width'
    ], function() {
        if (ctrl.loader.createData.dimension === undefined) {
            return;
        }
        ctrl.loader.createData.volume = ctrl.loader.createData.dimension.height *
            ctrl.loader.createData.dimension.depth * ctrl.loader.createData.dimension.width;
        ctrl.loader.createData.volume = Number((ctrl.loader.createData.volume).toFixed(2));
        console.log('ctrl.loader.createData.volume', ctrl.loader.createData.volume);
    });

    geoloc.updateInfoRoute($scope, '$ctrl.loader.createData');

    ctrl.editDimension = function() {
        console.log('editDimension', arguments);
        var dimensionElt = $element.find('lg-dimension');
        console.log('dimensionElt', dimensionElt);
        var dimensionCtrl = dimensionElt.controller('lgDimension');
        console.log('dimensionCtrl', dimensionCtrl);
        dimensionCtrl.start();
    };

    $scope.$watchGroup(['$ctrl.loader.createData.departureDatetime', '$ctrl.loader.createData.arrivalDatetime'],
        function() {
            console.log('$ctrl.loader.createData.infoDuration update');
            if (!(ctrl.loader.createData.departureDatetime && ctrl.loader.createData.arrivalDatetime)) {
                ctrl.loader.createData.infoDuration = '';
                return;
            }
            ctrl.loader.createData.infoDuration = 'Durée effective : <b>' +
                $filter('duration')((ctrl.loader.createData.arrivalDatetime -
                    ctrl.loader.createData.departureDatetime) / 1000) +
                '</b>';
        }
    );
});

var proposalCreateUrl = require('./tmpl/proposal-create.html');


app.component('lgProposalCreateRoute', {
    templateUrl: proposalCreateUrl,
    controller: 'ProposalCreateCtrl',
});
