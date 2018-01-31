export function AdminUsersCtrl($filter, $stateParams, adminUser, exportToCsv) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 50;
			ctrl.limit = moreData > ctrl.user.length ? ctrl.user.length : moreData;
	};

	ctrl.$onInit = function() {
		adminUser.list().then(function(list) {
			ctrl.users = list;
			ctrl.limit();
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	ctrl.export2Csv = () => {
		console.log('export2Csv');

		let csv = ctrl.users.map((user) => {
			return [
				user.id,
				$filter('date')(new Date(user.content.created_t * 1000), `short`),
				user.content.lastname,
				user.content.firstname,
				user.login,
				user.email,
				user.phone,
				user.content.address.street,
				user.content.address.zipcode,
				user.content.address.city,
				user.content.address.country,
			];
		}).join('\n');
		csv = `Sep=,
ID,DATE CREATION,NOM,PRENOM,LOGIN,EMAIL,TELEPHONE,ADRESSE,CODE POSTAL,VILLE,PAYS
` + csv;

		exportToCsv.export(csv, 'utilisateurs.csv');
	};
}