export function LgPicture() {
	this.ctrl = undefined;
	this.show = function(url) {
		console.log('lgPicture.show', arguments);
		this.ctrl.open(url);
	};
}
