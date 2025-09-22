import styles from './medicineInfo.module.css';
import { type Medicine, useMedicinesStore } from '../../../../store/medicinesStore';
import { useEffect, useState } from 'react';

const MedicineInfo = ({id}: {id: number | null}) => {

	const {medicines} = useMedicinesStore();
	const [medicine, setMedicine] = useState<Medicine | null>(null);

	useEffect(() => {
		setMedicine(medicines.find(med => med.id === id) || null);
	}, [medicines, id])

	return (
		<div className={styles.wrapper}>
			<h3>{medicine?.title}</h3>
			<p><span>Показания к применению: </span>{medicine?.indications_of_use}</p>
			<p><span>Способ применения: </span>{medicine?.method_of_use}</p>
			<p><span>Побочные эффекты: </span>{medicine?.side_effects}</p>
		</div>
	);
};

export default MedicineInfo;