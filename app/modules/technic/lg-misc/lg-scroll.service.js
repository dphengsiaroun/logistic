export function LgScroll($window, $document, lgMobile) {
	'ngInject';
	const body = $document.find('body').eq(0);
	this.lastSaved = 0;
	this.save = function() {
		this.lastSaved = $window.scrollY;
		body.addClass('lg-scroll-noscroll');
	};
	this.restore = function() {
		body.removeClass('lg-scroll-noscroll');
		$window.scrollTo(0, this.lastSaved);
	};

	this.getScrollY = () => {
		if (lgMobile.isMobile()) {
			return $window.scrollY;
		} else {
			return $document[0].querySelector('lg-body').scrollTop;
		}
	};

	this.setScrollY = y => {
		console.log('LgScroll: about to scroll to y', y);
		if (lgMobile.isMobile()) {
			$window.scrollTo(0, y);
		} else {
			$document[0].querySelector('lg-body').scrollTop = y;
		}
	};
}