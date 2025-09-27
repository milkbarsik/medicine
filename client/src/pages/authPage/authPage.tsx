import styles from './authPage.module.css';
import useInput from "../../hooks/useInput";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../store/userStore";
import { useDiseasesStore } from '../../store/diseasesStore';
import { useMedicinesStore } from '../../store/medicinesStore';
import { usePatientsStore } from '../../store/patientsStore';


const AuthPage = () => {

	const username = useInput('');
	const password = useInput('');

	const {login} = useAuth();
	const {updateDiseases} = useDiseasesStore();
	const {updateMedicines} = useMedicinesStore();
	const {updatePatients} = usePatientsStore();

	const {fetching, isLoading, error} = useFetch (async () => {
		const res = await login(username.value, password.value);
		if (res) {
			await updateDiseases();
			await updateMedicines();
			await updatePatients();
		}
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputForm}>

				<div className={styles.inputWrapper}>
					<input className={styles.input} id="username" type="text" autoComplete="off" required {...username}/>
					<label className={styles.label} htmlFor="username">username</label>
				</div>

				<div className={styles.inputWrapper}>
					<input className={styles.input} id="password" type="password" autoComplete="off" required {...password}/>
					<label className={styles.label} htmlFor="password">password</label>
				</div>

				<button type="submit" onClick={() => fetching()}>
					{isLoading ? <p>Loading...</p> : <p>login</p>}
				</button>

				<div className={styles.errorsWrapper}>
					<p className={styles.errorText}>{error.message}</p>
				</div>
			</div>
		</div>
	)
}

export default AuthPage;