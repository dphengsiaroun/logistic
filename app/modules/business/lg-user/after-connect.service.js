export function AfterConnect($injector, $state) {
	'ngInject';
	this.set = (obj) => {
		localStorage.setItem('afterConnect', angular.toJson(obj));
	};

	this.execute = () => {
		const json = localStorage.getItem('afterConnect');
		localStorage.removeItem('afterConnect');
		if (json === null) {
			if ($state.$current.name === 'home') {
				return;
			}
			$state.go('home');
			return;
		}
		const obj = angular.fromJson(json);

		if (obj.fn && obj.service) {
			const service = $injector.get(obj.service);
			if (obj.fn in service) {

				service[obj.fn].apply(null, obj.args);
			}
		}

		$state.go(obj.state);
    };
}
