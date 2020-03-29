function getConstructorIdxRange(source) {
	const re = /constructor\(.*\)[\s\t\n]+\{/g;
	const stack = [];
	const res = [];
	
	let match = re.exec(source);
	while (match !== null) {
		res.push( [match.index] );
		let stack = ["{"];
		let i = match.index;
		while (source[i] !== "{")
			i++;
		while (stack.length > 0) {
			i++;
			if (source[i] === "{")
				stack.push("{");
			else if (source[i] === "}")
				stack.pop();
		}
		res[res.length - 1].push(i);
		match = re.exec(source);
	}
	return res;
}

// Assume constructor code is end before "}"
function injectCode(constructorCode) {
	const toInject = "if (this.__constructor__) { this.__constructor__.call(this); }";

	return `${constructorCode}\n${toInject}\n`;
}

function injectConstructorLoader(source) {
	const ranges = getConstructorIdxRange(source);
	let res = "";
	let prevEnd;

	if (ranges.length === 0)
		return source;
	prevEnd = 0;
	for (let i=0; i < ranges.length; i++) {
		let [ start, end ] = ranges[i];
		res += source.substring(prevEnd, start);
		res += injectCode(source.substring(start, end));
		prevEnd = end;
	}
	res += source.substring(prevEnd, source.length);
	return res;
}

module.exports = {
	default: injectConstructorLoader,
	getConstructorIdxRange,
	injectCode,
}