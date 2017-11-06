export function LgBackDetector($document, $timeout, $transitions, lgScroll) {
	'ngInject';
	this.history = [];
	$transitions.onStart({}, trans => {
		const from = trans.$from().name;
		console.log('from', from);
		const to = trans.$to().name;
		console.log('to', to);
		const last = (this.history.length > 0) ? this.history[this.history.length - 1].name : undefined;
		console.log('last', last);
		if (this.history.length > 0 && to === last) {
			console.log('isBack true');
			this.isBack = true;
			const scroll = this.history.pop().scroll;
			$timeout(() => {
				lgScroll.setScrollY(scroll);
			}, 0);
			
		} else {
			console.log('isBack false');
			this.isBack = false;
			this.history.push({name: from, scroll: lgScroll.getScrollY()});
			$timeout(() => {
				lgScroll.setScrollY(0);
			}, 0);
		}
		console.log('this.history', this.history);
	});

	this.init = () => {};
}
