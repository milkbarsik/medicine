import type { AxiosResponse } from "axios";
import { $authClient } from "./axios";
import type { Disease, IAuthUser, IDiseaseService, IMedicineService, IPatientsService, IReception, IReceptionOnPost, IReceptionService, ISicksService, IUserData, Medicine, Patient, Sick } from "./types";

class DiseaseService implements IDiseaseService {
	async getDiseases(): Promise<Disease[]> {
		const res = await $authClient.get('disease');
		return res.data;
	};

	async postDisease(disease: Omit<Disease, 'id'>): Promise<Disease> {
		const res = await $authClient.post('disease', disease);
		return res.data;
	};
};

class MedicineService implements IMedicineService {
	async getMedicines(): Promise<Medicine[]> {
		const res = await $authClient.get('medicines');
		return res.data;
	};

	async getOneMedicine(id: number): Promise<Medicine | null> {
		const res = await $authClient.get(`medicines/${id}`);
		return res.data;
	};

	async postMedicine(medicine: Omit<Medicine, 'id'>): Promise<Medicine> {
		const res = await $authClient.post('medicines', medicine);
		return res.data;
	};
};

class ReceptionService implements IReceptionService {
	async postReception(reception: Omit<IReceptionOnPost, 'id'>): Promise<IReception> {
		const res = await $authClient.post('reseptions', reception);
		return res.data;
	};
};

class SicksService implements ISicksService {
	async getSicksOfDisease(disease_id: number): Promise<Sick[]> {
		const res = await $authClient.get(`sicks_of_disease/${Number(disease_id)}`);
		return res.data;
	};

	async getSicksOfDate(date: string): Promise<Sick[]> {
		const res = await $authClient.get(`sicks_of_date/${date}`);
		return res.data;
	};
};

class PatientsService implements IPatientsService {
	async getPatients(): Promise<Patient[]> {
		const res = await $authClient.get('patients');
		return res.data;
	};

	async getOnePatient(id: number): Promise<Patient | null> {
		const res = await $authClient.get(`patients/${id}`);
		return res.data;
	};

	async postPatients(patients: Omit<Patient, 'id'>): Promise<Patient> {
		const res = await $authClient.post('patients', patients);
		return res.data;
	};
};

class AuthUser implements IAuthUser {
	
	async login (login: string, password: string): Promise<IUserData> {
		const res: AxiosResponse<IUserData> = await $authClient.post('/login', {login, password});
		return res.data;
	}

	async logOut (): Promise<void> {
		await $authClient.post('/logout');
	}

	async refresh (): Promise<AxiosResponse<IUserData>> {
		const res: AxiosResponse<IUserData> = await $authClient.post(`/refresh`);
		return res;
	}
}


export const diseaseService = new DiseaseService();
export const medicineService = new MedicineService();
export const receptionService = new ReceptionService();
export const sicksService = new SicksService();
export const patientsService = new PatientsService();
export const authUser = new AuthUser();