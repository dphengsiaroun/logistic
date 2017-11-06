export function LgTransition($transitions, lgBackDetector, $window, $document) {
	'ngInject';
	this.init = () => {
		$transitions.onStart({}, function(trans) {
			console.log('want to scroll up ?');
			if (lgBackDetector.isBack === false) {
				console.log('about to scroll up');
				$window.scrollTo(0, 0);
				$document[0].querySelector('lg-body').scrollTop = 0;
			}
		});
	};
}
