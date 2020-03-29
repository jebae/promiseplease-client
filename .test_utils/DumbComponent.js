function DumbBase() {
	this.state = {};
}

DumbBase.prototype.setState = function (ctx, callback) {
	for (let key of Object.keys(ctx)) {
		this.state[key] = ctx[key];
	}
	if (callback)
		callback();
}

export default function DumbFactory({ state, methods }) {
	function DumbChild(props) {
		DumbBase.call(this);
		this.props = (props) ? { ...props } : {};
		this.state = (state) ? { ...state } : {};
		for (let m of Object.keys(methods))
			this[m] = methods[m].bind(this);
	}
	DumbChild.prototype = Object.create(DumbBase.prototype);
	DumbChild.prototype.constructor = DumbChild;
	return DumbChild;
}