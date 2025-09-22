import type { FC } from 'react';
import styles from './medicineItem.module.css';

type props = {
	id: number;
	title: string;
	setMedicine: (id: number) => void;
	currentId: number | null;
}

const MedicineItem: FC<props> = (props) => {
	return (
		<div className={styles.wrapper} onClick={() => {props.setMedicine(props.id)}}>
			<p
				style={props.currentId === props.id ? {color: '#646cff'} : {}}
			>{props.title}</p>
		</div>
	);
};

export default MedicineItem;