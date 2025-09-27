import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './appRouter/appRouter'
import Header from './components/header/header'
import { useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetch'
import { useAuth } from './store/userStore'
import { useMedicinesStore } from './store/medicinesStore'
import { useDiseasesStore } from './store/diseasesStore'
import { usePatientsStore } from './store/patientsStore'

function App() {

	const {setAuth, setUser, refresh, isAuth} = useAuth();
	const {updateMedicines} = useMedicinesStore();
	const {updateDiseases} = useDiseasesStore();
	const {updatePatients} = usePatientsStore();

	const [currentLoading, setCurrentLoading] = useState<boolean>(true);

	const {fetching, isLoading} = useFetch( async () => {
		const res = await refresh();
		if (res.status === 200) {
			setUser(res.data.user)
			setAuth(true);
			await updateDiseases();
			await updateMedicines();
			await updatePatients();
		} else {
			throw new Error('Не авторизован');
		}
	})

	useEffect(() => {
		if (localStorage.getItem('token')) {
			fetching();
		}
		setCurrentLoading(false);
	}, []);

  return (
    <BrowserRouter>
			{isAuth && <Header />}
			<AppRouter isLoading={isLoading || currentLoading}/>
		</BrowserRouter>
  )
}

export default App
