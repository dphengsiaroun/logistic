export function Proposal($http, $state, $q, $window, connection, user, lgConfig) {
	'ngInject';

	const service = this;
	service.initCreateData = function() {
		service.createData = {
			message: 'Bonjour, j\'aimerais vous faire une offre contactez-moi. Merci.',
		};
	};
	service.initCreateData();


	service.create = function() {
		console.log('proposal->create', service.createData);
		const createData = service.createData;
		if (user.current) {
			$http({
				url: lgConfig.wsDir() + 'proposals',
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
				$state.go('proposal:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			createData.userNotConnected = true;
			localStorage.setItem('proposal', angular.toJson(createData));
			connection.setAfterConnectAction({
				state: 'proposal:created',
				service: 'proposal',
				fn: 'createAfterConnect',
				args: []
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}
	};

	service.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('proposal'));
		localStorage.removeItem('proposal');
		console.log('proposal->createAfterConnect', service.createData);
		service.create();
	};

	service.listData = {};

	service.list = function(data) {
		console.log('proposal->list');
		return $http({
			url: lgConfig.wsDir() + 'proposals',
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
			return response.data.proposals;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		console.log('service.proposals', service.proposals);
		return this.list().then(function(proposals) {
			service.proposals = proposals;
			service.proposalMap = $window.makeMap(proposals);
			service.current = service.proposalMap[id];
		});
	};
	service.updateData = {};

	service.update = function() {
		console.log('updateProposal->update', service.updateData);
		$http({
			url: lgConfig.wsDir() + 'proposals/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
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
			service.current = response.data.proposal;
			console.log('about to go to', response);
			$state.go('proposal:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	service.delete = function(id) {
		console.log('proposal->delete');
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
			console.log('response', response);
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
