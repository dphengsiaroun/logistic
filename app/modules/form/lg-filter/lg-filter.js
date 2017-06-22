'use strict';

require('./lg-filter.scss');
module.exports = 'lg-filter';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-filter-route.js');

app.service('filter', function Filter($http, $state, $q, connection, user) {
	'ngInject';

	var service = this;
	service.initCreateData = function() {
		service.createData = {
			message: 'Bonjour, j\'aimerais vous faire une offre contactez-moi. Merci.',
		};
	};
	service.initCreateData();


	service.create = function() {
		console.log('filter->create', service.createData);
		var createData = service.createData;
			$http({
				url: 'ws/filters',
				method: 'POST',
				data: createData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.initCreateData();
				$state.go('filter:created');
			}).catch(function(error) {
				console.error('error', error);
			});
	};

	service.listData = {};

	service.list = function(data) {
		console.log('filter->list');
		return $http({
			url: 'ws/filters',
			method: 'GET',
			params: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.filters;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		console.log('service.filters', service.filters);
		return this.list().then(function(filters) {
			service.filters = filters;
			service.filterMap = makeMap(filters);
			service.current = service.filterMap[id];
		});
		service.current = service.filterMap[id];
		return $q.resolve();
	};

});
