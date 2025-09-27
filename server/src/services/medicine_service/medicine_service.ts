import { IMedicineService, Medicine } from "./medicine_types";
import db from '../../../db';
import { DatabaseError } from "pg";
import ApiError from "../../exceptions/apiError";

class MedicineService implements IMedicineService {

	async getMedicines() {
		try {
			const medicines = await db.query('select * from medicines');
			return medicines.rows;
		} catch (e) {
			throw new Error('Medicines no found');
		}
	};

	async getOneMedicine(id: number) {
		try {
			const medicine = await db.query('select * from medicines where id = $1', [id]);
			if (medicine.rows[0] === undefined) {
				throw ApiError.NotFound('No medicine found')
			}
			return medicine.rows[0];
		} catch (e) {
			throw new Error('Medicine not found');
		}
	};

	async postMedicine(medicine: Medicine) {
		try {
			const newMedicine = await db.query(
				'insert into medicines (title, indications_of_use, side_effects, method_of_use) values ($1, $2, $3, $4) returning *',
				[medicine.title, medicine.indications_of_use, medicine.side_effects, medicine.method_of_use]
			);
			return newMedicine.rows[0];
		} catch (e) {
			throw new Error('Medicine not created');
		}
	};
}

export default new MedicineService();