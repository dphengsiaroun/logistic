export function distanceFilter() {
	'ngInject';
	return function(number) {
		const integer = Math.floor(number);
		const decimal = Math.round((number - integer) * 100);
		let decimalStr = '' + decimal;
		if (decimal < 10) {
			decimalStr = '0' + decimal;
		}
		return integer + 'm' + decimalStr;
	};
}
