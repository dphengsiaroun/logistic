export function Carrier($http, $state, $q, $window, connection, lgConfig, afterConnect) {
	'ngInject';

	const service = this;

	service.initCreateData = function() {
		service.createData = {
			truck: undefined,
			availability: undefined,
			pricing: undefined
		};
	};
	service.initCreateData();

	service.create = function(createData) {
		
		if (connection.user) {
			$http({
				url: lgConfig.wsDir() + 'carriers',
				method: 'POST',
				data: createData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				
				if (response.data.status === 'ko') {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.initCreateData();
				$state.go('carrier:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			afterConnect.set({
				state: 'carrier:created',
				service: 'carrier',
				fn: 'createAfterConnect',
				args: [createData]
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}

	};

	service.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('carrier'));
		localStorage.removeItem('carrier');
		
		service.create();
	};

	service.list = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'carriers',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.carriers;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		
		return this.list().then(function(carriers) {
			service.carriers = carriers;
			service.carrierMap = $window.makeMap(carriers);
			service.current = service.carrierMap[id];
		});
	};

	service.updateData = {};

	service.update = function() {
		service.updateData = service.createData;
		service.initCreateData();
		
		$http({
			url: lgConfig.wsDir() + 'carriers/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.carrier;
			
			$state.go('carrier:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	service.delete = function(id) {
		
		return $http({
			url: lgConfig.wsDir() + 'carriers/' + id,
			method: 'DELETE'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.carriers = undefined;
			service.current = undefined;
			$state.go('carrier:deleted');
		});
	};

}

