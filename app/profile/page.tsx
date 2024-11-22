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
	type: string;
}

export type Profile = {
	projects: Project[];
	histories: Histories[];
};

const url = "https://raw.githubusercontent.com/devproje/devproje/refs/heads/master/profile.json";

export default async function Profile() {
	const raw = await fetch(url);
	const data: Profile = await raw.json();

	return <Prof data={data} />;
}
