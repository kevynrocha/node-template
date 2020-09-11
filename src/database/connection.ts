import { Sequelize } from 'sequelize';
import config from '@config/db';

const dbURL = String(process.env.DB_URL);
const connection = new Sequelize(dbURL, config.db);
export default connection;
