export function LgPicture() {
	this.ctrl = undefined;
	this.show = function(url) {
		
		this.ctrl.open(url);
	};
}
