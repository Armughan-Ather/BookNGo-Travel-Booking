import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js'; // Sequelize instance

export const loginAdmin = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { userName, password } = req.body;

        // 1. Basic validations
        if (!userName || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // 2. Build the SQL query to find the admin by userName
        const query = `
            SELECT * FROM Admin WHERE userName = :userName
        `;

        // 3. Execute the raw SQL query
        const [admins] = await sequelize.query(query, {
            replacements: {
                userName: userName, // Exact match for username
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if admin exists
        if (admins.length > 0) {
            const admin = admins[0];

            // 5. Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password.' });
            }

            // 7. Return success response with admin data
            const loggedInAdmin = {
                id: admin.id,
                userName: admin.userName,
                name: admin.name,
                lastLogin: admin.lastLogin // Last login before update
            };

            // 6. Update the last login timestamp
            const updateQuery = `
                UPDATE Admin SET lastLogin = NOW() WHERE id = :id
            `;
            await sequelize.query(updateQuery, {
                replacements: { id: admin.id },
                type: sequelize.QueryTypes.UPDATE
            });

            return res.status(200).json(new ApiResponse(200, loggedInAdmin, 'Admin logged in successfully.'));
        } else {
            return res.status(401).json({ error: 'Invalid username.' });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Something went wrong while logging in the admin.' });
    }
};