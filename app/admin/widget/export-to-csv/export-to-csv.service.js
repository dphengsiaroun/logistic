
export function ExportToCsv() {
	'ngInject';

	this.export = (csv, name) => {
		const a = angular.element('<a/>', {
			href: 'data:application/octet-stream;base64,' + btoa(csv),
			download: name
		}).append('body');
		a[0].click();
		a.remove();
	};
}
