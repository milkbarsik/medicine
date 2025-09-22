import MyInput from '../../../components/input/myInput';
import useInput from '../../../hooks/useInput';
import styles from './diseasesForm.module.css';
import { useFetch } from '../../../hooks/useFetch';
import { diseaseService } from '../../../api/services';
import { useDiseasesStore } from '../../../store/diseasesStore';

const DiseaseForm = () => {

	const title = useInput('');

	const {addDisease} = useDiseasesStore();

	const {fetching, isLoading, error} = useFetch( async () => {
		validate();
		const res = await diseaseService.postDisease({
			title: title.value
		});
		if (res) {
			addDisease(res);
			title.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		}
	});

	const validate = () => {
		if (title.value.trim() === '') {
			throw new Error('название не может быть пустым');
		}
	}

	return (
		<div className={styles.wrapper}>
			<h3>Добавить болезнь</h3>
			<label className={styles.label} htmlFor="title">
				название
				<MyInput id='title' name='title' {...title} placeholder='title' />
			</label>
			<button className={styles.button} onClick={() => {fetching()}} disabled={isLoading}>добавить</button>
			<p className='error'>{!isLoading && error.message !== '' && error.message}</p>
		</div>
	);
};

export default DiseaseForm;