export function Proposal($http, $state, $q, $window, connection, lgConfig) {
	'ngInject';

	const service = this;
	service.initCreateData = function() {
		service.createData = {
			message: 'Bonjour, j\'aimerais vous faire une offre contactez-moi. Merci.',
		};
	};
	service.initCreateData();


	service.create = function(createData) {
		if (connection.user) {
			$http({
				url: lgConfig.wsDir() + 'proposals',
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
				service.error = undefined;
				service.initCreateData();
				$state.go('proposal:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			connection.afterConnect.set({
				state: 'proposal:created',
				service: 'proposal',
				fn: 'create',
				args: [createData]
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}
	};

	service.listData = {};

	service.list = function(data) {
		
		if (data === undefined) {
			data = {};
		}
		return $http({
			url: lgConfig.wsDir() + 'proposals',
			method: 'GET',
			params: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.proposals;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		
		return this.list().then(function(proposals) {
			service.proposals = proposals;
			service.proposalMap = $window.makeMap(proposals);
			service.current = service.proposalMap[id];
		});
	};
	service.updateData = {};

	service.update = function() {
		
		$http({
			url: lgConfig.wsDir() + 'proposals/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.proposal;
			
			$state.go('proposal:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	service.delete = function(id) {
		
		return $http({
			url: lgConfig.wsDir() + 'proposals/' + id,
			method: 'DELETE',
			data: {
				id: id
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.proposals = undefined;
			service.current = undefined;
			$state.go('proposal:deleted');
		});
	};

}
