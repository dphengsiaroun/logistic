'use strict';

require('./lg-proposal.scss');
module.exports = 'lg-proposal';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-proposal-route.js');

app.service('proposal', function Proposal(user, $http, $state, $q) {
	'ngInject';

	var service = this;
	service.initCreateData = function() {
		service.createData = {
			email: '',
			name: '',
			title_ad: '',
			message: ''
		};
	};
	service.initCreateData();


    service.create = function() {
        console.log('proposal->createProposal');
        var createData = service.createData;
        if (user.account) {
            $http({
                url: 'ws/proposal/create.php',
                method: 'POST',
                data: createData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(response) {
                console.log('response', response);
                if (response.data.status === 'ko') {
                    service.error = response;
                    return;
                }
                service.initCreateData();
                service.error = undefined;
                $state.go('proposal:created');
            }).catch(function(error) {
                console.error('error', error);
            });
        } else {
            console.log('user not connected');
            createData.userNotConnected = true;
            localStorage.setItem('proposal', angular.toJson(createData));
            user.setAfterConnectAction({
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

    service.list = function() {
        console.log('proposal->list');
        return $http({
            url: 'ws/proposal/list.php',
            method: 'GET'
        }).then(function(response) {
            console.log('response', response);
            if (response.data.status === 'ko') {
                service.error = response;
                return;
            }
            service.error = undefined;
            service.proposalMap = response.data.proposals;
            console.log('service.proposalMap', service.proposalMap);
            service.proposals = values(service.proposalMap);
            console.log('service.proposals', service.proposals);
        }).catch(function(error) {
            service.error = error;
        });
    };

    service.get = function(id) {
        console.log('get', arguments);
        if (id === undefined) {
            return $q.reject('id is undefined');
        }
        if (service.proposalMap === undefined) {
            return service.list().then(function() {
                service.current = service.proposalMap[id];
            });
        }
        service.current = service.proposalMap[id];
        return $q.resolve();
    };

    service.empty = function() {
        console.log('empty', arguments);
        return user.waitForCheckConnection().then(function() {
            return service.list();
        }).then(function() {
            for (var p in service.proposalMap) {
                if (service.proposalMap.hasOwnProperty(p)) {
                    return $q.resolve();
                }
            }
            return $q.reject();
        });
    };

    service.updateData = {};

    service.update = function() {
        console.log('updateProposal->update');
        $http({
            url: 'ws/proposal/update.php',
            method: 'POST',
            data: service.updateData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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

    this.delete = function(id) {
        console.log('proposal->delete');
        return $http({
            url: 'ws/proposal/delete.php',
            method: 'POST',
            data: {
                id: id
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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

