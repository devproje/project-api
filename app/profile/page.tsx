// import fs from "fs";
// import { Prof } from "./Profile";
import styles from "./profile.module.scss";

export type Project = {
	name: string;
	description: string;
	languages: string[];
	url: string;
};

export type Profile = {
	projects: Project[];
};

export default function Profile() {
	// const raw = fs.readFileSync("profile.json");
	// const data: Profile = JSON.parse(raw.toString());

	// return <Prof data={data} />;
	return (
		<main className={`view page center ${styles.no}`}>
			<h1>Comming Soon!</h1>
			<p>Service is not provided yet.</p>
			<hr />

			<a href="/">Back to Website</a>
		</main>
	);
}
