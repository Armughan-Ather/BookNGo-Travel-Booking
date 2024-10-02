import mysql from 'mysql';
import { DB_NAME } from '../constants.js';

const connectDB = () => {
    const connectionInstance = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: DB_NAME,
    });

    connectionInstance.connect((error) => {
        if (error) {
            console.error('Error connecting to MySQL: ', error);
            process.exit(1);
        } else {
            console.log(`\n MYSQL Connected || DB HOST: ${connectionInstance.config.host}`);
        }
    });
};

export default connectDB;