import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "./firebase";

const Watch = () => {
	const [videoList, setVideoList] = useState([]);

	const videoRef = ref(storage, "videos/");

	useEffect(() => {
		listAll(videoRef)
			.then((data) => {
				data.items.forEach((item) => {
					getDownloadURL(item).then((url) => {
						setVideoList((pre) => [...pre, url]);
					});
				});
			})
			.catch((e) => console.log(e));
	}, []);

	return (
		<div className="Watch">
			{videoList.length === 0 && <h1>No Recording</h1>}
			{[...videoList].reverse().map((url, index) => (
				<div key={index} className="videoBox">
					<p>{index + 1}</p>
					<video src={url} controls autoPlay={false}></video>
					<button
						title="Copy to clipboard"
						onClick={() => {
							navigator.clipboard.writeText(url);
							toast.info("URL copy to clipboard");
						}}>
						Copy URL
					</button>
				</div>
			))}
		</div>
	);
};

export default Watch;
