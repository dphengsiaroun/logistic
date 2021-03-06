import './lg-filter.scss';
module.exports = 'lg-filter';

import '../../technic/lg-erasable/lg-erasable.directive.js';

const app = angular.module(module.exports, ['lg-erasable']);


import lgFilterHtml from './tmpl/lg-filter.html';

app.component('lgFilter', {
	template: lgFilterHtml,
	controller: function LgFilterCtrl() {
		'ngInject';
		const ctrl = this;

		ctrl.isEditing = false;

		ctrl.edit = () => {
			
			ctrl.isEditing = true;
		};

		ctrl.cancel = () => {
			
			ctrl.isEditing = false;
		};

		ctrl.submit = () => {
			
			ctrl.isEditing = false;
		};

	},
	bindings: {
		filter: '='
	}
});
