import db from '../../../db';
import ApiError from '../../exceptions/apiError';
import { IReceptionService, IReceptionOnPost, IReception } from './reception_types';

class ReceptionServece implements IReceptionService {

	async postReception (reception: IReceptionOnPost): Promise<IReception> {
		const disease = await db.query('select * from disease where id = $1', [reception.disease_id]);
		if (!disease) {
			throw ApiError.NotFound('No disease found');
		}
		const medicine = await db.query('select * from medicines where id = $1', [reception.medicine_id]);
		if (!medicine) {
			throw ApiError.NotFound('No medicine found');
		}
		const sql = `
    WITH ins_reception AS (
      INSERT INTO receptions (doctor_id, patient_id, "date", place, symptoms, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    ), ins_rd AS (
      INSERT INTO reception_disease (reception_id, disease_id)
      SELECT id, $7 FROM ins_reception
      RETURNING reception_id
    ), ins_presc AS (
      INSERT INTO prescriptions (reception_id, medicine_id, description)
      SELECT id, $8, $9 FROM ins_reception
      RETURNING reception_id
    )
    SELECT id FROM ins_reception;
  `;

  const params = [
    reception.doctor_id,
    reception.patient_id,
    reception.date,          // Date или ISO → timestamptz
    reception.place,
    reception.symptoms ?? null,
    reception.description ?? null,
    reception.disease_id,
    reception.medicine_id,
    reception.prescription_description ?? null, // если нет — передай null
  ];
		const newReception = await db.query(sql, params);
		if (!newReception) {
			throw ApiError.BadRequest('Reception not created');
		}
		console.log(newReception.rows);
		return newReception.rows[0];
	}
}

export default new ReceptionServece();