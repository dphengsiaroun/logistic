import './lg-i18n.scss';

module.exports = 'lg-i18n';

const FR = 'fr';
// const AR = 'ar';

class LgI18n {
	constructor($rootScope, $document, connection, user) {
		this.current = FR;
		this.connection = connection;
		this.user = user;
		this.$document = $document;
		$rootScope.lgI18n = this;
		this.sync();
	}

	sync() {
		this.connection.waitForCheckConnection().then(() => {
			this.current = this.connection.user.content.language || FR;
		}).catch(() => {}).then(() => {
			const html = this.$document[0].querySelector('html');
			console.log('html', html);
			html.setAttribute('lang', this.current);
		});
	}

	chooseLanguage(lang, user) {
		this.current = lang || FR;
		this.connection.waitForCheckConnection().then(() => {
			console.log('hello');
			this.connection.user.content.language = this.current;
			this.user.patch();
		}).catch(() => {}).then(() => {
			this.sync();
		});

	}
}

angular.module(module.exports, [])
	.service('lgI18n', LgI18n);
