import MyInput from '../../components/input/myInput';
import styles from './receptionPage.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useMedicinesStore } from '../../store/medicinesStore';
import { useDiseasesStore } from '../../store/diseasesStore';
import useInput from '../../hooks/useInput';
import { receptionService } from '../../api/services';

const ReceptionPage = () => {

	const patientId = useInput('');
	const doctorId = useInput('');
	const date = useInput('');
	const address = useInput('');
	const symptoms = useInput('');
	const disease = useInput('');
	const description = useInput('');
	const medicine = useInput('');

	const {medicines} = useMedicinesStore();
	const {diseases} = useDiseasesStore();

	const validate = () => {

		if (!patientId.value) {
			throw new Error('Введите номер пациента');
		};
		if (!doctorId.value) {
			throw new Error('Введите номер врача');
		};
		if (!date.value) {
			throw new Error('Введите дату приема');
		};
		if (!address.value) {
			throw new Error('Введите адрес приема');
		};
		if (!disease.value) {
			throw new Error('Введите диагноз');
		};
		if (!medicine.value) {
			throw new Error('Введите лекарство');
		};
		if (!diseases.find(d => d.title === disease.value)) {
			throw new Error('Такого диагноза нет в базе');
		}
		if (!medicines.find(m => m.title === medicine.value)) {
			throw new Error('Такого лекарства нет в базе');
		}
		return true;
	};

	const {fetching, isLoading, error} = useFetch( async () => {
		validate();
		const res = await receptionService.postReception({
			patient_id: Number(patientId.value),
			doctor_id: Number(doctorId.value),
			date: date.value,
			place: address.value,
			symptoms: symptoms.value,
			description: description.value,
			disease_id: diseases.find(d => d.title === disease.value)?.id || 0,
			medicine_id: medicines.find(m => m.title === medicine.value)?.id || 0,
			prescription_description: '',
		});
		console.log(res);
	});

	const cancelReception = () => {
		patientId.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		doctorId.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		date.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		address.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		symptoms.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		disease.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		description.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		medicine.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
	};

	return (
		<div className={styles.wrapper}>
			<h2>Прием пациента</h2>
			<main className={styles.main}>
				<label htmlFor="patien_id">
					номер пациента:
					<MyInput id="patien_id" name="patien_id" type="text" {...patientId}/>
				</label>
				<label htmlFor="doctor_id">
					номер врача:
					<MyInput id="doctor_id" name="doctor_id" type="text" {...doctorId}/>
				</label>
				<label htmlFor="date">
					дата приема:
					<MyInput id="date" name="date" type="date" {...date}/>
				</label>
				<label htmlFor="address">
					адрес приема:
					<MyInput id="address" name="address" type="text" {...address}/>
				</label>
				<label htmlFor="sympthoms">
					симптомы:
					<MyInput id="sympthoms" name="sympthoms" type="text" {...symptoms}/>
				</label>
				<label htmlFor="disease">
					диагноз:
					<MyInput id="disease" name="disease" type="text" {...disease}/>
				</label>
				<label htmlFor="description">
					описание:
					<MyInput id="description" name="description" type="text" {...description}/>
				</label>
				<label htmlFor="medicine">
					лекарство:
					<MyInput id="medicine" name="medicine" type="text" {...medicine}/>
				</label>
				<button onClick={() => {fetching()}}>Записать прием</button>
				<button onClick={() => {cancelReception()}}>Отменить прием</button>
			</main>
			<p className='error'>{!isLoading && error.message !== '' && error.message}</p>
		</div>
	);
};

export default ReceptionPage;