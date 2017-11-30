import lgEyePasswordHtml from './tmpl/lg-eyepassword.html';

export const LgEyepassword = {
	template: lgEyePasswordHtml,
	controller: function() {
		this.type = 'password';
		this.toggle = function() {
			if (this.type === 'password') {
				this.type = 'text';
				return;
			}
			this.type = 'password';
		};
	},
	bindings: {
		password: '=',
		placeholder: '@',
		name: '@',
	}
};
