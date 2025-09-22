import db from '../../../db';
import { Disease, IDiseaseService } from './disease_types';

class DiseaseService implements IDiseaseService {

	async getDisease() {
		const disease = await db.query('select * from disease');
		if (disease.rows[0] === undefined) {
			throw new Error('No disease found');
		}
		return disease.rows;
	};

	async postDisease(disease: Disease) {
		try {
			const newDisease = await db.query(
				'insert into disease (title) values ($1) returning *',
				[disease.title]
			);
			return newDisease.rows[0];
		} catch (e) {
			throw new Error('Disease not created');
		}
	};
}

export default new DiseaseService();