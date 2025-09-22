import { useState } from 'react';
import MyInput from '../../../components/input/myInput';
import useInput from '../../../hooks/useInput';
import styles from '../homePage.module.css';
import { useFetch } from '../../../hooks/useFetch';
import { sicksService } from '../../../api/services';

const DateBlock = () => {

	const date = useInput('');
	const [countSicks, setCountSicks] = useState<number | null>(null);
	
	const {fetching, isLoading, error} = useFetch( async () => {
		const res = await sicksService.getSicksOfDate(date.value);
		setCountSicks(res.length);
	})

	return (
		<div className={styles.dataBlock}>
			<h4>Количество вызовов по дате</h4>
			<label className={styles.label} htmlFor="date">
				Выберите дату:
				<div className={styles.inputBlock}>
					<MyInput id='date' name='date' type="date" {...date}/>
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

export default DateBlock;