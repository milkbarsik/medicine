import MyInput from '../../../../components/input/myInput';
import useInput from '../../../../hooks/useInput';
import styles from './medicineForm.module.css';
import { useFetch } from '../../../../hooks/useFetch';
import { useMedicinesStore } from '../../../../store/medicinesStore';
import { medicineService } from '../../../../api/services';

const MedicineForm = () => {

	const title = useInput('');
	const indications_of_use = useInput('');
	const method_of_use = useInput('');
	const side_effects = useInput('');

	const {addMedicine} = useMedicinesStore();

	const {fetching, isLoading, error} = useFetch( async () => {
		validate();
		const res = await medicineService.postMedicine({
			title: title.value,
			indications_of_use: indications_of_use.value,
			method_of_use: method_of_use.value,
			side_effects: side_effects.value,
		});
		if (res) {
			addMedicine(res);
			title.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			indications_of_use.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			method_of_use.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			side_effects.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		}
	});

	const validate = () => {
		if (title.value.trim() === '') {
			throw new Error('название не может быть пустым');
		}
	}

	return (
		<div className={styles.wrapper}>
			<h3>Добавить лекарство</h3>
			<label className={styles.label} htmlFor="title">
				название
				<MyInput id='title' name='title' {...title} placeholder='title' />
			</label>
			<label htmlFor="idicationOfUse">
				показания к применению
				<MyInput id='idicationOfUse' name='idicationOfUse' {...indications_of_use} placeholder='indications_of_use' />
			</label>
			<label htmlFor="methodOfUse">
				способ применения
				<MyInput id='methodOfUse' name='methodOfUse' {...method_of_use} placeholder='method_of_use' />
			</label>
			<label htmlFor="sideEffects">
				побочные эффекты
				<MyInput id='sideEffects' name='sideEffects' {...side_effects} placeholder='side_effects' />
			</label>
			<button className={styles.button} onClick={() => {fetching()}} disabled={isLoading}>добавить</button>
			<p className='error'>{!isLoading && error.message !== '' && error.message}</p>
		</div>
	);
};

export default MedicineForm;