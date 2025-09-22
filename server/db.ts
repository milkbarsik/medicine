import { Pool } from 'pg'
const pool = new Pool ({
	user: "postgres",
	password: "1212",
	host: "localhost",
	port: 5432,
	database: "medicine"
})

export default pool;