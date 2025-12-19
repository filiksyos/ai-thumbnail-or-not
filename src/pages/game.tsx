"use client";
import * as React from "react";
import "../styles/game.scss";
import Image from "next/image";
import Link from "next/link";

const SIDES: string[] = ["left", "right"];

const generateRandom = (min = 0, max = 100) => {
	const difference = max - min;
	const rand = Math.random();
	return Math.floor(rand * difference) + min;
};

enum StatesEnum {
	"initial" = 0,
	"left-selection" = 1,
	"right-selection" = 2,
	"score-page" = 3,
}

interface IThumbnailType {
	type: string;
	thumbnailUrl: string;
	youtubeVideoId?: string;
}

// Sample YouTube videos and AI-generated thumbnails
const YOUTUBE_VIDEOS = [
	{ id: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
	{ id: "jNQXAC9IVRw", thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg" },
	{ id: "9bZkp7q19f0", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg" },
];

// Placeholder AI thumbnails (you can replace these with actual AI-generated images)
const AI_THUMBNAILS = [
	"https://picsum.photos/seed/ai1/1280/720",
	"https://picsum.photos/seed/ai2/1280/720",
	"https://picsum.photos/seed/ai3/1280/720",
	"https://picsum.photos/seed/ai4/1280/720",
	"https://picsum.photos/seed/ai5/1280/720",
];

const GamePage = () => {
	const [selected, setSelected] = React.useState<StatesEnum>(
		StatesEnum["initial"]
	);
	const [thumbnailList, setThumbnailList] = React.useState<IThumbnailType[]>(
		[]
	);
	const [score, setScore] = React.useState<number>(0);
	const [keepPlaying, setKeepPlaying] = React.useState<boolean>(true);
	const [personalRecord, setPersonalRecord] = React.useState<number>(0);
	const [globalRecord, setGlobalRecord] = React.useState<number>(0);
	const [youtubeVideoId, setYoutubeVideoId] = React.useState<string>("");

	const resetScore = () => setScore(() => 0);

	const updateLocalStorage = () => {
		const usersObj: any = JSON.parse(
			String(localStorage.getItem("userRecords"))
		);
		const currentUser: any = localStorage.getItem("currentUser");
		if (usersObj[currentUser] < score) {
			usersObj[currentUser] = score;
			localStorage.setItem("userRecords", JSON.stringify(usersObj));
		}
		localStorage.setItem("currentUser", "");
	};

	const setupThumbnail = (side: string, typeObject: IThumbnailType) => {
		const thumbnail = document.getElementById(`${side}-game-thumbnail`);
		if (thumbnail) {
			thumbnail.style.backgroundImage = `url('${typeObject.thumbnailUrl}')`;
			thumbnail.onclick = () => {
				setSelected(() =>
					side === "left"
						? StatesEnum[`left-selection`]
						: StatesEnum[`right-selection`]
				);

				if (typeObject.type === "ai") {
					setScore((score) => score + 1);
					setKeepPlaying(true);
					// Find the real thumbnail to get video ID
					const realThumbnail = thumbnailList.find(
						(t) => t.type === "real"
					);
					if (realThumbnail?.youtubeVideoId) {
						setYoutubeVideoId(realThumbnail.youtubeVideoId);
					}
				} else {
					setKeepPlaying(false);
				}
			};
		}
	};

	const getNewThumbnails = (): void => {
		// Get random YouTube video
		const randomVideo =
			YOUTUBE_VIDEOS[generateRandom(0, YOUTUBE_VIDEOS.length)];

		// Get random AI thumbnail
		const randomAI =
			AI_THUMBNAILS[generateRandom(0, AI_THUMBNAILS.length)];

		const newList: IThumbnailType[] = [
			{
				type: "ai",
				thumbnailUrl: randomAI,
			},
			{
				type: "real",
				thumbnailUrl: randomVideo.thumbnail,
				youtubeVideoId: randomVideo.id,
			},
		];

		// Randomly shuffle left/right
		if (generateRandom(0, 2) === 1) {
			setThumbnailList([...newList.reverse()]);
		} else {
			setThumbnailList([...newList]);
		}
		setYoutubeVideoId("");
	};

	React.useEffect(() => {
		getNewThumbnails();
		const usersObj: any = JSON.parse(
			String(localStorage.getItem("userRecords"))
		);
		const currentUser: string = String(localStorage.getItem("currentUser"));
		setPersonalRecord(Number(usersObj[currentUser]));
		setGlobalRecord(() =>
			Math.max(
				...Object.values(usersObj).map((value: any) => Number(value))
			)
		);
	}, []);

	React.useEffect(() => {
		if (
			selected !== StatesEnum["initial"] &&
			selected !== StatesEnum["score-page"]
		) {
			setTimeout(() => {
				setSelected(() => StatesEnum["score-page"]);
			}, 750);
		}
	}, [selected]);

	React.useEffect(() => {
		thumbnailList.map((obj: IThumbnailType, index: number) =>
			setupThumbnail(SIDES[index], obj)
		);
	}, [thumbnailList]);

	React.useEffect(() => {
		if (score > personalRecord) setPersonalRecord(score);
		if (score > globalRecord) setGlobalRecord(score);
	}, [score]);

	return (
		<div className="p-game">
			<Link href="/">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="50"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="p-game__icon-back"
				>
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
			</Link>
			{selected === StatesEnum["score-page"] ? (
				<div className="p-next-round">
					<div className="p-next-round__score-container">
						<span className="p-next-round__title">SCORE</span>
						<span className="p-next-round__subtitle">
							{localStorage.getItem("currentUser")}
						</span>
						<span className="p-next-round__score">
							<b>{score}</b>
						</span>
					</div>
					<div className="p-next-round__historical-score-container">
						<span>
							<b>{personalRecord}</b> points for personal record
						</span>
						<span>
							<b>{globalRecord}</b> points for global record
						</span>
					</div>

					{youtubeVideoId && keepPlaying && (
						<div className="p-next-round__video-container">
							<iframe
								width="560"
								height="315"
								src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							></iframe>
						</div>
					)}

					<div className="p-next-round__button-container">
						<Link href="/">
							<button
								id="exit-button"
								className="p-next-round__button p-next-round__button--exit"
								onClick={updateLocalStorage}
							>
								Exit
							</button>
						</Link>
						{keepPlaying && (
							<button
								id="next-round-button"
								className="p-next-round__button p-next-round__button--next"
								onClick={() => {
									setSelected(() => StatesEnum["initial"]);
									getNewThumbnails();
								}}
							>
								Next
							</button>
						)}
						{!keepPlaying && (
							<button
								id="try-again-button"
								className="p-next-round__button p-next-round__button--next"
								onClick={() => {
									updateLocalStorage();
									setSelected(() => StatesEnum["initial"]);
									resetScore();
									getNewThumbnails();
								}}
							>
								Try Again
							</button>
						)}
					</div>
				</div>
			) : (
				""
			)}
			{thumbnailList.map((obj: any, index: number) => {
				const state: number =
					index === 0
						? StatesEnum["left-selection"]
						: StatesEnum["right-selection"];
				return (
					<div
						className={`p-game__thumbnail p-game__thumbnail--${SIDES[index]}`}
						id={`${SIDES[index]}-game-thumbnail`}
						key={`side-${SIDES[index]}`}
					>
						{selected === StatesEnum["initial"] ? (
							<div className="p-game__select-thumb">
								<span className="p-game__select-thumb-txt">
									Select Thumbnail
								</span>
							</div>
						) : (
							""
						)}
						{selected === state ? (
							<div className="p-game__result">
								{obj.type === "ai" ? (
									<>
										<div className="p-game__result-img">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="150"
												height="150"
												viewBox="0 0 24 24"
												fill="none"
												stroke="#4ade80"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
												<polyline points="22 4 12 14.01 9 11.01"></polyline>
											</svg>
										</div>
										<span className="p-game__result-txt p-game__result-txt--success">
											SUCCESS
										</span>
									</>
								) : (
									<>
										<div className="p-game__result-img">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="150"
												height="150"
												viewBox="0 0 24 24"
												fill="none"
												stroke="#ef4444"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<circle cx="12" cy="12" r="10"></circle>
												<line x1="15" y1="9" x2="9" y2="15"></line>
												<line x1="9" y1="9" x2="15" y2="15"></line>
											</svg>
										</div>
										<span className="p-game__result-txt p-game__result-txt--wrong">
											WRONG
										</span>
									</>
								)}
							</div>
						) : (
							""
						)}
					</div>
				);
			})}
		</div>
	);
};

export default GamePage;
