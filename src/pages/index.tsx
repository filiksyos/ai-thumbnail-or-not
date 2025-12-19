"use client";

import * as React from "react";
import Link from "next/link";

export default function Home() {
	const [userName, setUserName] = React.useState<string>("");

	React.useEffect(() => {
		localStorage.setItem("currentUser", "");
	}, []);

	return (
		<main className="p-home">
			<div className="p-home__page p-home__page--1">
				<h1 className="p-home__title">YouTube Thumbnail: AI or Not?</h1>
				<div className="p-home__subtitle">
					<h3>
						<b style={{ fontStyle: "italic" }}>MVP Edition</b>
					</h3>
					<h3>Test your ability to spot AI-generated thumbnails</h3>
					<h3>
						Guess which thumbnail is AI-generated and unlock the real
						YouTube video!
					</h3>
				</div>
				<input
					id="playerName"
					className="p-home__user-input"
					placeholder="Username"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setUserName(event.target.value);
					}}
				/>
				<div className="p-home__buttons-container">
					<div className="p-home__game-buttons">
						<Link href="/game">
							<button
								id="game-button"
								className="p-home__button p-home__button--primary"
								onClick={() => {
									const usersObj: any =
										JSON.parse(
											String(
												localStorage.getItem(
													"userRecords"
												)
											)
										) || {};
									const usersObjKeys = Object.keys(usersObj);
									if (
										!usersObjKeys.find(
											(key: string) => key === userName
										)
									) {
										usersObj[userName] = 0;
										localStorage.setItem(
											"userRecords",
											JSON.stringify(usersObj)
										);
									}
									localStorage.setItem(
										"currentUser",
										userName
									);
								}}
							>
								Start Game
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="p-home__page p-home__page--2">
				<div className="p-home__info-container">
					<h2>Description</h2>
					<h3>{`Test your ability to spot AI-generated YouTube thumbnails!`}</h3>
					<h3>
						{`'AI Thumbnail or Not' challenges you to distinguish between two thumbnails – one real YouTube thumbnail, the other AI-generated. Click the AI one correctly to unlock and watch the real video!`}
					</h3>
					<h3>{`Can you tell the difference?`}</h3>
				</div>
				<div className="p-home__info-container">
					<h2>How to play?</h2>
					<h3>{`You will be presented with two YouTube thumbnails simultaneously`}</h3>
					<h3>
						{`Choose the one you believe was created by AI to earn a point and watch the real YouTube video!`}
					</h3>
					<h3>{`Choose the real thumbnail and you lose!`}</h3>
				</div>
				<span className="p-home__copyright-text">
					© 2024 - AI Thumbnail or Not MVP
				</span>
			</div>
		</main>
	);
}
