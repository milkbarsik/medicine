import { IPatientsService, Patient } from "./patients_types";
import db from '../../../db';

class PatientsService implements IPatientsService {

	async getPatients() {
		try {
			const patients = await db.query('select * from patients');
			return patients.rows;
		} catch (e) {
			throw new Error('Patients not found')
		}
	};

	async getOnePatient(id: number): Promise<Patient | undefined> {
		try {
			const patients = await db.query('select * from patients where id = $1', [id]);
			return patients.rows[0];
		} catch (e) {
			throw new Error('Patient not found');
		}
	};

	async postPatient(patient: Omit<Patient, 'id'>) {
		try {
			const newPatient = await db.query(
				'insert into patients (first_name, middle_name, last_name, gender, birthday, address) values ($1, $2, $3, $4, $5, $6) returning *',
				[patient.first_name, patient.middle_name, patient.last_name, patient.gender, patient.birthday, patient.address]
			);
			return newPatient.rows[0];
		} catch (e) {
			throw new Error('Patient not created');
		}
	};
}

export default new PatientsService();