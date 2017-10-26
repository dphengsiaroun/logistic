export function AdminLoadersCtrl($stateParams, adminLoader) {
	'ngInject';
	const ctrl = this;
	ctrl.adminLoader = adminLoader;
	ctrl.$onInit = function() {
		adminLoader.list().then(function(list) {
			ctrl.loader = list;
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}