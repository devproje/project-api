"use client";

import Image from "next/image";
import { Button } from "@mui/joy";
import projectu from "./PROJECTU.png";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";

export function HomeView() {
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
		<div className={styles.content}>
			<Image className={styles.logo} src={projectu} width={300} height={300} alt="" onClick={ev => {
				ev.preventDefault();
				alert("Hello, World!");
			}} />
			<div className={styles.text_area}>
				<h1 className={styles.name}>Project_IO</h1>
				<p>🚀 Hello! I&apos;m Full-Stack Developer and DevOps.</p>
				<p className={styles.born}>태어난지: {born}ms</p>
			</div>

			<Button sx={{ fontWeight: 400 }} onClick={ev => {
				ev.preventDefault();
				window.location.href = "/profile";
			}}>Get Started</Button>
		</div>
	)
}
