import { create } from "zustand";

export type Reception = {
	patient_id: number | null;
	patient_name: string;
	date: string;
	place: string;
	symptoms?: string;
	disease: string;
	description?: string;
	medicine: string;
	prescription_description?: string;
};

export interface IReceptionState {
	reception: Reception;
	setKeyOFReception: (key: string, value: string) => void;
	setReception: (reception: Reception) => void;
	resetReception: () => void;
	getReception: () => Reception;
};

export const useReceptionStore = create<IReceptionState>((set, get) => ({
	reception: {
		patient_id: null,
		patient_name: '',
		date: '',
		place: '',
		disease: '',
		medicine: '',
	},

	setKeyOFReception: (key: string, value: string) => {
		set((state) => ({reception: {...state.reception, [key]: value}}));
	},

	setReception: (reception: Reception) => {
		set({ reception });
	},

	resetReception: () => {
		set((state) => ({...state,
			reception: {
				patient_id: null,
				patient_name: '',
				date: '',
				place: '',
				disease: '',
				medicine: ''
			}
		}));
	},

	getReception: () => {
		return get().reception;
	}
}));