import db from '../../../db';
import { Disease, IDiseaseService } from './disease_types';

class DiseaseService implements IDiseaseService {

	async getDisease() {
		const disease = await db.query('select * from disease');
		if (!disease) {
			throw new Error('No disease found');
		}
		console.log(disease.rows);
		return disease.rows;
	};

	async postDisease(disease: Disease) {
		const newDisease = await db.query(
			'insert into diseases (title) values ($1) returning *',
			[disease.title]
		);
		if (!newDisease) {
			throw new Error('Disease not created');
		}
		console.log(newDisease.rows);
		return newDisease.rows[0];
	};
}

export default new DiseaseService();