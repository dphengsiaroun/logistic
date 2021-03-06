
export function Truck($q, $http, $state, $window, connection, lgConfig) {
	'ngInject';
	const service = this;
	service.initCreateData = function() {
		service.createData = {
			imageId: new Date().getTime()
		};
	};
	service.initCreateData();

	service.create = function(createData) {
		if (connection.user) {
			$http({
				url: lgConfig.wsDir() + 'users/' + connection.user.content.login + '/trucks',
				method: 'POST',
				data: createData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
				
				if (response.data.status === 'ko') {
					service.error = response;
					return;
				}
				service.initCreateData();
				service.error = undefined;
				$state.go('truck:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			connection.afterConnect.set({
				state: 'truck:created',
				service: 'truck',
				fn: 'create',
				args: [createData]
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}
	};

	service.list = function() {
		
		return connection.waitForCheckConnection('TruckList').then(function() {
			return $http({
				url: lgConfig.wsDir() + 'users/' + connection.user.content.login + '/trucks',
				method: 'GET'
			});
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.truckMap = response.data.trucks;
			
			service.trucks = $window.values(service.truckMap);
			
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.get = function(id) {
		
		
		if (id === undefined) {
			return $q.reject('id is undefined');
		}
		return connection.waitForCheckConnection('TruckGet').then(() => {
			if (service.truckMap === undefined) {
				return service.list().then(function() {
					service.current = service.truckMap[id];
				});
			}
			if (!service.truckMap[id]) {
				return $q.reject('truck not found');
			}
			service.current = service.truckMap[id];
		});
		
	};

	service.empty = function() {
		
		return connection.waitForCheckConnection().then(function() {
			return service.list();
		}).then(function() {
			for (const p in service.truckMap) {
				if (service.truckMap.hasOwnProperty(p)) {
					return $q.resolve();
				}
			}
			return $q.reject();
		});
	};

	service.updateData = {};

	service.update = function() {
		
		connection.waitForCheckConnection().then(function() {
			return $http({
				url: lgConfig.wsDir() + 'users/' + connection.user.content.login + '/trucks/' + service.updateData.id,
				method: 'PUT',
				data: service.updateData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.truck;
			
			$state.go('truck:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	this.delete = function(id) {
		
		return connection.waitForCheckConnection().then(function() {
			return $http({
				url: lgConfig.wsDir() + 'users/' + connection.user.content.login + '/trucks/' + id,
				method: 'DELETE',
				data: {
					id: id
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.trucks = undefined;
			service.current = undefined;
			service.truckMap = undefined;
			$state.go('truck:deleted');
		});
	};

}
