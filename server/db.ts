import { Pool } from 'pg'
const pool = new Pool ({
	user: "postgres",
	password: "barsik",
	host: "localhost",
	port: 5432,
	database: "medicine"
})

export default pool;