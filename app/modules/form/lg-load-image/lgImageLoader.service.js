const url = './ws/upload.php';

export function LgImageLoader($http, $rootScope, lgPicture) {
	'ngInject';
	this.send = function(inputElt, ctrl) {
		console.log('about to send');
		const name = inputElt[0].files[0].name;
        console.log('name', name);
        
        ctrl.file = undefined;

		const formData = new FormData();
		const file = inputElt[0].files[0];

		if (!file.type.match('image.*')) {
			console.error('file is not an image');
			return;
		}

		// Add the file to the request.
		formData.append('files[]', file, file.name);

		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (xhr.status === 200) {
				// File(s) uploaded.
				ctrl.active = false;
                console.log('Upload successful', xhr.response);
                const json = JSON.parse(xhr.response);
                console.log('json', json);
				ctrl.file = json.files[0];

				ctrl.file.$destroy = function() {
					return $http({
						url: ctrl.file.deleteUrl + '&suffix=' + formData.suffix,
						method: ctrl.file.deleteType
					}).then(function(response) {
						console.log('response', response);
					}).catch(function(error) {
						console.error('error', error);
					});
				};

			} else {
                ctrl.file = undefined;
				console.error('Upload not successful');
            }
            $rootScope.$apply();
		};
		console.log('xhr', xhr);
		xhr.upload.addEventListener('progress', function(evt) {
			if (evt.lengthComputable) {
				let percentComplete = evt.loaded / evt.total;
				percentComplete = parseInt(percentComplete * 100);
				console.log(percentComplete);

				if (percentComplete === 100) {
					console.log('complete');
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
