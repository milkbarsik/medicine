import db from '../../../db';
import ApiError from '../../exceptions/apiError';
import { IReceptionService, IReceptionOnPost, IReception } from './reception_types';

class ReceptionServece implements IReceptionService {

	async postReception (reception: IReceptionOnPost): Promise<IReception> {
		const disease = await db.query('select * from disease where id = $1', [reception.disease_id]);
		if (disease.rows[0] === undefined) {
			throw ApiError.NotFound('Disease not found');
		}
		const medicine = await db.query('select * from medicines where id = $1', [reception.medicine_id]);
		if (medicine.rows[0] === undefined) {
			throw ApiError.NotFound('Medicine not found');
		}
		const sql = `
    WITH ins_reception AS (
      INSERT INTO receptions (doctor_id, patient_id, patient_name, "date", place, symptoms, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    ), ins_rd AS (
      INSERT INTO reception_disease (reception_id, disease_id)
      SELECT id, $8 FROM ins_reception
      RETURNING reception_id
    ), ins_presc AS (
      INSERT INTO prescriptions (reception_id, medicine_id, description)
      SELECT id, $9, $10 FROM ins_reception
      RETURNING reception_id
    )
    SELECT id FROM ins_reception;
  `;

		const params = [
			reception.doctor_id,
			reception.patient_id,
			reception.patient_name,
			reception.date,
			reception.place,
			reception.symptoms ?? null,
			reception.description ?? null,
			reception.disease_id,
			reception.medicine_id,
			reception.prescription_description ?? null,
		];
		try {
			const newReception = await db.query(sql, params);
			return newReception.rows[0];
		} catch (e) {
			console.log(e);
			throw ApiError.BadRequest('Reception not created');
		}
	}
}

export default new ReceptionServece();