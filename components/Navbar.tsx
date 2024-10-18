"use client";

import Image from "next/image";
import { useState } from "react";
import project from "@/app/project.png";
import styles from "./navbar.module.scss";

export function Navbar() {
	const [menu, setMenu] = useState(false);

	return (
		<>
			<nav className={`view ${styles.nav}`}>
				<div className={styles.logo}>
					<a className={styles.menu_btn} onClick={ev => {
						ev.preventDefault();
						setMenu(!menu);
					}}>
						<Image src={project} width={30} height={30} alt="" />
					</a>
					<h2>Project_IO&apos;s Website</h2>
				</div>

				<div className={styles.action_row}></div>
			</nav>
			<Menu menu={menu} setMenu={setMenu} />
		</>
	);
}

export function Menu({
	menu,
	setMenu
}: {
	menu: boolean,
	setMenu: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div className={`${styles.menu} ${menu ? styles.open : ""}`}>
			<div className={styles.title}>
				<a onClick={ev => {
					ev.preventDefault();
					setMenu(false);
				}}>
					<i className="bi bi-x" />
				</a>
			</div>

			<div className={styles.entries}>
				<Entry name="Home" href="/" />
				<Entry name="Profile" href="/profile" />
			</div>
		</div>
	);
}

export function Entry({ name, href }: { name: string, href: string }) {
	return (
		<a className={styles.entry} href={href}>{name}</a>
	);
}
