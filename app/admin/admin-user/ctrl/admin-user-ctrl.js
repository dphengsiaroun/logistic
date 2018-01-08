export function AdminUsersCtrl($stateParams, adminUser) {
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
			ctrl.user = list;
			ctrl.limit();
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}