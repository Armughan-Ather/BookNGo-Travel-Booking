import { Sequelize } from 'sequelize';
import { DB_NAME } from '../constants.js';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || DB_NAME, 
    process.env.MYSQL_USER || 'root', 
    process.env.MYSQL_PASSWORD || '', 
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        dialect: 'mysql',
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                rejectUnauthorized: false
            }
        } : {},
        logging: false // Disable SQL logging for cleaner output
    }
);

export default sequelize;