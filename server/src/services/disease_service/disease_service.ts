import db from '../../../db';
import { Disease, IDiseaseService } from './disease_types';

class DiseaseService implements IDiseaseService {

	async getDisease() {
		try {
			const disease = await db.query('select * from disease');
			return disease.rows;
		} catch (e) {
			throw new Error('no Disease')
		}
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