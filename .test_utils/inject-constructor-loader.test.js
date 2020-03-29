import Loader, { getConstructorIdxRange, injectCode }
	from "./inject-constructor-loader";

const injectConstructorLoader = Loader.default;

describe("inject-constructor-loader", () => {
	const singleConstructorSource = `
		const INITIAL_STATE = {
			value: ""
		};
		
		export default class SearchInput extends React.Component {
			constructor(props) {
				super(props);
				this.state = { ...INITIAL_STATE };
				this.handleChange = this.handleChange.bind(this);
			}
		
			handleChange(event) {
				this.setState({ value: event.target.value });
			}
		
			render() {
				const { notifyFocus, notifyBlur } = this.props;
		
				return (
					<input
						className="SearchInput"
						type="text"
						value={ this.state.value }
						onChange={ this.handleChange }
						onFocus={ () => notifyFocus(this.state.value) }
						onBlur={ notifyBlur }
						placeholder="지역, 후보자를 검색해보세요"
					/>
				);
			}
		}
	`
	const multiConstructorSource = `
		const INITIAL_STATE = {
			value: ""
		};
		
		export default class SearchInput extends React.Component {
			constructor(props) {
				super(props);
				this.state = { ...INITIAL_STATE };
				this.handleChange = this.handleChange.bind(this);
			}
		
			handleChange(event) {
				this.setState({ value: event.target.value });
			}
		
			render() {
				const { notifyFocus, notifyBlur } = this.props;
		
				return (
					<input
						className="SearchInput"
						type="text"
						value={ this.state.value }
						onChange={ this.handleChange }
						onFocus={ () => notifyFocus(this.state.value) }
						onBlur={ notifyBlur }
						placeholder="지역, 후보자를 검색해보세요"
					/>
				);
			}
		}

		export default class Foo extends React.Component {
			constructor(props) {
				super(props);
				this.state = { ...INITIAL_STATE };
				this.handleChange = this.handleChange.bind(this);
			}
		
			handleChange(event) {
				this.setState({ value: event.target.value });
			}
		
			render() {
				const { notifyFocus, notifyBlur } = this.props;
		
				return (
					<input
						className="SearchInput"
						type="text"
						value={ this.state.value }
						onChange={ this.handleChange }
						onFocus={ () => notifyFocus(this.state.value) }
						onBlur={ notifyBlur }
						placeholder="지역, 후보자를 검색해보세요"
					/>
				);
			}
		}
	`
	describe("getConstructorIdxRange", () => {
		test("single constructor", () => {
			const re = /constructor\(.*\)[\s\t\n]+\{/g;
			let expectedStart = re.exec(singleConstructorSource).index;
			let i = expectedStart;
			const stack = [];
			
			while (singleConstructorSource[i] !== "{")
				i++;
			stack.push("{");
			while (stack.length > 0) {
				i++;
				if (singleConstructorSource[i] === "{")
					stack.push("{");
				else if (singleConstructorSource[i] === "}")
					stack.pop();
			}
			const [ [start, end] ] = getConstructorIdxRange(singleConstructorSource);
			expect(start).toEqual(expectedStart);
			expect(end).toEqual(i);
		});

		test("multiple constructor", () => {
			const re = /constructor\(.*\)[\s\t\n]+\{/g;
			const stack = [];
			let expectedRes = [];
			
			let match = re.exec(multiConstructorSource);
			while (match !== null) {
				expectedRes.push( [match.index] );
				let stack = ["{"];
				let i = match.index;
				while (multiConstructorSource[i] !== "{")
					i++;
				while (stack.length > 0) {
					i++;
					if (multiConstructorSource[i] === "{")
						stack.push("{");
					else if (multiConstructorSource[i] === "}")
						stack.pop();
				}
				expectedRes[expectedRes.length - 1].push(i);
				match = re.exec(multiConstructorSource);
			}
			const res = getConstructorIdxRange(multiConstructorSource);
			expect(res).toEqual(expectedRes);
			expect(res).toHaveLength(2);
		});

		test("no constructor", () => {
			const source = `
				function Foo(props) {
					return <div></div>
				}
			`
			const res = getConstructorIdxRange(source);
			expect(res).toHaveLength(0);
		});
	});

	test("injectCode", () => {
		const source = `
			constructor(props) {
				super(props);
				this.state = { ...INITIAL_STATE };
				this.handleChange = this.handleChange.bind(this);
		`
		const toInject = "if (this.__constructor__) { this.__constructor__.call(this); }";
		const res = injectCode(source);

		expect(res).toEqual(`${source}\n${toInject}\n`);
	});

	describe("loader", () => {
		test("single injected", () => {
			const res = injectConstructorLoader(singleConstructorSource);
			const re = /if\s\(this\.__constructor__\)\s\{\sthis\.__constructor__\.call\(this\);\s\}/g;

			expect(res.search(re)).not.toEqual(-1);
		});

		test("multiple injected", () => {
			const res = injectConstructorLoader(multiConstructorSource);
			const re = /if\s\(this\.__constructor__\)\s\{\sthis\.__constructor__\.call\(this\);\s\}/g;
			let count = 0;
			let match = re.exec(res);
			while (match !== null) {
				count++;
				match = re.exec(res);
			}
			expect(count).toEqual(2);
		});

		test("not injected", () => {
			const source = `
				function Foo(props) {
					return <div></div>
				}
			`
			const res = injectConstructorLoader(source);
			const re = /if\s\(this\.__constructor__\)\s\{\sthis\.__constructor__\.call\(this\);\s\}/g;
			
			expect(res.search(re)).toEqual(-1);
		});
	});
});