export function LgRoute($transitions, $rootScope, $window, carrier, lgBackDetector) {
	'ngInject';
	this.start = () => {
		$transitions.onStart({}, function(trans) {
			$rootScope.isBackPresent = true;
			console.log('onStart', arguments);
			const from = trans.$from();
			console.log('from', from);
			const to = trans.$to();
			console.log('to', to);
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
			console.log('lgBackDetector', lgBackDetector);
			if (lgBackDetector.isBack === false) {
				$window.scrollTo(0, 0);
			}

		});
	};
}
