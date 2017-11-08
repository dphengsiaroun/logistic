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
		if (!lgMobile.isMobile() && $document[0].querySelector('lg-body') !== null) {
			// console.log('getScrollY method $document', $document[0].querySelector('lg-body').scrollTop);
			return $document[0].querySelector('lg-body').scrollTop;
		} else {
			// console.log('getScrollY method $window', $window.scrollY);
			return $window.scrollY;
		}
	};

	this.setScrollY = y => {
		console.log('LgScroll: about to scroll to y', y);
		if (!lgMobile.isMobile() && $document[0].querySelector('lg-body') !== null) {
			// console.log('setScrollY method $document');
			$document[0].querySelector('lg-body').scrollTop = y;
		} else {
			// console.log('setScrollY method $window');
			$window.scrollTo(0, y);
		}
	};
}