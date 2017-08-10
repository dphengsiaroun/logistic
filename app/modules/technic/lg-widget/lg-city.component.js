import lgCityHtml from './tmpl/lg-city.html';

export const lgCity = {
	require: {
		ngModel: 'ngModel',
	},
	template: lgCityHtml,
	bindings: {
		name: '@',
		title: '@',
		placeholder: '@',
		myModel: '=ngModel'
	}
};
