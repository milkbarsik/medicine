import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './appRouter/appRouter'
import Header from './components/header/header'
import { useDiseasesStore } from './store/diseasesStore'
import { useEffect } from 'react'
import { useMedicinesStore } from './store/medicinesStore'
import { useFetch } from './hooks/useFetch'

function App() {

	const {updateDiseases} = useDiseasesStore();
	const {updateMedicines} = useMedicinesStore();

	const {fetching, isLoading, error} = useFetch( async () => {
		await updateDiseases();
		await updateMedicines();
	})

	useEffect(() => {
		fetching();
	}, []);

  return (
    <BrowserRouter>
			<Header />
			<AppRouter isLoading={isLoading}/>
		</BrowserRouter>
  )
}

export default App
