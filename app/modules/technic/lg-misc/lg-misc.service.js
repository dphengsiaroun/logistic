export function LgMisc() {
	'ngInject';
	this.isWebService = function(url) {
		const result = url.match(/ws\//);
		return result;
	};
}
