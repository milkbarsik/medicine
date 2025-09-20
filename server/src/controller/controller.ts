import { NextFunction, Request } from "express";
import disease_service from "../services/disease_service/disease_service";
import { IgetDiseaseResponse, IgetMedicineResponse, IgetOneMedicineRequest, IgetOneMedicineResponse, IgetSicksOfDateRequest, IgetSicksOFDateResponse, IgetSicksOfDiseaseRequest, IgetSicksOFDiseaseResponse, IpostDiseaseRequest, IpostDiseaseResponse, IpostMedicineRequest, IpostMedicineResponse } from "./controllerTypes";
import medicine_service from "../services/medicine_service/medicine_service";
import sicks_service from "../services/sicks_service/sicks_service";

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
			const sicks = await sicks_service.getSicksOfDate(date);
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

	async postReseption () {
		try {

		} catch (e) {

		}
	};
}

export default new Controller();