export function LgTransition($window, $document, $transitions, lgBackDetector, lgMobile) {
	'ngInject';
	this.init = () => {
		$transitions.onStart({}, function(trans) {
			console.log('want to scroll up ?');
			if (lgBackDetector.isBack === false) {
				console.log('about to scroll up');
				if (lgMobile.isMobile()) {
					console.log('isMobile true');
					$window.scrollTo(0, 0);
				} else {
					console.log('isMobile false');					
					$document[0].querySelector('lg-body').scrollTop = 0;
				}
			}
		});
	};
}
