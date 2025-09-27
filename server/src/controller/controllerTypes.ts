import { Response, Request } from 'express';
import { Disease } from "../services/disease_service/disease_types";
import { Medicine } from "../services/medicine_service/medicine_types";
import { Sick } from "../services/sicks_service/sicks_types";
import { IReception, IReceptionOnPost } from '../services/reception_service/reception_types';
import { IUserDto } from '../dtos/userDto';
import { IUserReturn } from '../services/auth_service/auth_type';
import { Patient } from '../services/patient_service/patients_types';

export interface IgetDiseaseResponse extends Response<Disease[]> {};

export interface IgetMedicineResponse extends Response<Medicine[]>{};

export interface IgetOneMedicineRequest extends Request<{id: number}, {}, {}>{};
export interface IgetOneMedicineResponse extends Response<Medicine> {};

export interface IgetSicksOfDateRequest extends Request<{date: string}, {}, {}>{};
export interface IgetSicksOFDateResponse extends Response<Sick[]>{};

export interface IgetSicksOfDiseaseRequest extends Request<{id: number}, {}, {}>{};
export interface IgetSicksOFDiseaseResponse extends Response<Sick[]>{};

export interface IpostMedicineRequest extends Request<{}, {}, Medicine>{};
export interface IpostMedicineResponse extends Response<Medicine>{};

export interface IpostDiseaseRequest extends Request<{}, {}, Disease>{};
export interface IpostDiseaseResponse extends Response<Disease>{};

export interface IpostReceptionRequest extends Request<{}, {}, IReceptionOnPost>{};
export interface IpostReceptionResponse extends Response<IReception>{};

export interface IloginRquest extends Request<{}, {}, {login: string, password: string}>{};
export interface IloginResponse extends Response<IUserReturn>{};

export interface IRefreshResponse extends Response<IUserReturn>{};

export interface IpostPatientsRequest extends Request<{}, {}, Omit<Patient, 'id'>>{};
export interface IpostPatientsResponse extends Response<Patient>{};

export interface IgetOnePatientRequest extends Request<{id: number}, {}, {}>{};
export interface IgetOnePatientResponse extends Response<Patient> {};

export interface IgetPatientsResponse extends Response<Patient[]>{};