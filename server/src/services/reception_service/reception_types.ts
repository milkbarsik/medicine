export interface IReception {
	id: number;
	doctor_id: number;
	patient_id: number;
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