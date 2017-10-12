export const lgMenuContent = {
	require: {
		lgMenu: '^^lgMenu',
	},
	controller: function LgMenuContentCtrl($element) {
		'ngInject';
		
		this.$onInit = function() {
			this.lgMenu.lgMenuContentElt = $element;
			
		};

	}
};