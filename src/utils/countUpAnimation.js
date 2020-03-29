function tick(callback) {
	let currentTime = Date.now();

	setTimeout(() => { callback(currentTime) }, 0);
}

function ease(endVal, progressRate, e) {
	return endVal * (1 - Math.pow(10, -e * progressRate));
}

export default function countUp(endVal, duration, handleValue, checkCancel) {
	let startTime = Date.now();
	let e = Math.log10(endVal);

	function getVal(timestamp) {
		let val = Math.ceil(
			ease(endVal, (timestamp - startTime) / duration, e)
		);

		if (checkCancel() || !handleValue(val) || val >= endVal)
			return ;
		tick((t) => { getVal(t) });
	}
	getVal(startTime);
}