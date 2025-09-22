import styles from './diseasesList.module.css';
import DiseaseItem from '../diseasesItem/diseasesItem';
import { useDiseasesStore } from '../../../store/diseasesStore';

const DiseaseList = () => {

	const {diseases} = useDiseasesStore();

	return (
		<div className={styles.wrapper}>
			{diseases.map(diseases => (
				<DiseaseItem key={diseases.id} {...diseases}/>
			))}
		</div>
	);
};

export default DiseaseList;