const url = './ws/upload.php';

export function LgImageLoader($http) {
	'ngInject';
	this.send = function(inputElt) {
		console.log('about to send');
		const name = inputElt[0].files[0].name;
		console.log('name', name);

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
				console.log('Upload successful');
			} else {
				console.error('Upload not successful');
			}
		};
		xhr.open('POST', url, true);

		xhr.send(formData);
	};
}
