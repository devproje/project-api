import { Container } from "@mui/joy";
import { HomeView } from "./HomeView";
import styles from "./page.module.scss";

function Home() {
	return (
		<main>
			<Container className={styles.view}>
				<HomeView />
			</Container>
		</main>
	);
}

export default Home;
