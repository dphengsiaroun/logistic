export function LgBackDetector($transitions) {
	'ngInject';
	this.history = [];
	$transitions.onStart({}, trans => {
		
		const from = trans.$from().name;
		console.log('from', from);
		const to = trans.$to().name;
		console.log('to', to);
		const last = this.history[this.history.length - 1];
		console.log('last', last);
		if (this.history.length > 0 && to === last) {
			console.log('isBack true');
			this.isBack = true;
			this.history.pop();
		} else {
			console.log('isBack false');
			this.isBack = false;
			this.history.push(from);
		}
		console.log('this.history', this.history);
	});
}
