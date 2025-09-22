import { useState } from 'react';
import MyInput from '../../../components/input/myInput';
import useInput from '../../../hooks/useInput';
import styles from '../homePage.module.css';
import { useFetch } from '../../../hooks/useFetch';
import { sicksService } from '../../../api/services';
import { useDiseasesStore } from '../../../store/diseasesStore';

const DiseaseBlock = () => {

	const disease = useInput('');
	const [countSicks, setCountSicks] = useState<number | null>(null);
	const {diseases} = useDiseasesStore();

	const {fetching, isLoading, error} = useFetch (async () => {

		const res = await sicksService.getSicksOfDisease(diseases.find(el => el.title == disease.value)?.id || 0);
		setCountSicks(res.length);
	});

	return (
		<div className={styles.dataBlock}>
			<h4>Количество заболевших болезнью</h4>
			<label className={styles.label} htmlFor="date">
				Напишите название болезни:
				<div className={styles.inputBlock}>
					<MyInput id='disiase' name='disiase' type="text" {...disease}/>
					<button onClick={() => {fetching()}} disabled={isLoading}>
						Искать
					</button>
					<p className={styles.result}>{isLoading === false && error.message === '' && countSicks}</p>
				</div>
			</label>
			<p className={styles.error}>{isLoading === false && error.message !== '' && error.message}</p>
		</div>
	);
};

export default DiseaseBlock;