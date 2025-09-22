import styles from './medicineList.module.css';
import { useMedicinesStore } from '../../../../store/medicinesStore';
import MedicineItem from '../medicineItem/medicineItem';
import type { FC } from 'react';

type props = {
	setMedicine: (id: number) => void;
	currentId: number | null;
}

const MedicineList: FC<props> = (props) => {

	const {medicines} = useMedicinesStore();

	return (
		<div className={styles.wrapper}>
			{medicines.map(medicine => (
				<MedicineItem key={medicine.id} {...medicine} {...props}/>
			))}
		</div>
	);
};

export default MedicineList;