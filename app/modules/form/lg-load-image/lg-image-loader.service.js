const url = './ws/upload.php';



export function LgImageLoader($http, $rootScope, lgPicture) {
	'ngInject';

	function ImageLoader(ctrl) {

		function removeFile() {
			
			ctrl.file = undefined;
			ctrl.ngModel.$setViewValue(undefined);
		}

		function setFile(file) {
			if (!file) {
				throw new Error('ImageLoader: File is empty');
			}
			ctrl.file = file;
			ctrl.ngModel.$setViewValue(ctrl.file);
			ctrl.file.$destroy = function() {
				return $http({
					url: ctrl.file.deleteUrl + '&suffix=' + ctrl.formData.suffix,
					method: ctrl.file.deleteType
				}).then(function(response) {
					
					removeFile();
				}).catch(function(error) {
					console.error('error', error);
					removeFile();
				});
			};
		}

		this.init = function() {
			let qs = '?';
			if (ctrl.formData && ctrl.formData.suffix) {
				qs = '?suffix=' + ctrl.formData.suffix;
			}
			$http.get(url + qs).then(function(response) {
				
				if (response.data.files && response.data.files.length > 0) {
					setFile(response.data.files[0]);
				} else {
					removeFile();
				}
			}).catch(function(error) {
				
				removeFile();
			});
		};

		this.send = function(inputElt) {
			
			const name = inputElt[0].files[0].name;
			

			removeFile();

			const formData = new FormData();
			const file = inputElt[0].files[0];

			if (!file.type.match('image.*')) {
				console.error('file is not an image');
				return;
			}

			// Add the file to the request.
			formData.append('files[]', file, file.name);
			if (ctrl.formData && ctrl.formData.suffix) {
				formData.append('suffix', ctrl.formData.suffix);				
			}

			const xhr = new XMLHttpRequest();
			xhr.onload = function() {
				if (xhr.status === 200) {
					// File(s) uploaded.
					ctrl.active = false;
					
					const json = JSON.parse(xhr.response);
					
					setFile(json.files[0]);

				} else {
					removeFile();
					console.error('Upload not successful');
				}
				$rootScope.$apply();
			};
			
			xhr.upload.addEventListener('progress', function(evt) {
				if (evt.lengthComputable) {
					let percentComplete = evt.loaded / evt.total;
					percentComplete = parseInt(percentComplete * 100);
					

					if (percentComplete === 100) {
						
					}
					ctrl.progress = percentComplete;
					$rootScope.$apply();
				}
			}, false);
			xhr.open('POST', url, true);

			xhr.send(formData);
			ctrl.active = true;
			$rootScope.$apply();

		};
	}

	this.newInstance = function(ctrl) {
		return new ImageLoader(ctrl);
	};


}
