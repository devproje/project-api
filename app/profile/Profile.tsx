"use client";

import { Profile } from "./page";
import styles from "./profile.module.scss";

export function Prof({ data }: { data: Profile }) {
	return (
		<main className="view page center">
			<div className={`${styles.repos}`}>
				<h2>Projects</h2>
				<hr />
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
		</main>
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
