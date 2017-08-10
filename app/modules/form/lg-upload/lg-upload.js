import './lg-upload.scss';

import 'blueimp-file-upload/js/vendor/jquery.ui.widget.js';
import 'blueimp-file-upload/js/jquery.iframe-transport.js';
import 'blueimp-file-upload/js/jquery.fileupload.js';
import 'blueimp-file-upload/js/jquery.fileupload-process.js';
import 'blueimp-file-upload/js/jquery.fileupload-validate.js';
import 'blueimp-file-upload/js/jquery.fileupload-angular.js';
module.exports = 'lg-upload';

const url = './ws/upload.php';

const app = angular.module(module.exports, ['blueimp.fileupload']);

app.config(['$httpProvider', 'fileUploadProvider', function($httpProvider, fileUploadProvider) {
	// delete $httpProvider.defaults.headers.common['X-Requested-With'];
	// fileUploadProvider.defaults.redirect = window.location.href.replace(/\/[^\/]*$/, '/cors/result.html?%s');
	console.log('fileUploadProvider.defaults', fileUploadProvider.defaults);
	fileUploadProvider.defaults.autoUpload = true;
}]);

import lgUploadHtml from './tmpl/lg-upload.html';

app.component('lgUpload', {
	template: lgUploadHtml,
	bindings: {
		formData: '='
	},
	require: {ngModel: 'ngModel'},
	controller: function LgUploadCtrl($scope, $http, $window) {
		'ngInject';
		console.log('DemoFileUploadController', arguments);
		const ctrl = this;

		ctrl.$onInit = function() {
			console.log('ctrl.formData', ctrl.formData);
			$scope.options = {
				url: url,
				formData: ctrl.formData,
				disableImageResize: /Android(?!.*Chrome)|Opera/.test($window.navigator && navigator.userAgent),
				imageMaxWidth: 1280,
				imageMaxHeight: 960,
				imageCrop: true // Force cropped images
			};
		};


		$scope.$on('fileuploaddone', function(data) {
			console.log('on fileuploaddone', arguments);
			const scope = data.targetScope;
			console.log('scope', scope);
			scope.refresh();
		});
	}
});

/* eslint-disable angular/controller-as */


app.controller('LgUploadInitCtrl', function LgUploadInitCtrl($scope, $http, lgPicture) {
	'ngInject';
	const formData = $scope.$parent.$ctrl.formData;
	console.log('formData XXX', formData);
	$http.get(url + '?suffix=' + formData.suffix).then(function(response) {
		console.log('$http get return', response);
		$scope.queue = response.data.files || [];
		$scope.refresh();
	}).catch(function(error) {
		console.log('$http get error', error);
	});

	$scope.refresh = function() {
		if ($scope.queue.length === 0) {
			delete $scope.file;
			$scope.$parent.$ctrl.ngModel.$setViewValue(undefined);
			return;
		}
		$scope.file = $scope.queue[0];
		$scope.$parent.$ctrl.ngModel.$setViewValue($scope.file);

		if ($scope.file.error !== undefined) {
			$scope.file.reset = function() {
				$scope.queue.pop();
				$scope.refresh();
			};
		}

		$scope.file.$destroy = function() {
			return $http({
				url: $scope.file.deleteUrl + '&suffix=' + formData.suffix,
				method: $scope.file.deleteType
			}).then(function(response) {
				console.log('response', response);
				$scope.clear($scope.file);
				delete $scope.file;
			}).catch(function(error) {
				console.error('error', error);
			});
		};

		$scope.$watch(function() {
			return $scope.active();
		}, function(newValue, oldValue) {
			console.log(oldValue + '->' + newValue);
		});
	};

	$scope.showImage = function() {
		console.log('showImage', arguments, $scope.file);
		lgPicture.show($scope.file.url);
	};
});

/* eslint-enable */