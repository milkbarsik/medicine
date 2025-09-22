import styles from './diseasePage.module.css';
import DiseaseList from './diseasesList/diseasesList';
import DiseaseForm from './diseassesForm/diseasesForm';

const DiseasePage = () => {

	return (
		<div className={styles.wrapper}>
			<section className={styles.diseasesList}>
				<DiseaseList/>
			</section>

			<section className={styles.diseasesForm}>
				<DiseaseForm />
			</section>
		</div>
	);
};

export default DiseasePage;