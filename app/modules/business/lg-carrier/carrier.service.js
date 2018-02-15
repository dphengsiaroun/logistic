export function Carrier($http, $state, $q, $window, connection, lgConfig) {
	'ngInject';

	this.initStepData = () => {
		this.stepData = {
			truck: undefined,
			availability: undefined,
			pricing: undefined
		};
	};
	this.initStepData();

	this.isInitialized = () => {
		if (this.stepData.truck === undefined &&
			this.stepData.availability === undefined &&
			this.stepData.pricing === undefined) {
			return true;
		}
		return false;
	};

	this.create = (stepData) => {

		if (connection.user) {
			$http({
				url: lgConfig.wsDir() + 'carriers',
				method: 'POST',
				data: stepData,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then((response) => {

				if (response.data.status === 'ko') {
					this.error = response;
					return;
				}
				this.error = undefined;
				this.initStepData();
				$state.go('carrier:created');
			}).catch((error) => {
				console.error('error', error);
			});
		} else {
			connection.afterConnect.set({
				state: 'carrier:created',
				service: 'carrier',
				fn: 'createAfterConnect',
				args: [stepData]
			});
			this.initStepData();
			$state.go('user:hasAccount');
		}

	};

	this.createAfterConnect = () => {
		this.stepData = angular.fromJson(localStorage.getItem('carrier'));
		localStorage.removeItem('carrier');

		this.create();
	};

	this.list = (data) => {

		return $http({
			url: lgConfig.wsDir() + 'carriers',
			method: 'GET',
			params: data,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then((response) => {

			if (response.data.status === 'ko') {
				this.error = response;
				return $q.reject(response);
			}
			this.error = undefined;
			return response.data.carriers;
		}).catch((error) => {
			this.error = error;
			return $q.reject(error);
		});
	};

	this.get = (id) => {

		return this.list().then((carriers) => {
			this.carriers = carriers;
			this.carrierMap = $window.makeMap(carriers);
			this.current = this.carrierMap[id];
		});
	};

	this.updateData = {};

	this.update = () => {
		this.updateData = this.stepData;
		this.initStepData();

		$http({
			url: lgConfig.wsDir() + 'carriers/' + this.updateData.id,
			method: 'PUT',
			data: this.updateData,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then((response) => {

			if (response.data.status === 'ko') {
				this.error = response;
				return;
			}
			this.error = undefined;
			this.current = response.data.carrier;

			$state.go('carrier:updated');
		}).catch((error) => {
			this.error = error;
			console.error('error', error);
		});
	};

	this.delete = (id) => {

		return $http({
			url: lgConfig.wsDir() + 'carriers/' + id,
			method: 'DELETE'
		}).then((response) => {

			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			this.error = undefined;
			this.carriers = undefined;
			this.current = undefined;
			$state.go('carrier:deleted');
		});
	};

}
