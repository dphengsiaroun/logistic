export function ts2dateFilter() {
	'ngInject';
	return function(timestamp) {
		return new Date(timestamp * 1000);
	};
}