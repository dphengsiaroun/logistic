import lgEyePasswordHtml from './tmpl/lg-eyepassword.html';

export const LgEyepassword = {
	template: lgEyePasswordHtml,
	controller: function() {
		console.log('lgEyepassword controller', arguments, this);
		this.show = false;
		this.$onInit = function() {
			console.log('lgEyepassword controller onInit', arguments, this);
		};
		this.toggle = function() {
			console.log('lgEyepassword toggle', arguments, this);
			this.show = !this.show;
		};
	},
	bindings: {
		password: '=',
		placeholder: '@',
		name: '@',
	}
};
