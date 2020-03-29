import React from "react";
import { shallow, mount } from "enzyme";
import VoteLocation from "./VoteLocation";
import DumbFactory from "../../.test_utils/DumbComponent";
import * as KakaoMap from "../services/KakaoMap";
jest.mock("../services/KakaoMap");

describe("VoteLocation", () => {
	KakaoMap.loadKakaoMap.mockImplementation(() => {});
	KakaoMap.setMarkerOff.mockImplementation(() => {});
	KakaoMap.setMarkerOn.mockImplementation(() => {});
	KakaoMap.removeMarkers.mockImplementation(() => {});
	KakaoMap.createMarker.mockImplementation(() => {});
	KakaoMap.initMarker.mockImplementation(() => {});
	KakaoMap.setNewCenter.mockImplementation(() => {});

	const dumbFactory = DumbFactory({
		state: {
			currentAddress: -1,
		},
		methods: {
			handleClickAddress: VoteLocation.prototype.handleClickAddress,
			handleClickMarker: VoteLocation.prototype.handleClickMarker,
			handleUpdateLocations: VoteLocation.prototype.handleUpdateLocations,
			setAddressOff: VoteLocation.prototype.setAddressOff,
			setAddressOn: VoteLocation.prototype.setAddressOn,
		}
	});
	const locations = [
		{
			address: "서울특별시 종로구 종로1.2.3.4가동 81-2",
			latitude: 37.572036,
			longitude: 126.976594,
		},
		{
			address: "서울특별시 종로구 내수동 30-1",
			latitude: 37.573800,
			longitude: 126.972732,
		},
		{
			address: "서울특별시 종로구 청운효자동 자하문로17길",
			latitude: 37.581802,
			longitude: 126.969253,
		},
		{
			address: "서울특별시 종로구 삼청동 63-18",
			latitude: 37.583043,
			longitude: 126.981977,
		},
		{
			address: "서울특별시 종로구 종로1.2.3.4가동 인사동10길",
			latitude: 37.574321,
			longitude: 126.985516,
		},
		{
			address: "서울특별시 종로구 종로1.2.3.4가동 103-2",
			latitude: 37.569792,
			longitude: 126.980448,
		},
		{
			address: "서울특별시 중구 정동 1-36",
			latitude: 37.567623,
			longitude: 126.973367,
		},
	];

	afterEach(() => {
		KakaoMap.loadKakaoMap.mockReset();
		KakaoMap.setMarkerOn.mockReset();
		KakaoMap.setMarkerOff.mockReset();
		KakaoMap.removeMarkers.mockReset();
		KakaoMap.createMarker.mockReset();
		KakaoMap.initMarker.mockReset();
		KakaoMap.setNewCenter.mockReset();
	});

	test("render", () => {
		const wrapper = shallow(
			<VoteLocation
				districts={ [] }
				currentDistrict={ -1 }
				currentType="사전"
				locations={ [] }
				getVoteLocations={ jest.fn() }
				changeDistrict={ jest.fn() }
				changeType={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("currentAddress")).toEqual(-1);
		expect("map" in wrapper.instance()).toEqual(true);
		expect("addressBox" in wrapper.instance()).toEqual(true);
		expect(wrapper.instance().addressRefs).toHaveLength(0);
		expect(wrapper.instance().markers).toHaveLength(0);
		expect(wrapper.find("#VoteLocation-Map").exists()).toEqual(true);
		expect(KakaoMap.loadKakaoMap).toHaveBeenCalledTimes(1);
	});

	describe("Methods", () => {
		test("setAddressOff", () => {
			const dumb = new dumbFactory({
				locations
			});
			const toOff = 2;

			dumb.state.currentAddress = toOff;
			dumb.markers = locations.map(() => ({}));
			dumb.setAddressOff();
			expect(dumb.state.currentAddress).toEqual(-1);
			expect(KakaoMap.setMarkerOff).toHaveBeenCalledWith(dumb.markers[toOff]);
		});

		test("setAddressOn", () => {
			const dumb = new dumbFactory({
				locations
			});
			const toOn = 2;

			dumb.markers = locations.map(() => ({}));
			dumb.setAddressOn(toOn);
			expect(dumb.state.currentAddress).toEqual(toOn);
			expect(KakaoMap.setMarkerOn).toHaveBeenCalledWith(dumb.markers[toOn]);
		});

		test("setAddressOn (switch)", () => {
			const dumb = new dumbFactory({
				locations
			});
			const toOn = 2;
			const toOff = 1;

			dumb.state.currentAddress = toOff;
			dumb.markers = locations.map(() => ({}));
			dumb.setAddressOn(toOn);
			expect(dumb.state.currentAddress).toEqual(toOn);
			expect(KakaoMap.setMarkerOn).toHaveBeenCalledWith(dumb.markers[toOn]);
			expect(KakaoMap.setMarkerOff).toHaveBeenCalledWith(dumb.markers[toOff]);
		});

		describe("handleClickAddress", () => {
			test("on", () => {
				const dumb = new dumbFactory({
					locations
				});
				const index = 2;
	
				dumb.setAddressOn = jest.fn();
				dumb.map = { panTo: jest.fn() };
				dumb.handleClickAddress(index);
				expect(dumb.map.panTo).toHaveBeenCalledTimes(1);
				expect(dumb.setAddressOn).toHaveBeenCalledWith(index);
			});

			test("off", () => {
				const dumb = new dumbFactory({
					locations
				});
				const index = 2;
	
				dumb.state.currentAddress = index;
				dumb.setAddressOff = jest.fn();
				dumb.handleClickAddress(index);
				expect(dumb.setAddressOff).toHaveBeenCalledTimes(1);
			});
		});

		test("handleClickMarker", () => {
			const dumb = new dumbFactory({
				locations
			});
			const index = 2;
			
			dumb.setAddressOn = jest.fn();
			dumb.addressRefs = locations.map(() => ({ current: {} }));
			dumb.addressBox = { current: { scrollTo: jest.fn() } };
			dumb.handleClickMarker(index);
			expect(dumb.setAddressOn).toHaveBeenCalledWith(index);
			expect(dumb.addressBox.current.scrollTo).toHaveBeenCalledTimes(1);
		});

		test("handleUpdateLocations", () => {
			const dumb = new dumbFactory({});

			dumb.markers = [];
			dumb.state.currentAddress = 2;
			dumb.map = { setCenter: jest.fn() };
			dumb.handleUpdateLocations(locations);
			expect(KakaoMap.removeMarkers).toHaveBeenCalledTimes(1);
			expect(dumb.addressRefs).toHaveLength(locations.length);
			expect(dumb.markers).toHaveLength(locations.length);
			expect(KakaoMap.initMarker)
				.toHaveBeenCalledTimes(locations.length);
			expect(KakaoMap.setNewCenter).toHaveBeenCalledTimes(1);
			expect(dumb.state.currentAddress).toEqual(-1);
		});
	});

	describe("Props", () => {
		test("locations", () => {
			const wrapper = shallow(
				<VoteLocation
					districts={ [] }
					currentDistrict={ -1 }
					currentType="사전"
					locations={ [] }
					getVoteLocations={ jest.fn() }
					changeDistrict={ jest.fn() }
					changeType={ jest.fn() }
				/>
			);
			
			jest.spyOn(wrapper.instance(), "handleUpdateLocations");
			wrapper.setProps({ locations });
			expect(wrapper.instance().handleUpdateLocations).toHaveBeenCalledTimes(1);
		});
	});

	describe("event", () => {
		const districts = [
			{ name: "마포구" },
			{ name: "은평구" },
			{ name: "서구" },
		];

		test("click address", () => {
			const wrapper = mount(
				<VoteLocation
					districts={ [] }
					currentDistrict={ -1 }
					currentType="사전"
					locations={ [] }
					getVoteLocations={ jest.fn() }
					changeDistrict={ jest.fn() }
					changeType={ jest.fn() }
				/>
			);
			const index = 2;

			jest.spyOn(wrapper.instance(), "handleClickAddress")
				.mockImplementation(() => {});
			wrapper.setProps({ locations, districts });
			wrapper.find(".VoteLocation-Address").at(index).simulate("click");
			expect(wrapper.instance().handleClickAddress).toHaveBeenCalledTimes(1);
		});

		test("click district", () => {
			const changeDistrict = jest.fn();
			const wrapper = mount(
				<VoteLocation
					districts={ [] }
					currentDistrict={ -1 }
					currentType="사전"
					locations={ [] }
					getVoteLocations={ jest.fn() }
					changeDistrict={ changeDistrict }
					changeType={ jest.fn() }
				/>
			);
			const index = 2;

			wrapper.setProps({ locations, districts });
			wrapper.find(".VoteLocation-District").at(index).simulate("click");
			expect(changeDistrict).toHaveBeenCalledWith(index);
		});

		test("click type", () => {
			const changeType = jest.fn();
			const wrapper = mount(
				<VoteLocation
					districts={ [] }
					currentDistrict={ -1 }
					currentType="사전"
					locations={ [] }
					getVoteLocations={ jest.fn() }
					changeDistrict={ jest.fn() }
					changeType={ changeType }
				/>
			);
			
			wrapper.setProps({ locations, districts });
			wrapper.find(".VoteLocation-Type").at(0).simulate("click");
			expect(changeType).toHaveBeenCalledTimes(1);
		});
	});
});