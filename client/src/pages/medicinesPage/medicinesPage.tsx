import { useState } from 'react';
import MedicineForm from './components/medicineForm/medicineForm';
import MedicineInfo from './components/medicineInfo/medicineInfo';
import MedicineList from './components/medicineList/medicineList';
import styles from './medicinesPage.module.css';

const MedicinesPage = () => {

	const [medicineId, setMedicineId] = useState<number | null>(null);

	return (
		<div className={styles.wrapper}>
			
			<section className={styles.medicineList}>
				<MedicineList setMedicine={setMedicineId} currentId={medicineId} />
			</section>

			<section className={styles.medicineInfo}>
				<MedicineInfo id={medicineId}/>
			</section>

			<section className={styles.medicineForm}>
				<MedicineForm />
			</section>

		</div>
	)
}

export default MedicinesPage;