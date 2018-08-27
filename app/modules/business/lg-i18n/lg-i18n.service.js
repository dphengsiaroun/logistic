module.exports = 'lg-i18n';

const FR = 'fr';
// const AR = 'ar';

class LgI18n {
	constructor(connection, user) {
		this.current = FR;
		this.connection = connection;
		this.user = user;
		this.sync();
	}

	sync() {
		this.connection.waitForCheckConnection().then(() => {
			this.current = this.connection.user.content.language;
		}).catch(() => {});
	}

	chooseLanguage(lang, user) {
		console.log('chooseLanguage');
		this.current = lang;
		this.connection.waitForCheckConnection().then(() => {
			console.log('hello');
			this.connection.user.content.language = this.current;
			this.user.patch();
		}).catch(() => {});

	}
}

angular.module(module.exports, [])
	.service('lgI18n', LgI18n);


