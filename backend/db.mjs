import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL_POSTGRESQL;
const sql = postgres(connectionString);

export default sql;
