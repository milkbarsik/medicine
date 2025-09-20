import db from '../../../db';
import { ISicksService } from './sicks_types';

class SicksService implements ISicksService {

	async getSicksOfDisease(disease_id: number) {
		const sicks = await db.query('SELECT DISTINCT p.id, p.last_name, p.first_name, p.middle_name, p.gender, p.birthday, p.address FROM patients p JOIN receptions r ON r.patient_id = p.id JOIN reception_disease rd ON rd.reception_id = r.id WHERE rd.disease_id = $1 ORDER BY p.last_name, p.first_name, p.middle_name;', [disease_id]);
		if (!sicks) {
			throw new Error('No sicks found');
		}
		console.log(sicks.rows);
		return sicks.rows;
	}

	async getSicksOfDate(date: string) {
		const sicks = await db.query(`SELECT DISTINCT p.id, p.last_name, p.first_name, p.middle_name, p.gender, p.birthday, p.address FROM receptions r JOIN patients p ON p.id = r.patient_id WHERE r."date" >= $1::date AND r."date" < ($1::date + INTERVAL '1 day') ORDER BY p.last_name, p.first_name, p.middle_name;`, [date]);
		if (!sicks) {
			throw new Error('No sicks found');
		}
		console.log(sicks.rows);
		return sicks.rows;
	}
}

export default new SicksService();