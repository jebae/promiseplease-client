import React from "react";
import axios from "axios";
import { shallow, mount } from "enzyme";
import DumbFactory from "../../.test_utils/DumbComponent";
import withMemoryRouter from "../../.test_utils/withMemoryRouter";
import CandidateContainer from "./CandidateContainer";
import Candidate from "../components/Candidate";
import CandidateIndex from "../components/CandidateIndex";

describe("CandidateContainer", () => {
	let realDateNow = Date.now.bind(global.Date);
	const dumbFactory = DumbFactory({
		state: {
			candidates: [],
		},
		methods: {
			getGenderCount: CandidateContainer.WrappedComponent.prototype.getGenderCount,
			getAvgAge: CandidateContainer.WrappedComponent.prototype.getAvgAge,
			getGradientColor: CandidateContainer.WrappedComponent.prototype.getGradientColor,
			getPromiseCats: CandidateContainer.WrappedComponent.prototype.getPromiseCats,
			getCandidates: CandidateContainer.WrappedComponent.prototype.getCandidates,
		}
	});

	beforeAll(() => {
		global.Date.now = jest.fn(() => (new Date("2020-04-15")).getTime());
	});

	const res = {
		status: 200,
		data: {
			candidates: [
				{
					number: 1,
					name: "류현진",
					birth: "1967-02-01",
					gender: "man",
					party: "닫힌우리당",
					promises: [
						{
							cat: [ "경제", "중소기업" ],
							content: "대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.",
						},
						{
							cat: [ "환경" ],
							content: "사면·감형 및 복권에 관한 사항은 법률로 정한다.",
						},
						{
							cat: [ "교육" ],
							content: "모든 국민은 보건에 관하여 국가의 보호를 받는다.",
						},
						{
							cat: [ "환경", "의료" ],
							content: "국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.",
						},
					],
					careers: [
						"삼성전자 대리",
						"Y combinator Security guard",
						"LG CNS 대표이사"
					],
					color: "006400"
				},
				{
					number: 2,
					name: "박찬호",
					birth: "1972-11-11",
					gender: "man",
					party: "미국당",
					promises: [
						{
							cat: [ "경제", "중소기업" ],
							content: "정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.",
						},
						{
							cat: [ "교육" ],
							content: "광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.",
						},
						{
							cat: [ "중소기업" ],
							content: "각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
						},
					],
					careers: [
						"메이져리그 다승왕",
						"KBO 올해의 선수",
						"KBO 총재"
					],
					color: "FF0000"
				},
				{
					number: 3,
					name: "스탠 션파이크",
					birth: "1980-12-25",
					gender: "woman",
					promises: [
						{
							cat: [ "경제" ],
							content: "헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.",
						},
						{
							cat: [ "교육" ],
							content: "국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
						},
						{
							cat: [ "균형발전" ],
							content: "대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.",
						},
					],
					careers: [
						"구조버스 차장",
						"호그와트 사냥터지기",
					],
				}
			]
		}
	}

	test("render", () => {
		let wrapper;
		let component;

		axios.get.mockReturnValue(Promise.resolve(res));
		return new Promise((resolve, reject) => {
			const Component = withMemoryRouter({
				path: "/constituency/:city/:constituency",
				initialEntry: "/constituency/서울/강남구을"
			})(CandidateContainer);
			wrapper = mount(
				<Component
					notifyCandidateGeneralInfo={ jest.fn() }
					fetchCountUp={ jest.fn() }
				/>
			);
			component = wrapper.find(CandidateContainer.WrappedComponent);
			expect(component.exists()).toEqual(true);
			setImmediate(resolve);
		})
		.then(() => wrapper.update())
		.then(() => {
			expect(component.state("candidates")).toHaveLength(res.data.candidates.length);
		});
	});

	describe("Method", () => {
		test("getGenderCount", () => {
			const dumb = new dumbFactory();
			const candidates = [
				{ gender: "man" },
				{ gender: "man" },
				{ gender: "woman" },
			]
			const genderCount = dumb.getGenderCount(candidates);

			expect(genderCount).toEqual({ man: 2, woman: 1 });
		});

		test("getAvgAge", () => {
			const dumb = new dumbFactory();
			const candidates = [
				{ birth: "1967-02-01" },
				{ birth: "1972-11-11" },
				{ birth: "1980-12-25" },
			]
			const age = dumb.getAvgAge(candidates);

			expect(age).toEqual(47);
		});

		test("getPromiseCats", () => {
			const dumb = new dumbFactory();
			const promises = [
				{ cat: [ "경제", "중소기업" ] },
				{ cat: [ "경제", "교육" ] },
				{ cat: [ "교육" ] },
				{ cat: [ "경제" ] },
			];
			const promiseCats = dumb.getPromiseCats(promises);

			expect(promiseCats).toEqual([
				{ cat: "경제", count: 3 },
				{ cat: "교육", count: 2 },
				{ cat: "중소기업", count: 1 },
			]);
		});

		describe("getCandidates", () => {
			let dumb;

			beforeEach(() => {
				dumb = new dumbFactory();
				const notifyCandidateGeneralInfo = jest.fn();
				const fetchCountUp = jest.fn();
	
				dumb.props = {
					match: {
						params: { city: "", district: "" }
					},
					notifyCandidateGeneralInfo,
					fetchCountUp,
				}
			});

			test("200", () => {
				axios.get.mockReturnValue(Promise.resolve(res));
				return new Promise((resolve, reject) => {
					dumb.getCandidates();
					setImmediate(resolve);
				}).then(() => {
					expect(dumb.state.candidates).toHaveLength(res.data.candidates.length);
					expect(dumb.props.notifyCandidateGeneralInfo).toHaveBeenCalledTimes(1);
					expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});

			test("500", () => {
				dumb.state.candidates = [ {}, {} ];
				axios.get.mockReturnValue(Promise.resolve({ status: 500 }));
				return new Promise((resolve, reject) => {
					dumb.getCandidates();
					setImmediate(resolve);
				}).then(() => {
					expect(dumb.state.candidates).toHaveLength(0);
					expect(dumb.props.notifyCandidateGeneralInfo)
						.toHaveBeenCalledWith({ genderCount: { man: 0, woman: 0 }, avgAge: 0 });
					expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});

			test("error", () => {
				dumb.state.candidates = [ {}, {} ];
				axios.get.mockReturnValue(Promise.reject());
				return new Promise((resolve, reject) => {
					dumb.getCandidates();
					setImmediate(resolve);
				}).then(() => {
					expect(dumb.state.candidates).toHaveLength(0);
					expect(dumb.props.notifyCandidateGeneralInfo)
						.toHaveBeenCalledWith({ genderCount: { man: 0, woman: 0 }, avgAge: 0 });
					expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});
		});
	});

	afterAll(() => {
		global.Date.now = realDateNow;
	});
});