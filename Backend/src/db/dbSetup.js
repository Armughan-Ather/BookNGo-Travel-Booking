import mysql from 'mysql';
import { createTableAdmin } from "../models/admin.model.js";
import { createTableAirline } from "../models/airline.model.js";
import { createTableBundle } from "../models/bundle.model.js";
import { createTableFlight } from "../models/flight.model.js";
import { createTableFlightReservation } from "../models/flightReservation.model.js";
import { createTableHotel } from "../models/hotel.model.js";
import { createTableHotelReservation } from "../models/hotelReservation.model.js";
import { createTableUser } from "../models/user.model.js";

export const setupDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        console.log('Connected to MySQL');

        // Create database if it doesn't exist
        await connection.query('CREATE DATABASE IF NOT EXISTS BookNGo');
        console.log('Database created or already exists');

        // Use the database
        await connection.query('USE BookNGo');
        console.log('Using BookNGo database');

        // Queries to create tables
        const tableQueries = [
            createTableUser,
            createTableAdmin,
            createTableAirline,
            createTableHotel,
            createTableFlight,
            createTableFlightReservation,
            createTableHotelReservation,
            createTableBundle
        ];

        // Execute each table creation query
        for (const query of tableQueries) {
            await connection.query(query);
            console.log('Table created or already exists');
        }

        // Close the connection
        await connection.end();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Database setup failed:', err);
        throw err;
    }
};
