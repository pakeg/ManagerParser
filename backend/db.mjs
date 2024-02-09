import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL_POSTGRESQL;
const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  connect_timeout: 5,
});

export default sql;
