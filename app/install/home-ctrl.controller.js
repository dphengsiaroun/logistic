export function HomeCtrl($rootScope) {
	'ngInject';
	console.log('HomeCtrl', arguments);
	$rootScope.isInstalled();
}
