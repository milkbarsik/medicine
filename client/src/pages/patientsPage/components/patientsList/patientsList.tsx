import styles from "./patientsList.module.css"
import type { FC } from 'react';
import { usePatientsStore } from '../../../../store/patientsStore';
import PatientsItem from '../patientsItem/patientsItem';

type props = {
	setPatient: (id: number) => void;
	currentId: number | null;
}

const PatientsList: FC<props> = (props) => {

	const {patients} = usePatientsStore();

	return (
		<div className={styles.wrapper}>
			{patients.map(patients => (
				<PatientsItem key={patients.id} {...patients} {...props}/>
			))}
		</div>
	);
};

export default PatientsList;