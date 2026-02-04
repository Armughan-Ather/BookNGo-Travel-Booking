import mysql from 'mysql2';
import { DB_NAME } from '../constants.js';

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectTimeout: 60000
});

export default connection;










// import mysql from 'mysql';
// import { DB_NAME } from '../constants.js';

// const db = mysql.createConnection({
//     host: process.env.MYSQL_HOST || 'localhost',
//     user: process.env.MYSQL_USER || 'root',
//     password: process.env.MYSQL_PASSWORD || '',
//     database: DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('MySQL connection FAILED:', err);
//         process.exit(1); // Exit the process on failure
//     }
//     console.log(`\nMySQL connected! DB HOST: ${db.config.host}`);
// });
// export default db;