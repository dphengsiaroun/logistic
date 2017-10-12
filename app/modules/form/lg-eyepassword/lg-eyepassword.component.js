import lgEyePasswordHtml from './tmpl/lg-eyepassword.html';

export const LgEyepassword = {
	template: lgEyePasswordHtml,
	controller: function() {
		
		this.show = false;
		this.$onInit = function() {
			
		};
		this.toggle = function() {
			
			this.show = !this.show;
		};
	},
	bindings: {
		password: '=',
		placeholder: '@',
		name: '@',
	}
};
