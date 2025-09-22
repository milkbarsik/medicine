import { create } from "zustand";

export type Reception = {
	patient_id: number | null;
	doctor_id: number | null;
	date: string;
	place: string;
	symptoms: string;
	disease: string;
	description: string;
	medicine: string;
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
		doctor_id: null,
		date: '',
		place: '',
		symptoms: '',
		disease: '',
		description: '',
		medicine: ''
	},

	setKeyOFReception: (key: string, value: string) => {
		set((state) => ({reception: {...state.reception, [key]: value}}));
		console.log(get().reception);
	},

	setReception: (reception: Reception) => {
		set({ reception });
	},

	resetReception: () => {
		set({ reception: {
			patient_id: null,
			doctor_id: null,
			date: '',
			place: '',
			symptoms: '',
			disease: '',
			description: '',
			medicine: ''
		}});
	},

	getReception: () => {
		return get().reception;
	}
}));