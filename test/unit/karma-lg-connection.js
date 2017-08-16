import '../../app/modules/business/lg-connection/lg-connection.js';

describe('lg-connection', function() {
	let connection;

	beforeEach(function() {
		angular.mock.module('lg-connection');
		inject(function($injector) {

			connection = $injector.get('connection');
		});
	});

	describe('service connection', function() {
		it('should be not connected', function() {
			expect(connection.isConnected).toEqual(undefined);
		});

	});

});
