import { Sequelize } from 'sequelize';
import config from '../config/db';

const db_url = String(process.env.DB_URL);
const connection = new Sequelize(db_url, config.db);

export default connection;
