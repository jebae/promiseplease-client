import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

const withMemoryRouter = ({ initialEntry, path }) => (Component) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<MemoryRouter initialEntries={ [initialEntry] }>
					<Route path={ path }>
						<Component { ...this.props }/>
					</Route>
				</MemoryRouter>
			);
		}
	};
}
export default withMemoryRouter;