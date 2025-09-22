export type Disease = {
	id: number;
	title: string;
};

export interface IDiseaseService {
	getDisease (): Promise<Disease[]>;
	postDisease (disease: Omit<Disease, 'id'>): Promise<Disease>;
}