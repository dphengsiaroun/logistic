import homeUrl from './tmpl/home.html';
import installUrl from './tmpl/install.html';
import successfullyInstalledUrl from './tmpl/successfully-installed.html';
import alreadyInstalledUrl from './tmpl/already-installed.html';
import installFailedUrl from './tmpl/install-failed.html';

export function config($routeProvider) {
	'ngInject';
	$routeProvider
		.when('/', {
			template: homeUrl,
			controller: 'HomeCtrl',
			controllerAs: '$ctrl'
		})
		.when('/install', {
			template: installUrl
		})
		.when('/already-installed', {
			template: alreadyInstalledUrl
		})
		.when('/successfully-installed', {
			template: successfullyInstalledUrl
		})
		.when('/install-failed', {
			template: installFailedUrl
		})
		.otherwise({
			redirectTo: '/'
		});
}
