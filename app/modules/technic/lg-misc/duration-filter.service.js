export function durationFilter($filter) {
	'ngInject';
	return function(duration) {
		let result = '';
		let minuteFormat = 'mm';
		let hourFormat = ' et \'H\'h\'';
		if (duration % (60 * 60) === 0) {
			minuteFormat = '';
			if (duration % (24 * 60 * 60) === 0) {
				hourFormat = '';
			}
		}
		if (duration < 24 * 60 * 60) {
			result = $filter('date')(duration * 1000, 'H\'h\'' + minuteFormat, 'UTC');
		} else {

			result = $filter('date')((duration - 24 * 60 * 60) * 1000, 'd\'j' + hourFormat + minuteFormat, 'UTC');
		}
		return result;
	};
}
