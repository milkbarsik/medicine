import styles from './homePage.module.css';
import DateBlock from './components/dateBlock';
import DiseaseBlock from './components/diseaseBlock';

const HomePage = () => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.textContainer}>
				<h1>Welcome, bad work!</h1>
				<h5>And remember, Hippocrates is watching over you.</h5>
			</div>
			<main className={styles.mainBlock}>
				<DateBlock />
				<DiseaseBlock />
			</main>
		</div>
	)
}

export default HomePage;