export function LgScroll($window, $document) {
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
}