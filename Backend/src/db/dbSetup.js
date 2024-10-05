import mysql from 'mysql';
import { createTableAdmin } from "../models/admin.model.js";
import { createTableAirline } from "../models/airline.model.js";
import { createTableBundle } from "../models/bundle.model.js";
import { createTableFlight } from "../models/flight.model.js";
import { createTableFlightReservation } from "../models/flightReservation.model.js";
import { createTableHotel } from "../models/hotel.model.js";
import { createTableHotelReservation } from "../models/hotelReservation.model.js";
import { createTableUser } from "../models/user.model.js";

export const setupDatabase = async (connection) => {
    try {
        // Create the database if it doesn't exist
        await connection.query('CREATE DATABASE IF NOT EXISTS BookNGo');
        console.log('Database created or already exists');

        // Switch to the created database
        await connection.query('USE BookNGo');
        console.log('Using BookNGo database');

        // Array of table creation queries
        const tableQueries = [
            createTableAdmin,
            createTableAirline,
            createTableBundle,
            createTableFlight,
            createTableFlightReservation,
            createTableHotel,
            createTableHotelReservation,
            createTableUser
        ];

        // Loop through the queries and execute them sequentially
        for (const query of tableQueries) {
            try {
                await connection.query(query);
                console.log('Table created or already exists');
            } catch (err) {
                console.error('Error creating table:', err);
                throw err;  // Stop execution if a table creation fails
            }
        }

    } catch (error) {
        console.error('Database setup failed:', error);
        throw error; // Throw the error so it can be handled by the caller
    }
};














// export const setupDatabase = async () => {
//     let connection;

//     try {
//         // Create MySQL connection
//         connection = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: ''
//         });

//         console.log('Connected to MySQL');

//         // Create the database if it doesn't exist
//         await connection.query('CREATE DATABASE IF NOT EXISTS BookNGo');
//         console.log('Database created or already exists');

//         // Switch to the created database
//         await connection.query('USE BookNGo');
//         console.log('Using BookNGo database');

//         // Array of table creation queries
//         const tableQueries = [
//             createTableAdmin,
//             createTableAirline,
//             createTableBundle,
//             createTableFlight,
//             createTableFlightReservation,
//             createTableHotel,
//             createTableHotelReservation,
//             createTableUser
//         ];

//         // Loop through the queries and execute them sequentially
//         for (const query of tableQueries) {
//             try {
//                 await connection.query(query);
//                 console.log('Table created or already exists');
//             } catch (err) {
//                 console.error('Error creating table:', err);
//                 throw err;  // Stop execution if a table creation fails
//             }
//         }

//     } catch (error) {
//         console.error('Database setup failed:', error);
//         process.exit(1);
//     } finally {
//         // Close the connection
//         if (connection) {
//             try {
//                 await connection.end();
//                 console.log('Connection closed.');
//             } catch (err) {
//                 console.error('Error closing connection:', err);
//             }
//         }
//     }
// };






// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
// });

// export const setupDatabase = () => {
//     connection.connect(err => {
//         if (err) {
//             console.error('Error connecting to MySQL:', err);
//             return;
//         }
//         console.log('Connected to MySQL');

//         connection.query('CREATE DATABASE IF NOT EXISTS BookNGo', (err, result) => {
//             if (err) {
//                 console.error('Error creating database:', err);
//                 return;
//             }
//             console.log('Database created or already exists');

//             connection.query('USE BookNGo', (err) => {
//                 if (err) {
//                     console.error('Error using database:', err);
//                     return;
//                 }

//                 const tableQueries = [
//                     createTableAdmin,
//                     createTableAirline,
//                     createTableBundle,
//                     createTableFlight,
//                     createTableFlightReservation,
//                     createTableHotel,
//                     createTableHotelReservation,
//                     createTableUser
//                 ];

//                 let tableIndex = 0;

//                 function createNextTable() {
//                     if (tableIndex < tableQueries.length) {
//                         const query = tableQueries[tableIndex];
//                         connection.query(query, (err, result) => {
//                             if (err) {
//                                 console.error(`Error creating table:`, err);
//                                 return;
//                             }
//                             console.log(`Table created or already exists`);

//                             tableIndex++;
//                             createNextTable();
//                         });
//                     } else {
//                         connection.end(err => {
//                             if (err) {
//                                 console.error('Error closing connection:', err);
//                             } else {
//                                 console.log('Connection closed.');
//                             }
//                         });
//                     }
//                 }
//                 createNextTable();
//             });
//         });
//     });
// };