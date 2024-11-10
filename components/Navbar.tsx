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
					<a href="/"><h2>Project_IO&apos;s Website</h2></a>
				</div>

				<div className={styles.action_row}>
					<Icon href="https://github.com/devproje" clazz={`${styles.first} bi-github`} />
					<Icon href="https://git.wh64.net/devproje" clazz={"bi-git"} />
					<Icon href="/contact" clazz={`${styles.last} bi-person-rolodex`} />
				</div>
			</nav>
			<Menu menu={menu} setMenu={setMenu} />
		</>
	);
}

function Icon({ href, clazz }: { href: string, clazz: string }) {
	return (
		<a href={href}>
			<i className={`bi ${clazz}`} />
		</a>
	);
}

function Menu({
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
			
			<h2>Website</h2>
			<div className={styles.entries}>
				<Entry name="Home" href="/" />
				<Entry name="Profile" href="/profile" />
				<Entry name="Contact" href="/contact" />
			</div>

			<h2>Services</h2>
			<div className={styles.entries}>
				<Entry name="WSERVER" href="https://wh64.net" />
				<Entry name="WSERVER Forgejo" href="https://git.wh64.net" />
				<Entry name="Project Central" href="https://repo.wh64.net" />
				<Entry name="TeamCity" href="https://ci.wh64.net" />
				<Entry name="WSERVER Wakapi" href="https://wakatime.wh64.net" />
			</div>
		</div>
	);
}

function Entry({ name, href }: { name: string, href: string }) {
	return (
		<a className={styles.entry} href={href}>{name}</a>
	);
}
