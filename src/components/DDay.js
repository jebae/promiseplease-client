import React from "react";
import "../stylesheets/components/DDay.scss";

const DDAY = new Date("Apr 15 2020 00:00:00 GMT+0900");
const ONE_DAY = 1000 * 60 * 60 * 24;

export default function DDay() {
	const now = Date.now();
	const dayCount = Math.floor((now - DDAY.getTime()) / ONE_DAY);
	const text = `D${ (dayCount > 0) ? " + " : " - " }${ (dayCount === 0) ? "Day" : Math.abs(dayCount) }`

	return (
		<div className="GeneralInfo-Section">
			<div className="DDay-Title">21대 총선</div>
			<div className="DDay-DayCount">{ text }</div>
			<div className="DDay-Date">
				{ `${DDAY.getFullYear()}. ${DDAY.getMonth() + 1}. ${DDAY.getDate()}` }
			</div>
		</div>
	);
}