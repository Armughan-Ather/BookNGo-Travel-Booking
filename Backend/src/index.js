import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'
import { setupDatabase } from './db/dbSetup.js';

dotenv.config({
    path: './env'
});

(async () => {
    let connection;

    // First, establish the connection
    try {
        connection = await connectDB();
        console.log('Database connection established.');
    } catch (error) {
        console.error('Failed to establish connection:', error);
        process.exit(1); // Exit if connection fails
    }

    // Then, setup the database schema
    try {
        await setupDatabase(connection);
        console.log('Database setup completed.');
    } catch (error) {
        console.error('Database setup failed:', error);
        process.exit(1); // Exit if database setup fails
    } finally {
        // Always close the connection after setup
        if (connection) {
            try {
                await connection.end();
                console.log('Connection closed.');
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
})();

// (async () => {
//     await setupDatabase();
// })();

// try {
//     connectDB();
// } catch (error) {
//     console.error("Connection Failed: ", error);
//     process.exit(1);
// }

app.on("error", (error) => {
    console.error("ERR: ", error);
    throw error;
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running at PORT: ${process.env.PORT}`);
});