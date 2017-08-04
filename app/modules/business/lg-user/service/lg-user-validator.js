const app = angular.module('lg-user');

app.service('userValidator', function UserValidator($q, $http) {
	'ngInject';
    // const service = this;
    this.checkLogin = function(login) {
        console.log('checkLogin', arguments);
        return $http({
			url: 'ws/users',
			method: 'GET',
			params: {login},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
});
