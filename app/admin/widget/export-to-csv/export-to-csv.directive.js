module.exports = 'export-to-csv';

const app = angular.module(module.exports, []);

app.directive('exportToCsv', function exportToCsv() {
	'ngInject';

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			const el = element[0];
			console.log('el', el);
			element.bind('click', function(e) {
				const table = e.target.nextElementSibling;
				let csvString = '';
				for (let i = 0; i < table.rows.length; i++) {
					const rowData = table.rows[i].cells;
					console.log('rowData', rowData);
					for (let j = 0; j < rowData.length; j++) {
						csvString = csvString + rowData[j].innerHTML + ',';
					}
					csvString = csvString.substring(0, csvString.length - 1);
					csvString = csvString + '\n';
				}
				csvString = csvString.substring(0, csvString.length - 1);
				console.log('csvString',csvString);
				const a = angular.element('<a/>', {
					href: 'data:application/octet-stream;base64,' + btoa(csvString),
					download: 'export.csv'
				}).append('body');
				a[0].click();
				a.remove();
			});
		}
	};
});
