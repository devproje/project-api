"use client";

import Image from "next/image";
import project from "@/app/project.png";
import styles from "./navbar.module.scss";
import { Container, Drawer } from "@mui/joy";
import { useMenu } from "@/stores/menu.state";
import { CustomButton } from "./CustomButton";

export function Navbar() {
	const menu = useMenu();

	return (
		<Container className={styles.nav}>
			<div className={styles.logo}>
				<a className={styles.menu_btn} onClick={ev => {
					ev.preventDefault();
					menu.setOpen(true);
				}}>
					<Image src={project} width={30} height={30} alt="" />
				</a>
				
				<a className={styles.title} href="/"><h2>Project_IO&apos;s Website</h2></a>
			</div>

			<div className={styles.action_row}>
				<Icon href="https://github.com/devproje" clazz={"bi-github"} />
				<div className={styles.heap}></div>
				<Icon href="https://git.wh64.net/devproje" clazz={"bi-git"} />
			</div>
			<Menu />
		</Container>
	);
}

export function Menu() {
	const menu = useMenu();

	return (
		<Drawer open={menu.open} sx={{
			width: "300px",
			color: "var(--foreground)",
			backgroundColor: "var(--background)",
		}}>
			<div className={styles.menu}>
				<div className={styles.menu_title}>
					<CustomButton icon="bi bi-x-lg" onClick={ev => {
						ev.preventDefault();
						menu.setOpen(false);
					}} />
				</div>
			</div>
		</Drawer>
	)
}

export function Icon({ href, clazz }: { href: string; clazz: string }) {
	return (
		<a href={href} className={styles.action_icon}>
			<i className={clazz} />
		</a>
	);
}
