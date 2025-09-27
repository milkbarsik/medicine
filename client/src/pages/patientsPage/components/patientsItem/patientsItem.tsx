import type { FC } from 'react';
import styles from './patientsItem.module.css';

type props = {
	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	setPatient: (id: number) => void;
	currentId: number | null;
}

const PatientsItem: FC<props> = (props) => {
	return (
		<div className={styles.wrapper} onClick={() => {props.setPatient(props.id)}}>
			<p
				style={props.currentId === props.id ? {color: '#646cff'} : {}}
			>{props.first_name} {props.middle_name} {props.last_name}</p>
		</div>
	);
};

export default PatientsItem;