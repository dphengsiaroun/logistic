import './css/lg-breadcrumb.scss';
import lgBreadcrumbHtml from './tmpl/lg-breadcrumb.html';

export const lgBreadcrumb = {
	template: lgBreadcrumbHtml,
	bindings: {
		config: '<',
		step: '<'
	},
	controller: function LgBreadcrumbCtrl($element) {
		'ngInject';
		this.$onChanges = () => {
			console.log('step', this.step);
			this.setStep();
		};

		this.setStep = () => {
			for (let i = 0; i < 3; i++) {
				const elt = $element.find('step').eq(i);
				if (i < this.step) {
					elt.attr('disabled', false);
				} else {
					elt.attr('disabled', true);
				}
				if (i === this.step) {
					elt.attr('first', true);
				}
			}
		};
	}
};
