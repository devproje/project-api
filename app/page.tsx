"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

import projectu from "./PROJECTU.png";

export default function Home() {
	const [born, setBorn] = useState("N/A");

	useEffect(() => {
		// @ts-ignore
		const raw = new Date() - new Date(1078153200);
		const id = setInterval(() => {
			setBorn(raw.toLocaleString("ko-KR"));
		}, 10);

		return () => clearInterval(id);
	});

	return (
		<main className="view page center">
			<Image className={styles.logo} src={projectu} width={300} height={300} alt="" onClick={ev => {
				ev.preventDefault();
				alert("Hello, World!");
			}} />
			<div className={styles.text_area}>
				<h1 className={styles.name}>Project_IO</h1>
				<p>🚀 Hello! I&apos;m Full-Stack developer Project_IO.</p>
				<p>태어난지: {born}ms</p>
			</div>

			<button className={styles.profile_btn} onClick={ev => {
				ev.preventDefault();
				window.location.href = "/profile";
			}}>Get Started</button>
		</main>
	);
}
