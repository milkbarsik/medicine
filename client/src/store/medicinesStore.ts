import { create } from 'zustand';
import { medicineService } from '../api/services';

export type Medicine = {
	id: number;
	title: string;
	indications_of_use: string;
	side_effects: string;
	method_of_use: string;
};

export interface IMedicineState {
	medicines: Medicine[];
	updateMedicines: () => Promise<Medicine[] | undefined>;
	addMedicine: (disease: Medicine) => void;
	setMedicines: (diseases: Medicine[]) => void;
	getMedicines: () => Medicine[];
	getOneMedicine: (id: number) => Medicine | undefined;
};

export const useMedicinesStore = create<IMedicineState>((set, get) => ({
	medicines: [],

	updateMedicines: async () => {
		const medicines = await medicineService.getMedicines();;
		if (medicines) {
			set({ medicines });
		}
		return medicines;
	},

	addMedicine: (medicine: Medicine) => {
		set((state) => ({medicines: [...state.medicines, medicine]}));
	},

	setMedicines: (medicines: Medicine[]) => {
		set({ medicines });
	},

	getMedicines: () => {
		return get().medicines;
	},

	getOneMedicine: (id: number) => {
		return get().medicines.find(medicine => medicine.id === id);
	}

}));