import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { toast } from "react-toastify";
import { storage } from "./firebase";

const Record = () => {
	const [watch, setWatch] = useState(false);
	const [url, setUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });

	const download = () => {
		try {
			const pathName = `screen_recording_${new Date().getTime()}.mp4`;
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				// for IE
				window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
			} else {
				// for chrome
				const link = document.createElement("a");
				link.href = mediaBlobUrl;
				link.download = pathName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
			toast.success("Video Downloaded");
		} catch (error) {
			console.log(error);
		}
	};

	const upload = async () => {
		if (!mediaBlobUrl) return toast.warn("Record first !!");
		try {
			setIsLoading(true);
			const videoBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
			const videoFile = new File([videoBlob], `screen_recording_${new Date().getTime()}.mp4`, { type: "audio/mp4" });
			const videoRef = ref(storage, `videos/${videoFile.name}`);
			uploadBytes(videoRef, videoFile).then((data) => {
				toast.success("Video Uploaded Successfully !");
				getDownloadURL(data.ref).then((url) => {
					setUrl(url);
					setIsLoading(false);
				});
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<>
			<div className="Record">
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
						{/* <button
							disabled={status === "recording" ? true : false}
							onClick={() => {
								if (mediaBlobUrl) download();
								else toast.warn("Record first");
							}}>
							Download
						</button> */}
						<button disabled={status === "recording" ? true : false || isLoading} onClick={() => upload()}>
							{isLoading ? "Uploading..." : "Upload"}
						</button>
					</div>
				</div>

				{watch && mediaBlobUrl && status && status === "stopped" && <video src={mediaBlobUrl} controls autoPlay></video>}
				{url && (
					<div className="urlContainer">
						<p>{url}</p>
						<button
							title="Copy to clipboard"
							onClick={() => {
								navigator.clipboard.writeText(url);
								toast.info("URL copy to clipboard");
							}}>
							Copy URL
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Record;
