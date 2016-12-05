(function() {
	'use strict';

	var url = './ws/upload.php';

	var app = angular.module('lg-upload', ['blueimp.fileupload']);

	app.config(['$httpProvider', 'fileUploadProvider', function ($httpProvider, fileUploadProvider) {
		//delete $httpProvider.defaults.headers.common['X-Requested-With'];
		//fileUploadProvider.defaults.redirect = window.location.href.replace(/\/[^\/]*$/, '/cors/result.html?%s');
		console.log('fileUploadProvider.defaults', fileUploadProvider.defaults);
		fileUploadProvider.defaults.autoUpload = true;
	}]);

	app.controller('FileDestroyController', ['$scope', '$http', function ($scope, $http) {
		var file = $scope.file;
        var state;
		if (file.url) {
			file.$state = function() {
				return state;
			};

		} else if (!file.$cancel && !file._index) {
			file.$cancel = function () {
				$scope.clear(file);
			};
		}
	}]);

	app.component('lgUpload', {
		templateUrl: './lg-upload/tmpl/lg-upload.html',
		bindings: {
			formData: '='
		},
		controller: ['$scope', '$http', function ($scope, $http) {
			console.log('DemoFileUploadController', arguments);
			//this.$onInit = function() {
				console.log('this.formData', this.formData);
				$scope.options = {
					url: url,
					formData: this.formData
				};
			//};
			

			$scope.$on('fileuploaddone', function(data) {
				console.log('on fileuploaddone', arguments);
				var scope = data.targetScope;
				console.log('scope', scope);
				if (scope.queue.length === 0) {
					return;
				}
				scope.file = scope.queue[0];
				scope.file.$destroy = function() {
					return $http({
						url: scope.file.deleteUrl,
						method: scope.file.deleteType
					}).then(function(response) {
						console.log('response', response);
						scope.clear(scope.file);
						delete scope.file;
					}).catch(function(error) {
						console.error('error', error);
					});
				};
			});

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
