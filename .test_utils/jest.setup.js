import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.mock("../src/utils/countUpAnimation");
jest.useFakeTimers();
global.kakao = {
	maps: {
		LatLng: jest.fn(),
		Marker: jest.fn(function() {
			this.setMap = jest.fn();
			this.setOpacity = jest.fn();
		}),
		event: {
			addListener: jest.fn()
		}
	},
}