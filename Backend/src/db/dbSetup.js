import mysql from 'mysql2';
import { createTableAdmin } from "../models/admin.model.js";
import { createTableAirline } from "../models/airline.model.js";
import { createTableFlight } from "../models/flight.model.js";
import { createTableFlightReservation } from "../models/flightReservation.model.js";
import { createTableCancelledFlightReservation } from "../models/cancelledFlightReservation.model.js";
import { createTableBundle } from "../models/bundle.model.js";
import { createTableBundleReservation } from "../models/bundleReservation.model.js";
import { createTableCancelledBundleReservation } from "../models/cancelledBundleReservation.model.js";
import { createTableCancelledHotelReservation } from "../models/cancelledHotelReservation.model.js";
import { createTableHotel } from "../models/hotel.model.js";
import { createTableHotelReservation } from "../models/hotelReservation.model.js";
import { createTableUser } from "../models/user.model.js";

export const setupDatabase = async () => {
    return new Promise((resolve, reject) => {
        try {
            // First connect without specifying database to create it
            const connection = mysql.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                port: process.env.MYSQL_PORT || 3306,
                user: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASSWORD || '',
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
            });
            
            console.log('Connected to MySQL');

            // Create database if it doesn't exist (for Aiven, use the provided database)
            if (process.env.NODE_ENV !== 'production') {
                connection.query('CREATE DATABASE IF NOT EXISTS BookNGo', (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        return reject(err);
                    }
                    console.log('Database created or already exists');
                    connection.query('USE BookNGo', (err) => {
                        if (err) {
                            console.error('Error using database:', err);
                            return reject(err);
                        }
                        createTables(connection, resolve, reject);
                    });
                });
            } else {
                // For production (Aiven), use the provided database
                connection.query(`USE ${process.env.MYSQL_DATABASE || 'defaultdb'}`, (err) => {
                    if (err) {
                        console.error('Error using database:', err);
                        return reject(err);
                    }
                    console.log('Using database');
                    createTables(connection, resolve, reject);
                });
            }
        } catch (err) {
            console.error('Database setup failed:', err);
            reject(err);
        }
    });
};

function createTables(connection, resolve, reject) {
    // Queries to create tables
    const tableQueries = [
        createTableUser,
        createTableAdmin,
        createTableAirline,
        createTableHotel,
        createTableFlight,
        createTableFlightReservation,
        createTableHotelReservation,
        createTableCancelledFlightReservation,
        createTableCancelledHotelReservation,
        createTableBundle,
        createTableBundleReservation,
        createTableCancelledBundleReservation
    ];

    let completed = 0;
    const total = tableQueries.length;

    // Execute each table creation query
    tableQueries.forEach((query) => {
        connection.query(query, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                return reject(err);
            }
            console.log('Table created or already exists');
            completed++;
            
            if (completed === total) {
                // Close the connection
                connection.end((err) => {
                    if (err) {
                        console.error('Error closing connection:', err);
                        return reject(err);
                    }
                    console.log('Connection closed.');
                    resolve();
                });
            }
        });
    });
}
