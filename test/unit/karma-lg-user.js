import '../../app/modules/business/lg-user/lg-user.js';

describe('lg-user', function() {
	let user;
	let connection;
	let $httpBackend;
	let $state;

	beforeEach(function() {
		angular.mock.module('lg-user');
		inject(function($injector) {

			user = $injector.get('user');
			connection = $injector.get('connection');
			$httpBackend = $injector.get('$httpBackend');
			$state = $injector.get('$state');
		});
	});


	describe('service user', function() {
		it('should be one', function() {

			expect(user.signupData).toEqual({
				content: {}
			});
			expect(user.updateData).toEqual({
				content: {}
			});
		});

		it('should create a user', function() {
			user.signupData = {
				email: 'dphengsiaroun@outlook.fr',
				password: 'test',
				content: {
					lastname: 'Debbah',
					firstname: 'Mérouane',
					login: 'Toto',

					profile: 'both',
					street: '99 rue de Paris',
					city: 'Torcy',
					zipcode: '77200',
					country: 'France',

					phone: '0654342214'

				}
			};
			$httpBackend.when('POST', 'ws/users').respond({
				user: {
					email: 'dphengsiaroun@outlook.fr',
					password: 'test',
					content: {
						lastname: 'Debbah',
						firstname: 'Mérouane',
						login: 'Toto',

						profile: 'both',
						street: '99 rue de Paris',
						city: 'Torcy',
						zipcode: '77200',
						country: 'France',

						phone: '0654342214'

					}
				}
			});
			user.create();
			$httpBackend.flush();
			expect(user.error).toEqual(undefined);
			expect(user.current).toEqual({
				email: 'dphengsiaroun@outlook.fr',
				password: 'test',
				content: {
					lastname: 'Debbah',
					firstname: 'Mérouane',
					login: 'Toto',

					profile: 'both',
					street: '99 rue de Paris',
					city: 'Torcy',
					zipcode: '77200',
					country: 'France',

					phone: '0654342214'

				}
			});
			expect(connection.isConnected).toEqual(true);
			expect($state.current.name).toEqual('user:create:success');
		});

		it('should update a user', function() {
			user.updateData = {
				id: 12,
				email: 'dphengsiaroun@outlook.fr',
				password: 'test',
				content: {
					lastname: 'Toto',
					firstname: 'Mérouane',
					login: 'Toto',

					profile: 'both',
					street: '99 rue de Paris',
					city: 'Torcy',
					zipcode: '77200',
					country: 'France',

					phone: '0654342214'

				}
			};
			$httpBackend.when('PUT', 'ws/users/12').respond({
				status: 'ok',
				user: {
					id: 12,
					email: 'dphengsiaroun@outlook.fr',
					password: 'test',
					content: {
						lastname: 'Toto',
						firstname: 'Mérouane',
						login: 'Toto',

						profile: 'both',
						street: '99 rue de Paris',
						city: 'Torcy',
						zipcode: '77200',
						country: 'France',

						phone: '0654342214'

					}
				}
			});
			user.update();
			$httpBackend.flush();
			expect(user.current).toEqual({
				id: 12,
				email: 'dphengsiaroun@outlook.fr',
				password: 'test',
				content: {
					lastname: 'Toto',
					firstname: 'Mérouane',
					login: 'Toto',

					profile: 'both',
					street: '99 rue de Paris',
					city: 'Torcy',
					zipcode: '77200',
					country: 'France',

					phone: '0654342214'

				}
			});
			expect(user.error).toEqual(undefined);
			expect($state.current.name).toEqual('user:updated');
		});
	});

});
