import type { FC } from 'react';
import styles from './diseasesItem.module.css';

type props = {
	id: number;
	title: string;
}

const DiseaseItem: FC<props> = (props) => {
	return (
		<div className={styles.wrapper}>
			<p>{props.title}</p>
		</div>
	);
};

export default DiseaseItem;