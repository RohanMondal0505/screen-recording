import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Record from "./Record";
import Watch from "./Watch";
import "./index.scss";
import NavigatePage from "./NavigatePage";

const Router = () => {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme="light"
			/>

			<BrowserRouter>
				<Routes>
					<Route path="/screen-recording/" element={<NavigatePage />} />
					<Route path="/screen-recording/recording" element={<Record />} />
					<Route path="/screen-recording/watch" element={<Watch />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
