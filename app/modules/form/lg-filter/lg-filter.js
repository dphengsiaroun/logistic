require('./lg-filter.scss');
module.exports = 'lg-filter';

import '../../technic/lg-erasable/lg-erasable.js';

const app = angular.module(module.exports, ['lg-erasable']);


const lgFilterUrl = require('./tmpl/lg-filter.html');

app.component('lgFilter', {
	templateUrl: lgFilterUrl,
	controller: function LgFilterCtrl() {
		'ngInject';
		const ctrl = this;

		ctrl.isEditing = false;

		ctrl.edit = () => {
			console.log('ctrl.edit');
			ctrl.isEditing = true;
		};

		ctrl.stop = () => {
			console.log('ctrl.stop');
			ctrl.isEditing = false;
		};

		ctrl.submit = () => {

		};

	},
	bindings: {

	}
});
