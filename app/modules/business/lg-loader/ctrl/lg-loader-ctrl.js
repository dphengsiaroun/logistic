export function LoaderListCtrl($scope, loader, lgFilterList) {
	'ngInject';
	const ctrl = this;
	ctrl.order = true;
	ctrl.loader = loader;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 50;
			ctrl.limit = moreData > ctrl.loader.length ? ctrl.loader.length : moreData;
	};

	ctrl.$onInit = function() {
		loader.list().then(function(list) {
			ctrl.list = list;
			ctrl.limit();
			lgFilterList.setup($scope, '$ctrl', ctrl);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}

export function LoaderCtrl($scope, $stateParams, loader, connection) {
	'ngInject';
	const ctrl = this;
	ctrl.loader = loader;
	ctrl.connection = connection;
	ctrl.isEditable = false;


	ctrl.$onInit = function() {
		ctrl.loader.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection('LoaderCtrl');
		}).then(function() {
			ctrl.isEditable = (ctrl.loader.current.content.userId === ctrl.connection.user.id);

		}).catch(function() {
			ctrl.isEditable = false;

		});
	};
}
export function LoaderCreateCtrl(
	$scope, $element, $http, $q, $window, $filter, loader, connection, geoloc, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.connection = connection;
	ctrl.loader = loader;
	ctrl.fv = formValidator;
	$scope.$watchGroup(['$ctrl.loader.createData.dimension.height', '$ctrl.loader.createData.dimension.depth',
		'$ctrl.loader.createData.dimension.width'
	], function() {
		if (ctrl.loader.createData.dimension === undefined) {
			return;
		}
		ctrl.loader.createData.volume = ctrl.loader.createData.dimension.height *
			ctrl.loader.createData.dimension.depth * ctrl.loader.createData.dimension.width;
		ctrl.loader.createData.volume = Number((ctrl.loader.createData.volume).toFixed(2));

		if (ctrl.connection.user) {
			ctrl.loader.createData.phone = ctrl.connection.user.content.phone;
		}

	});

	geoloc.updateInfoRoute($scope, '$ctrl.loader.createData');

	ctrl.editDimension = function() {

		const dimensionElt = $element.find('lg-dimension');
		const dimensionCtrl = dimensionElt.controller('lgDimension');

		dimensionCtrl.start();
	};

	$scope.$watch('$ctrl.loader.createData.departureDatetime', function(newValue, oldValue) {
		console.log('watch date', arguments);
		if (!ctrl.loader.createData.infoRoute) {
			ctrl.loader.createData.arrivalDatetime = '';
		} else {
			if (ctrl.loader.createData.departureDatetime && oldValue === undefined) {
				ctrl.loader.createData.arrivalDatetime =
					new Date(ctrl.loader.createData.departureDatetime.getTime() + 
						ctrl.loader.createData.minDuration * 1000);
			}
		}
	});

	$scope.$watchGroup(['$ctrl.loader.createData.departureDatetime', '$ctrl.loader.createData.arrivalDatetime'],
		function(newValues, oldValues) {

			if (!(ctrl.loader.createData.departureDatetime && ctrl.loader.createData.arrivalDatetime)) {
				ctrl.loader.createData.infoDuration = '';
				return;
			}
			ctrl.loader.createData.infoDuration = 'Durée effective : <b>' +
				$filter('duration')((ctrl.loader.createData.arrivalDatetime -
					ctrl.loader.createData.departureDatetime) / 1000) +
				'</b>';
		}
	);
}

export function LoaderUpdateCtrl($stateParams, $scope, $filter, geoloc, loader, connection, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.loader = loader;
	ctrl.fv = formValidator;
	this.$onInit = function() {
		connection.waitForCheckConnection('LoaderUpdateCtrl').then(function() {
			return ctrl.loader.get($stateParams.id);
		}).then(function() {	
			ctrl.loader.updateData = angular.copy(ctrl.loader.current.content);
			ctrl.loader.updateData.id = $stateParams.id;
			console.log('ctrl.loader.updateData', ctrl.loader.updateData);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
	
	$scope.$watchGroup(['$ctrl.loader.updateData.departureDatetime', '$ctrl.loader.updateData.arrivalDatetime'],
		function(newValues, oldValues) {

			if (!(ctrl.loader.updateData.departureDatetime && ctrl.loader.updateData.arrivalDatetime)) {
				ctrl.loader.updateData.infoDuration = '';
				return;
			}
			ctrl.loader.updateData.infoDuration = 'Durée effective : <b>' +
				$filter('duration')((ctrl.loader.updateData.arrivalDatetime -
					ctrl.loader.updateData.departureDatetime) / 1000) +
				'</b>';
		}
	);
	geoloc.updateInfoRoute($scope, '$ctrl.loader.updateData');
}
