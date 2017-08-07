function CarrierCtrl($scope, $injector, connection) {
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
}

import carrierDetailHtml from '../tmpl/carrier-detail.html';

export const lgCarrierRetrieveRoute = {
    template: carrierDetailHtml,
    controller: CarrierCtrl,
};
