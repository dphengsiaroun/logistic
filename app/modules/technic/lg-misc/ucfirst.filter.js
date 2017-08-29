export function ucfirstFilter() {
	'ngInject';
	return function(str) {
		if (typeof str !== 'string') {
			return undefined;
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
}
