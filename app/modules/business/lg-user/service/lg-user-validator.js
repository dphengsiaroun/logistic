export function UserValidator($q, $http, lgConfig) {
	'ngInject';
	// const service = this;


	this.checkField = function(fieldName, value) {
		
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
			
			if (response.data.users.length > 0) {
				
				return $q.reject();
			}
		});
	};
}
