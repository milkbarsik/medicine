import styles from './patientsInfo.module.css';
import { useEffect, useState } from 'react';
import { usePatientsStore } from '../../../../store/patientsStore';
import type { Patient } from '../../../../api/types';

const PatientsInfo = ({id}: {id: number | null}) => {

	const {patients} = usePatientsStore();
	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		setPatient(patients.find(p => p.id === id) || null);
	}, [patients, id])

	return (
		<div className={styles.wrapper}>
			<h3>Данные о пользователе</h3>
			<p><span>Номер: </span>{patient?.id}</p>
			<p><span>Имя: </span>{patient?.first_name}</p>
			<p><span>Фамилия: </span>{patient?.last_name}</p>
			<p><span>Отчество: </span>{patient?.middle_name}</p>
      <p><span>Пол: </span>{patient?.gender}</p>
      <p><span>Дата рождения: </span>{patient?.birthday.split('T')[0]}</p>
      <p><span>Адрес: </span>{patient?.address}</p>
		</div>
	);
};

export default PatientsInfo;