import lgShowPictureHtml from './tmpl/lg-show-picture.html';

export const lgShowPicture = {
	template: lgShowPictureHtml,
	controller: function LgShowPictureCtrl($element, lgPicture) {
		'ngInject';
		lgPicture.ctrl = this;

		this.open = function(url) {
			this.url = url;
			$element.css('display', 'block');
		};
		this.close = function() {
			
			$element.css('display', 'none');
		};
	}
};
