export function AdminLoadersCtrl($stateParams, adminLoader) {
	'ngInject';
	const ctrl = this;
	ctrl.adminLoader = adminLoader;

	ctrl.limit = function() {
		this.limit = 40;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 10;
			ctrl.limit = moreData > ctrl.loader.length ? ctrl.loader.length : moreData;
	};

	ctrl.$onInit = function() {
		adminLoader.list().then(function(list) {
			ctrl.loader = list;
			ctrl.limit();
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}