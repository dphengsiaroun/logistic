module.exports = 'lg-i18n';

const FR = 'fr';
// const AR = 'ar';

class LgI18n {
	constructor() {
		this.current = FR;
	}

	chooseLanguage(lang) {
		console.log('chooseLanguage');
		this.current = lang;
	}
}

angular.module(module.exports, [])
	.service('lgI18n', LgI18n)
;
