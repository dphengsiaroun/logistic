import lgLoadImageHtml from './tmpl/lg-load-image.html';

export const LgLoadImage = {
	template: lgLoadImageHtml,
	require: {ngModel: 'ngModel'},
	bindings: {
		formData: '<',
	},
	controller: function LgLoadImageCtrl($element, $scope, lgImageLoader) {
		'ngInject';
		this.active = false;
		this.progress = 0;
		this.$onInit = () => {
			const imageLoader = lgImageLoader.newInstance(this);			
			$scope.$watch('$ctrl.formData', function() {
				imageLoader.init();
			}, true);
			
			const inputElt = $element.find('input');
			inputElt.on('change', function() {
				imageLoader.send(inputElt);
			});
		};

		this.overlay = 0;
		const overlayElt = $element.find('img-overlay');

		this.openOverlay = () => {
			console.log('openOverlay', this.file);
			this.overlay = 1;
		};
		this.closeOverlay = () => {
			console.log('closeOverlay');
			this.overlay = 0;
		};
		$scope.$watch('$ctrl.overlay', () => {
			if (this.overlay) {
				overlayElt.addClass('on');
			} else {
				overlayElt.removeClass('on');
			}
		});


	}
};
