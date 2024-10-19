import fs from "fs";
import { Prof } from "./Profile";

export type Project = {
	name: string;
	description: string;
	languages: string[];
	url: string;
};

export type Histories = {
	name: string;
	history: History[];
};

export type History = {
	name: string;
	date: string;
}

export type Profile = {
	projects: Project[];
	histories: Histories[];
};

export default function Profile() {
	const raw = fs.readFileSync("data.json");
	const data: Profile = JSON.parse(raw.toString());

	return <Prof data={data} />;
}
