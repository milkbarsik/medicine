import { create } from 'zustand';
import { patientsService } from '../api/services';

export type Patient = {
  id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	gender: 'male' | 'female' | 'other';
	birthday: string;
	address: string;
};

export interface IPatientsState {
  patients: Patient[];
  updatePatients: () => Promise<Patient[] | undefined>;
  addPatients: (patients: Patient) => void;
  setPatients: (patients: Patient[]) => void;
  getPatients: () => Patient[];
  getOnePatient: (id: number) => Patient | undefined;
};

export const usePatientsStore = create<IPatientsState>((set, get) => ({
  patients: [],

  updatePatients: async () => {
    const patients = await patientsService.getPatients();;
    if (patients) {
      set({ patients });
    }
    return patients;
  },

  addPatients: (patients: Patient) => {
    set((state) => ({...state, patients: [...state.patients, patients]}));
  },

  setPatients: (patients: Patient[]) => {
    set({ patients });
  },

  getPatients: () => {
    return get().patients;
  },

  getOnePatient: (id: number) => {
    return get().patients.find(patients => patients.id === id);
  }

}));