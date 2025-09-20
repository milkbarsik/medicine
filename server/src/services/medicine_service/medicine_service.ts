import { IMedicineService, Medicine } from "./medicine_types";
import db from '../../../db';

class MedicineService implements IMedicineService {

	async getMedicines() {
		const medicines = await db.query('select * from medicines');
		if (!medicines) {
			throw new Error('No medicines found');
		}
		console.log(medicines.rows);
		return medicines.rows;
	};

	async getOneMedicine(id: number) {
		const medicine = await db.query('select * from medicines where id = $1', [id]);
		if (!medicine) {
			throw new Error('No medicine found');
		}
		console.log(medicine.rows);
		return medicine.rows[0];
	};

	async postMedicine(medicine: Medicine) {
		const newMedicine = await db.query(
			'insert into medicines (title, indications_of_use, side_effects, method_of_use) values ($1, $2, $3, $4) returning *',
			[medicine.title, medicine.indications_of_use, medicine.side_effects, medicine.method_of_use]
		);
		if (!newMedicine) {
			throw new Error('Medicine not created');
		}
		console.log(newMedicine.rows);
		return newMedicine.rows[0];
	};
}

export default new MedicineService();