import styles from "./notprovide.module.scss";

export function NotProvide() {
	return (
		<main className={`view page center ${styles.no}`}>
			<h1>Comming Soon!</h1>
			<p>Service is not provided yet.</p>
			<hr />

			<a href="/">Back to Website</a>
		</main>
	);
}
