import MyInput from '../../components/input/myInput';
import styles from './receptionPage.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useMedicinesStore } from '../../store/medicinesStore';
import { useDiseasesStore } from '../../store/diseasesStore';
import { receptionService } from '../../api/services';
import { useReceptionStore } from '../../store/receptionStore';

const ReceptionPage = () => {

	const {medicines} = useMedicinesStore();
	const {diseases} = useDiseasesStore();
	const {reception, setKeyOFReception,resetReception} = useReceptionStore();

	const validate = () => {

		if (!reception.patient_id) {
			throw new Error('Введите номер пациента');
		};
		if (!reception.doctor_id) {
			throw new Error('Введите номер врача');
		};
		if (!reception.date) {
			throw new Error('Введите дату приема');
		};
		if (!reception.place) {
			throw new Error('Введите адрес приема');
		};
		if (!reception.disease) {
			throw new Error('Введите диагноз');
		};
		if (!reception.medicine) {
			throw new Error('Введите лекарство');
		};
		if (!diseases.find(d => d.title === reception.disease)) {
			throw new Error('Такого диагноза нет в базе');
		}
		if (!medicines.find(m => m.title === reception.medicine)) {
			throw new Error('Такого лекарства нет в базе');
		}
		return true;
	};

	const {fetching, isLoading, error} = useFetch( async () => {
		validate();
		const res = await receptionService.postReception({
			...reception,
			medicine_id: medicines.find(m => m.title === reception.medicine)?.id || 0,
			disease_id: diseases.find(d => d.title === reception.disease)?.id || 0,
		});
		if (res) {
			resetReception();
		}
	});

	const cancelReception = () => {
		resetReception();
	};

	return (
		<div className={styles.wrapper}>
			<h2>Прием пациента</h2>
			<main className={styles.main}>
				<label htmlFor="patien_id">
					номер пациента:
					<MyInput id="patien_id" name="patien_id" type="text" value={reception?.patient_id || ''} onChange={(e) => setKeyOFReception('patient_id', e.target.value)}/>
				</label>
				<label htmlFor="doctor_id">
					номер врача:
					<MyInput id="doctor_id" name="doctor_id" type="text" value={reception?.doctor_id || ''} onChange={(e) => setKeyOFReception('doctor_id', e.target.value)}/>
				</label>
				<label htmlFor="date">
					дата приема:
					<MyInput id="date" name="date" type="date" value={reception.date} onChange={(e) => setKeyOFReception('date', e.target.value)}/>
				</label>
				<label htmlFor="place">
					адрес приема:
					<MyInput id="place" name="place" type="text" value={reception.place} onChange={(e) => setKeyOFReception('place', e.target.value)}/>
				</label>
				<label htmlFor="sympthoms">
					симптомы:
					<MyInput id="sympthoms" name="sympthoms" type="text" value={reception.symptoms} onChange={(e) => setKeyOFReception('symptoms', e.target.value)}/>
				</label>
				<label htmlFor="disease">
					диагноз:
					<MyInput id="disease" name="disease" type="text" value={reception.disease} onChange={(e) => setKeyOFReception('disease', e.target.value)}/>
				</label>
				<label htmlFor="description">
					описание:
					<MyInput id="description" name="description" type="text" value={reception.description} onChange={(e) => setKeyOFReception('description', e.target.value)}/>
				</label>
				<label htmlFor="medicine">
					лекарство:
					<MyInput id="medicine" name="medicine" type="text" value={reception.medicine} onChange={(e) => setKeyOFReception('medicine', e.target.value)}/>
				</label>
				<button onClick={() => {fetching()}}>Записать прием</button>
				<button onClick={() => {cancelReception()}}>Отменить прием</button>
			</main>
			<p className='error'>{!isLoading && error.message !== '' && error.message}</p>
		</div>
	);
};

export default ReceptionPage;