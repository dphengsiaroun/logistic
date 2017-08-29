export function volumeFilter() {
	'ngInject';
	return function(dimension) {
		if (dimension && dimension.width && dimension.height && dimension.depth) {
			return (dimension.width * dimension.height * dimension.depth).toFixed(3) + 'm3';
		}
		return '';
	};
}