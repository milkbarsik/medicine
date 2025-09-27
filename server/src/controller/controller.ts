import { NextFunction, Request, Response } from "express";
import disease_service from "../services/disease_service/disease_service";
import { IgetDiseaseResponse, IgetMedicineResponse, IgetOneMedicineRequest, IgetOneMedicineResponse, IgetOnePatientRequest, IgetOnePatientResponse, IgetPatientsResponse, IgetSicksOfDateRequest, IgetSicksOFDateResponse, IgetSicksOfDiseaseRequest, IgetSicksOFDiseaseResponse, IloginResponse, IloginRquest, IpostDiseaseRequest, IpostDiseaseResponse, IpostMedicineRequest, IpostMedicineResponse, IpostPatientsRequest, IpostPatientsResponse, IpostReceptionRequest, IpostReceptionResponse, IRefreshResponse } from "./controllerTypes";
import medicine_service from "../services/medicine_service/medicine_service";
import sicks_service from "../services/sicks_service/sicks_service";
import { toMskDateYYYYMMDD } from "../helpers/formatDate";
import reseption_service from "../services/reception_service/reception_service";
import { userService } from "../services/auth_service/auth_service";
import patients_service from "../services/patient_service/patients_service";

class Controller {
	
	async getDisease (req: Request, res: IgetDiseaseResponse, next: NextFunction) {
		try {
			const disease = await disease_service.getDisease();
			return res.status(200).json(disease);
		} catch (e) {
			next(e);
		}
	};

	async getMedicines (req: Request, res: IgetMedicineResponse, next: NextFunction) {
		try {
			const medicine = await medicine_service.getMedicines();
			return res.status(200).json(medicine)
		} catch (e) {
			next(e);
		}
	};

	async getOneMedicine (req: IgetOneMedicineRequest, res: IgetOneMedicineResponse, next: NextFunction) {
		try {
			const {id} = req.params;
			const medicine = await medicine_service.getOneMedicine(id);
			return res.status(200).json(medicine);
		} catch (e) {
			next(e);
		}
	};

	async getSicksOfDate (req: IgetSicksOfDateRequest, res: IgetSicksOFDateResponse, next: NextFunction) {
		try {
			const {date} = req.params;
			const formatDate = toMskDateYYYYMMDD(date);
			const sicks = await sicks_service.getSicksOfDate(formatDate);
			return res.status(200).json(sicks);
		} catch (e) {
			next(e);
		}
	};

	async getSicksOfDisease (req: IgetSicksOfDiseaseRequest, res: IgetSicksOFDiseaseResponse, next: NextFunction) {
		try {
			const {id} = req.params;
			const sicks = await sicks_service.getSicksOfDisease(id);
			return res.status(200).json(sicks);
		} catch (e) {
			next(e);
		}
	};

	async getPatients (req: Request, res: IgetPatientsResponse, next: NextFunction) {
		try {
			const patients = await patients_service.getPatients();
			return res.status(200).json(patients)
		} catch (e) {
			next(e);
		}
	};

	async getOnePatient (req: IgetOnePatientRequest, res: IgetOnePatientResponse, next: NextFunction) {
		try {
			const {id} = req.params;
			const patient = await patients_service.getOnePatient(id);
			return res.status(200).json(patient);
		} catch (e) {
			next(e);
		}
	};

	async postMedicine (req: IpostMedicineRequest, res: IpostMedicineResponse, next: NextFunction) {
		try {
			const medicine = req.body;
			const newMedicine = await medicine_service.postMedicine(medicine);
			return res.status(200).json(newMedicine);
		} catch (e) {
			next(e);
		}
	};

	async postDisease (req: IpostDiseaseRequest, res: IpostDiseaseResponse, next: NextFunction) {
		try {
			const disease = req.body;
			const newDisease = await disease_service.postDisease(disease);
			return res.status(200).json(newDisease);
		} catch (e) {
			next(e);
		}
	};

	async postReseption (req: IpostReceptionRequest, res: IpostReceptionResponse, next: NextFunction) {
		try {
			const reception = req.body;
			const newReseption = await reseption_service.postReception({
				...reception,
				date: toMskDateYYYYMMDD(reception.date)
			});
			return res.status(200).json(newReseption);
		} catch (e) {
			next(e);
		}
	};

	async postPatient (req: IpostPatientsRequest, res: IpostPatientsResponse, next: NextFunction) {
		try {
			const patients = req.body;
			const newPatients = await patients_service.postPatient({
				...patients,
				birthday: toMskDateYYYYMMDD(patients.birthday)
			});
			return res.status(200).json(newPatients);
		} catch (e) {
			next(e);
		}
	};

	async login(req: IloginRquest, res: IloginResponse, next: NextFunction): Promise<void> {
		try {
			console.log(req.cookies)
			const {login, password} = req.body;
			const userData = await userService.login(login, password);
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
			res.status(200).json(userData);
		} catch (e) {
			next(e)
		}
	}

	async refresh (req: Request, res: IRefreshResponse, next: NextFunction): Promise<void> {
		try {
			console.log(req.cookies);
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
			res.status(200).json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logOut (req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			await userService.logOut(refreshToken);
			res.clearCookie('refreshToken');
			res.status(200).json('');
		} catch (e) {
			next(e);
		}
	}
}

export default new Controller();