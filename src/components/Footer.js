import React from "react";
import "../stylesheets/components/Footer.scss";

export default function Footer() {
	return (
		<footer className="Footer">
			<div className="Footer-Info">약속해줘의 데이터는 공공데이터를 기반으로 합니다</div>
			<div className="Footer-Mailto">
				문의 <a href="mailto:help.promiseplease@gmail.com">help.promiseplease@gmail.com</a>
			</div>
		</footer>
	);
}