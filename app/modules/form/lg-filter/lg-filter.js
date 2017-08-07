import './lg-filter.scss';
module.exports = 'lg-filter';

import '../../technic/lg-erasable/lg-erasable.js';

const app = angular.module(module.exports, ['lg-erasable']);


import lgFilterHtml from './tmpl/lg-filter.html';

app.component('lgFilter', {
	template: lgFilterHtml,
	controller: function LgFilterCtrl() {
		'ngInject';
		const ctrl = this;

		ctrl.isEditing = false;

		ctrl.edit = () => {
			console.log('ctrl.edit');
			ctrl.isEditing = true;
		};

		ctrl.cancel = () => {
			console.log('ctrl.cancel');
			ctrl.isEditing = false;
		};

		ctrl.submit = () => {
			console.log('ctrl.submit');
			ctrl.isEditing = false;
		};

	},
	bindings: {
		filter: '='
	}
});
