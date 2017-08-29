export function LgSequence() {
	this.current = 0;
	this.next = function() {
		this.current++;
		return this.current;
	};
}