export const lgMenuContent = {
	require: {
		lgMenu: '^^lgMenu',
	},
	controller: function LgMenuContentCtrl($element) {
		'ngInject';
		console.log('lgMenuContent ctrl', arguments, this);
		this.$onInit = function() {
			this.lgMenu.lgMenuContentElt = $element;
			console.log('$element', $element);
		};

	}
};