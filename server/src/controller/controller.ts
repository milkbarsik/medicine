import { NextFunction } from "express";
import disease_service from "../services/disease_service/disease_service";

class Controller {
	
	async getDisease (req, res, next: NextFunction) {
		try {
			const disease = await disease_service.getDisease();
			return res.status(200).json(disease);
		} catch (e) {
			next(e);
		}
	};

	async getMedicines () {
		try {

		} catch (e) {

		}
	};

	async getOneMedicine () {
		try {

		} catch (e) {

		}
	};

	async getSicksOfDate () {
		try {

		} catch (e) {

		}
	};

	async getSicksOfDisease () {
		try {

		} catch (e) {

		}
	};

	async postMedicine () {
		try {

		} catch (e) {

		}
	};

	async postDisease () {
		try {

		} catch (e) {

		}
	};

	async postReseption () {
		try {

		} catch (e) {

		}
	};
}

export default new Controller();