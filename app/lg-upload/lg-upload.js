(function() {
	'use strict';

	var url = './ws/upload.php';

	var app = angular.module('lg-upload', ['blueimp.fileupload']);

	app.config(['$httpProvider', 'fileUploadProvider', function ($httpProvider, fileUploadProvider) {
		//delete $httpProvider.defaults.headers.common['X-Requested-With'];
		//fileUploadProvider.defaults.redirect = window.location.href.replace(/\/[^\/]*$/, '/cors/result.html?%s');
	}]);

	app.controller('FileDestroyController', ['$scope', '$http', function ($scope, $http) {
		var file = $scope.file;
        var state;
		if (file.url) {
			file.$state = function() {
				return state;
			};
			file.$destroy = function() {
				state = 'pending';
				return $http({
					url: file.deleteUrl,
					method: file.deleteType
				}).then(function () {
					state = 'resolved';
					$scope.clear(file);
				}).catch(function() {
					state = 'rejected';
				});
			};

		} else if (!file.$cancel && !file._index) {
			file.$cancel = function () {
				$scope.clear(file);
			};
		}
	}]);

	app.component('lgUpload', {
		templateUrl: './lg-upload/tmpl/lg-upload.html',
		controller: ['$scope', '$http', function ($scope, $http) {
			console.log('DemoFileUploadController', arguments);
			$scope.options = {
				url: url
			};

			$scope.loadingFiles = true;
			$http.get(url).then(function (response) {
				console.log('$http get return', response);
				$scope.loadingFiles = false;
				$scope.queue = response.data.files || [];
			}).catch(function (error) {
				console.log('$http get error', error);
				$scope.loadingFiles = false;
			});
		}]
	});
	

	

})();
