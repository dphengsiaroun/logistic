export function LoaderListCtrl($scope, loader, lgFilterList) {
	'ngInject';
	const ctrl = this;
	ctrl.order = true;
	ctrl.loader = loader;
	ctrl.$onInit = function() {
		loader.list().then(function(list) {
			
			ctrl.list = list;
			lgFilterList.setup($scope, '$ctrl', ctrl);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}

export function LoaderCtrl($scope, $stateParams, loader, user, connection) {
	'ngInject';
	const ctrl = this;
	ctrl.loader = loader;
	ctrl.user = user;
	ctrl.connection = connection;
	ctrl.isEditable = false;
	
	
	ctrl.$onInit = function() {
		ctrl.loader.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection('LoaderCtrl');
		}).then(function() {
			ctrl.isEditable = (ctrl.loader.current.content.userId === ctrl.user.current.id);
			
		}).catch(function() {
			ctrl.isEditable = false;
			
		});
	};
}
export function LoaderCreateCtrl(
	$scope, $element, $http, $q, $window, $filter, loader, user, connection, geoloc, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.user = user;
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
		
		if (ctrl.user.current) {
			ctrl.loader.createData.phone = ctrl.user.current.content.phone;
		}

	});

	geoloc.updateInfoRoute($scope, '$ctrl.loader.createData');

	ctrl.editDimension = function() {
		
		const dimensionElt = $element.find('lg-dimension');
		const dimensionCtrl = dimensionElt.controller('lgDimension');
		
		dimensionCtrl.start();
	};

	$scope.$watchGroup(['$ctrl.loader.createData.departureDatetime', '$ctrl.loader.createData.arrivalDatetime'],
		function() {
			
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

export function LoaderUpdateCtrl($stateParams, loader, user, connection, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.loader = loader;
	ctrl.user = user;
	ctrl.fv = formValidator;
	this.$onInit = function() {
		connection.waitForCheckConnection('LoaderUpdateCtrl').then(function() {
			return ctrl.loader.get($stateParams.id);
		}).then(function() {
			
			ctrl.loader.updateData = angular.copy(ctrl.loader.current.content);
			
			ctrl.loader.updateData.id = $stateParams.id;
			
		}).catch(function() {
			console.error('you should not see this');
		});
	};
}
