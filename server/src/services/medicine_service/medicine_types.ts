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
	postMedicine (medicine: Medicine): Promise<Medicine>;
}