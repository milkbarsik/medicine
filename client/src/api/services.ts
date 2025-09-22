import { $authClient } from "./axios";
import type { Disease, IDiseaseService, IMedicineService, IReception, IReceptionOnPost, IReceptionService, ISicksService, Medicine, Sick } from "./types";

class DiseaseService implements IDiseaseService {
	async getDiseases(): Promise<Disease[]> {
		const res = await $authClient.get('disease');
		return res.data;
	};

	async postDisease(disease: Disease): Promise<Disease> {
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


export const diseaseService = new DiseaseService();
export const medicineService = new MedicineService();
export const receptionService = new ReceptionService();
export const sicksService = new SicksService();