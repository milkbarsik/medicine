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