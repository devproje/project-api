"use client";

import styles from "./notfound.module.scss";

export default function NotFound() {
	return (
		<div className="view page center">
			<h1>404 Not Found</h1>
			<p>Current path is not exists: <b>{window.location.pathname}</b></p>
			<hr className={styles.hr} />
			<button onClick={ev => {
				ev.preventDefault();
				window.location.href = "/";
			}}>Back to Website</button>
		</div>
	);
}
