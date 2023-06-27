import React from "react";
import { Link } from "react-router-dom";

const NavigatePage = () => {
	return (
		<div className="NavigatePage">
			<Link to="/screen-recording/recording">Record Screen</Link>
			<Link to="/screen-recording/watch">Watch Screen Recording</Link>
		</div>
	);
};

export default NavigatePage;
