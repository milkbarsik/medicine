import { Response, Request } from 'express';
import { Disease } from "../services/disease_service/disease_types";
import { Medicine } from "../services/medicine_service/medicine_types";
import { Sick } from "../services/sicks_service/sicks_types";

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

