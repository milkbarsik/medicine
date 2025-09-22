export type Disease = {
	id: number;
	title: string;
};

export interface IDiseaseService {
	getDiseases (): Promise<Disease[]>;
	postDisease (disease: Disease): Promise<Disease>;
}



export type Medicine = {
	id: number;
	title: string;
	indications_of_use: string;
	side_effects: string;
	method_of_use: string;
};

export interface IMedicineService {
	getMedicines (): Promise<Medicine[]>;
	getOneMedicine (id: number): Promise<Medicine | null>;
	postMedicine (medicine: Omit<Medicine, 'id'>): Promise<Medicine>;
}



export interface IReception {
	id: number;
	doctor_id: number | null;
	patient_id: number | null;
	date: string;
	place: string;
	symptoms: string;
	description?: string;
}

export interface IReceptionOnPost extends IReception {
	disease_id: number;
	medicine_id: number;
	prescription_description?: string;
}

export interface IReceptionService {
	postReception (reception: IReceptionOnPost): Promise<IReception>;
}



export type Sick = {
	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	gender: 'male'|'female'| 'other';
	birthday: string;
	address: string;
};

export interface ISicksService {
	getSicksOfDisease (disease_id: number): Promise<Sick[]>;
	getSicksOfDate (date: string): Promise<Sick[]>;
}