"use client";

import Image from "next/image";
import { Profile } from "./page";
import project from "@/app/PROJECTU.png";
import styles from "./profile.module.scss";

export function Prof({ data }: { data: Profile }) {
	return (
		<main className="view page center">
			<div className={styles.profile}>
				<div className={styles.info}>
					<Image className={styles.image} src={project} width={256} height={256} alt="" />
					<h1>Project_IO</h1>
					<h4>(Real Name: Wonhyeok Kim)</h4>
					<p>Full-Stack Developer & DevOps</p>

					<div className={styles.heap}>
						<b>🏢 Company</b>
						<ul className={styles.company}>
							<li>동양미래대학교 컴퓨터정보공학과 23학번</li>
							<li>Project Playground</li>
						</ul>
					</div>
				</div>
				<div className={styles.view}>
					<Project data={data} />
					<History data={data} />
					<Contact />
				</div>
			</div>
		</main>
	);
}

function Contact() {
	return (
		<>
			<div className={styles.title}>
				<h2>📲 Contact</h2>
				<hr />
			</div>
			<div className={styles.contact}>
				<a href="/contact">Go to Contact Page</a>
			</div>
		</>
	)
}

function Project({ data }: { data: Profile }) {
	return (
		<>
			<div className={styles.title}>
				<h2>📝 Project</h2>
				<hr />
			</div>
			<div className={styles.repos}>
				{data.projects.map((project, n) => {
					return (
						<a className={styles.repo} href={project.url} key={n}>
							<h2>{project.name}</h2>
							<span>{project.description}</span>

							<div className={styles.lang_indicator}>
								{project.languages.map((lang, n) => {
									return <div className={`${styles.lang} ${styleExporter(lang)}`} key={n}></div>;
								})}
							</div>
						</a>
					);
				})}
			</div>
		</>
	);
}

function Tooltip({ type }: { type: string }) {
	let render;
	const name = <p className={styles.tip_content}>{type.charAt(0).toUpperCase() + type.substring(1, type.length)}</p>;

	switch (type) {
	case "person":
		render = <i className={`bi bi-person ${styles.tooltip}`}>{name}</i>;
		return;
	case "school":
		render = <i className={`bi bi-building-check ${styles.tooltip}`}>{name}</i>;
		break
	case "license":
		render = <i className={`bi bi-patch-check ${styles.tooltip}`}>{name}</i>;
		break;
	case "conference":
		render = <i className={`bi bi-code-slash ${styles.tooltip}`}>{name}</i>;
		break;
	case "competition":
		render = <i className={`bi bi-braces ${styles.tooltip}`}>{name}</i>;
		break;
	default:
		render = <i className={`${styles.verified}`} />;
	}

	return (
		<>
			{render}
		</>
	);
}

function History({ data }: { data: Profile }) {
	return (
		<>
			<div className={styles.title}>
				<h2>📜 History</h2>
				<hr />
			</div>

			<div className={styles.history} id="history">
				{data.histories.map((h, n) => {
					return (
						<div key={n} className={styles.histories}>
							<h3>{h.name}</h3>
							<div className={styles.history_ref}>
								{h.history.map((d, n) => {
									return (
										<div className={styles.history_item} key={n}>
											<Tooltip type={d.type} />
											<code>{d.date}</code>
											<span>{d.name}</span>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function styleExporter(id: string): string {
	switch (id) {
		case "c":
			return styles.c;
		case "golang":
			return styles.golang;
		case "java":
			return styles.java;
		case "kotlin":
			return styles.kotlin;
		case "python":
			return styles.python;
		case "javascript":
			return styles.javascript;
		case "typescript":
			return styles.typescript;
		case "bash":
			return styles.bash;
		case "sql":
			return styles.sql;
		case "scala":
			return styles.scala;
		case "groovy":
			return styles.groovy;
		case "rust":
			return styles.rust;
		default:
			return styles.any;
	}
}
