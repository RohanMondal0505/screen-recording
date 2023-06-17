import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
	const [watch, setWatch] = useState(false);

	const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true, type: "video/mp4" });

	const download = () => {
		const link = document.createElement("a");
		link.href = mediaBlobUrl;
		link.setAttribute("download", `ScreenRecording.mp4`);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
		toast.success("Video Downloaded");
	};

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

			<div className="App">
				<div className="Container">
					{status === "recording" ? (
						<button
							onClick={() => {
								stopRecording();
								toast.success("Recording Stopped");
							}}
							className="StopBtn">
							Stop Recording
						</button>
					) : (
						<button
							onClick={() => {
								startRecording();
							}}
							className="RecordBtn">
							{mediaBlobUrl ? "Record Again" : "Start Recording"}
						</button>
					)}

					<div className="ButtonContainer">
						<button
							disabled={status === "recording" ? true : false}
							onClick={() => {
								if (mediaBlobUrl) setWatch(true);
								else toast.warn("Record first");
							}}>
							Watch
						</button>
						<button
							disabled={status === "recording" ? true : false}
							onClick={() => {
								if (mediaBlobUrl) download();
								else toast.warn("Record first");
							}}>
							Download
						</button>
						<button disabled={status === "recording" ? true : false} onClick={() => toast.info("Coming soon")}>
							Upload
						</button>
					</div>
				</div>

				{watch && mediaBlobUrl && status && status === "stopped" && <video src={mediaBlobUrl} controls autoPlay></video>}
			</div>
		</>
	);
};

export default App;
