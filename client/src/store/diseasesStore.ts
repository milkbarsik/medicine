import { create } from 'zustand';
import { diseaseService } from '../api/services';

export type Disease = {
	id: number;
	title: string;
};

export interface IDiseasesState {
	diseases: Disease[];
	updateDiseases: () => Promise<Disease[] | undefined>;
	addDisease: (disease: Disease) => void;
	setDiseases: (diseases: Disease[]) => void;
	getDiseases: () => Disease[];
	getOneDisease: (id: number) => Disease | undefined;
};

export const useDiseasesStore = create<IDiseasesState>((set, get) => ({
	diseases: [],

	updateDiseases: async () => {
		const diseases = await diseaseService.getDiseases();
		if (diseases) {
			set({ diseases });
		}
		return diseases;
	},

	addDisease: (disease: Disease) => {
		set((state) => ({diseases: [...state.diseases, disease]}));
	},

	setDiseases: (diseases: Disease[]) => {
		set({ diseases });
	},

	getDiseases: () => {
		return get().diseases;
	},

	getOneDisease: (id: number) => {
		return get().diseases.find(disease => disease.id === id);
	}

}));