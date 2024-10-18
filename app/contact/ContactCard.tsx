"use client";

import styles from "./contact.module.scss";

export function ContactCard() {
	return (
		<main className="view page center">
			<h1>Contact</h1>

			<div className={styles.contact_row}>
				<ContactIcon clazz={"bi-github"} href="https://github.com/devproje" />
				<ContactIcon clazz={"bi-git"} href="https://git.wh64.net/devproje" />
				<ContactIcon clazz={"bi-twitter"} href="https://x.com/_devproje" />
				<ContactIcon clazz={"bi-instagram"} href="https://instagram.com/wh64_" />
				<ContactIcon clazz={styles.bluesky} href="https://bsky.social/profile/projecttl.net" />
				<ContactIcon clazz={"bi-envelope-at"} href="mailto:me@projecttl.net" />
			</div>
		</main>
	);
}

function ContactIcon({ clazz, href }: { clazz: string, href: string }) {
	return (
		<a href={href}>
			<i className={`bi ${styles.icon} ${clazz}`} />
		</a>
	);
}
