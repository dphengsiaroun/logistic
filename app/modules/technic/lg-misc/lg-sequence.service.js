export function LgSequence() {
    'ngInject';
	this.current = 0;
	this.next = function() {
		this.current++;
		return this.current;
	};
}