
export function ExportToCsv() {
	'ngInject';

	this.export = (csv) => {
		const a = angular.element('<a/>', {
			href: 'data:application/octet-stream;base64,' + btoa(csv),
			download: 'export.csv'
		}).append('body');
		a[0].click();
		a.remove();
	};
}
