export type Patient = {
	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	gender: 'male'|'female'| 'other';
	birthday: string;
	address: string;
};

export interface IPatientsService {
	getPatients (): Promise<Patient[]>;
	getOnePatient (id: number): Promise<Patient | undefined>;
	postPatient (patients: Omit<Patient, 'id'>): Promise<Patient>;
}