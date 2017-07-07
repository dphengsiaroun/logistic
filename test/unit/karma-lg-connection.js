import '../../app/modules/business/lg-connection/lg-connection.js';

describe('lg-connection', function() {
	let user;
	let connection;

	beforeEach(function() {
		angular.mock.module('lg-connection');
		inject(function($injector) {

			user = $injector.get('user');
			connection = $injector.get('connection');
		});
	});

	describe('service connection', function() {
		it('should be not connected', function() {

			expect(user.isConnected).toEqual(undefined);
		});

	});

});
