const { getDb } = require('../db'); // Import database connection module
const bcrypt = require('bcrypt');

/**
 * login function
 * Handles user login by verifying email and password.
 * @param {object} req - The request object containing email and password.
 * @param {object} res - The response object to send the result.
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = getDb(); // Get database instance

        const user = await db.collection('user').findOne({ email });
        if (!user) {
            return res.json({ error: 'User not found', flag: false });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.json({ message: 'Password is correct', flag: true, user: user });
        } else {
            return res.json({ error: 'Invalid password', flag: false });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.json({ error: 'Failed to login', flag: false });
    }
}

/**
 * loginGoogle function
 * Handles user login via Google by checking if the user exists and inserting a new user if not.
 * @param {object} req - The request object containing user details from Google.
 * @param {object} res - The response object to send the result.
 */
exports.loginGoogle = async (req, res) => {
    const { email, name, family_name, given_name } = req.body;
    try {
        const db = getDb(); // Get database instance

        const user_existed = await db.collection('user').findOne({ email });
        if (user_existed) {
            return res.json({ message: 'User already exists', flag: true, user: user_existed });
        }

        const user = await db.collection('user').insertOne({ email, name, family_name, given_name });
        if (!user) {
            return res.json({ error: 'User not found', flag: false });
        }
        return res.json({ message: 'User inserted successfully', flag: true, user: user });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.json({ error: 'Failed to login', flag: false });
    }
}