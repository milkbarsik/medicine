import MyInput from '../../../../components/input/myInput';
import useInput from '../../../../hooks/useInput';
import styles from './patientsForm.module.css';
import { useFetch } from '../../../../hooks/useFetch';
import { patientsService } from '../../../../api/services';
import { usePatientsStore } from '../../../../store/patientsStore';

const PatientsForm = () => {

	const first_name = useInput('');
  const middle_name = useInput('');
  const last_name = useInput('');
	const gender = useInput('');
	const birthday = useInput('');
	const address = useInput('');

	const {addPatients} = usePatientsStore()

	const {fetching, isLoading, error} = useFetch( async () => {
		const res = await patientsService.postPatients({
			first_name: first_name.value,
			middle_name: middle_name.value,
			last_name: last_name.value,
			gender: gender.value,
      birthday: birthday.value,
      address: address.value,
		});
		if (res) {
			addPatients(res);
			first_name.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			middle_name.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			last_name.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			gender.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
      birthday.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
      address.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		}
	});

	return (
		<div className={styles.wrapper}>
			<h3>Добавить пациента</h3>
			<label className={styles.label} htmlFor="firstName">
				Имя
				<MyInput id='first_name' name='first_name' {...first_name} placeholder='first_name' />
			</label>
			<label htmlFor="middleName">
				Фамилия
        <MyInput id='middle_name' name='middle_name' {...middle_name} placeholder='middle_name' />
      </label>
      <label htmlFor="lastName"> 
        Отчество
        <MyInput id='last_name' name='last_name' {...last_name} placeholder='last_name' />
      </label>
      <label htmlFor='gender'>
        Пол
        <MyInput id='gender' name='gender' {...gender} placeholder='gender' />
      </label>
      <label htmlFor='birthday'>
        Дата рождения
        <MyInput type='date' id='birthday' name='birthday' {...birthday} placeholder='YYYY-MM-DD' />
      </label>
      <label htmlFor='address'>
        Адрес
        <MyInput id='address' name='address' {...address} placeholder='address' />
      </label>
			<button className={styles.button} onClick={() => {fetching()}} disabled={isLoading}>добавить</button>
			<p className='error'>{!isLoading && error.message !== '' && error.message}</p>
		</div>
	);
};

export default PatientsForm;