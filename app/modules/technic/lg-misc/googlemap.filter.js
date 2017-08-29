export function googlemapFilter() {
	'ngInject';
	return function(content) {
		if (!content || !content.departureCity || !content.arrivalCity) {
			return '';
		}
		let result = 'https://www.google.com/maps/dir/' +
			content.departureCity.city + '+' +
			content.departureCity.region + '+' +
			content.departureCity.country +
			'/' +
			content.arrivalCity.city + '+' +
			content.arrivalCity.region + '+' +
			content.arrivalCity.country;
		result = result.replace(/ /g, '+');
		return result;
	};
}