'use strict';

require('./lg-proposal.scss');
module.exports = 'lg-proposal';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-proposal-route.js');

app.service('proposal', function Proposal($http, $state, $q, connection, user) {
	'ngInject';

	var service = this;
	service.initCreateData = function() {
		service.createData = {
			message: 'Bonjour, j\'aimerais vous faire une offre contactez-moi. Merci.',
		};
	};
	service.initCreateData();


	service.create = function() {
		console.log('proposal->create', service.createData);
		var createData = service.createData;
		$http({
			url: 'ws/proposals',
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
	};

	service.listData = {};

	service.list = function(data) {
		console.log('proposal->list');
		return $http({
			url: 'ws/proposals',
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
			service.proposalMap = makeMap(proposals);
			service.current = service.proposalMap[id];
		});
		service.current = service.proposalMap[id];
		return $q.resolve();
	};
	service.updateData = {};

	service.update = function() {
		console.log('updateProposal->update', service.updateData);
		$http({
			url: 'ws/proposals/' + service.updateData.id,
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
			url: 'ws/proposals/' + id,
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

});
