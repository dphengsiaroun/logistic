export function LgRoute($document, $transitions, $rootScope, $window, carrier, lgBackDetector) {
	'ngInject';
	this.start = () => {
		$transitions.onStart({}, function(trans) {
			$rootScope.isBackPresent = true;
			
			const from = trans.$from();
			const to = trans.$to();
			
			if (from.noBackForNextState) {
				$rootScope.isBackPresent = false;
			}
			if (from.component === 'lgMessage') {
				$rootScope.isBackPresent = false;
			}
			if (from.component === 'lgConfirm') {
				$rootScope.isBackPresent = false;
			}
			if (to.component === 'lgMessage') {
				$rootScope.isBackPresent = false;
			}
			if (to.component === 'lgHomeRoute') {
				$rootScope.isBackPresent = false;
			}

			if (from.name.substr(0, 7) === 'carrier' && to.name.substr(0, 7) !== 'carrier') {
				if (carrier.type === 'update') {
					carrier.initCreateData();
				}
			}
			
			if (lgBackDetector.isBack === false) {
				$window.scrollTo(0, 0);
				$document[0].querySelector('lg-body').scrollTop = 0;
			}
		});
	};
}
