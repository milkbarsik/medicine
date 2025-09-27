import { useState } from "react";
import styles from "./patientsPage.module.css"
import PatientsList from "./components/patientsList/patientsList";
import PatientsInfo from "./components/patientsInfo/patientsInfo";
import PatientsForm from "./components/patientsForm/patientsForm";

const PatientsPage = () => {

	const [patientId, setPatientId] = useState<number | null>(null);

	return (
		<div className={styles.wrapper}>
			
			<section>
				<PatientsList setPatient={setPatientId} currentId={patientId} />
			</section>
      <section> 
        <PatientsInfo id={patientId}/>
      </section>
      <section>
        <PatientsForm />
      </section>
		</div>
	)
}

export default PatientsPage;