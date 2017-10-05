export function UserValidator($q, $http, lgConfig) {
	'ngInject';
	// const service = this;


	this.checkField = function(fieldName, value) {
		console.log('check', arguments);
		const params = {};
		params[fieldName] = value;
		return $http({
			url: lgConfig.wsDir() + 'users',
			method: 'GET',
			params,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).catch(function(error) {
			console.error('error', error);
			return $q.resolve({
				data: {
					users: []
				}
			});
		}).then(function(response) {
			console.log('response', response);
			if (response.data.users.length > 0) {
				console.log('about to reject');
				return $q.reject();
			}
		});
	};
}
