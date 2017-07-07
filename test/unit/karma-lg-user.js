import '../../app/modules/business/lg-user/lg-user.js';

describe('lg-user', function() {
	let user;
	let $httpBackend;
	let $state;

	beforeEach(function() {
		angular.mock.module('lg-user');
		inject(function($injector) {

			user = $injector.get('user');
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
			$httpBackend.when('POST', 'ws/user/signup.php').respond({
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
			user.signup();
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
			expect(user.isConnected).toEqual(true);
			expect($state.current.name).toEqual('user:create:success');
		});

		it('should update a user', function() {
			user.updateData = {
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
			$httpBackend.when('POST', 'ws/user/update.php').respond({
				status: 'ok',
				user: {
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
