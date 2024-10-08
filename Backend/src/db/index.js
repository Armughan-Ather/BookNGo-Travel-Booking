import mysql from 'mysql';
import { DB_NAME } from '../constants.js';

// const connectDB = () => {
//     const connectionInstance = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: DB_NAME,
//     });

//     connectionInstance.connect((error) => {
//         if (error) {
//             console.error('Error connecting to MySQL: ', error);
//             process.exit(1);
//         } else {
//             console.log(`\n MYSQL Connected || DB HOST: ${connectionInstance.config.host}`);
//         }
//     });
// };

const connectDB = async () => {
    try {
        const connectionInstance = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: DB_NAME,
        });

        console.log(`\n MySQL connected !! DB HOST: ${connectionInstance.config.host}`);
        return connectionInstance; // Return connection to use in queries later if needed

    } catch (error) {
        console.log("MySQL connection FAILED", error);
        process.exit(1); // Exit the process on failure
    }
};

export default connectDB;