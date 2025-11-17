const { getDb } = require('../db'); // Import database connection module
const bcrypt = require('bcrypt');

/**
 * verifyEmail function
 * Verifies the email by checking the verification code and inserts a new user if the code is correct.
 * @param {object} req - The request object containing the verification code and user data.
 * @param {object} res - The response object to send the result.
 */
exports.verifyEmail = async (req, res) => {
    const { trueCode, code, formData } = req.body;
    const db = getDb();

    try {
        // Check if the verification code matches
        if (parseInt(trueCode) !== parseInt(code)) {
            return res.json({ error: 'Invalid verification code', flag: false });
        }

        formData.given_name = formData.firstName;
        delete formData.confirmPassword;
        // Encrypt the password
        formData.password = await bcrypt.hash(formData.password, 10);

        // Insert the new user
        const user = await db.collection('user').insertOne(formData);
        console.log('Inserted user:', user);

        if (user) {
            return res.json({ message: 'User inserted successfully', flag: true });
        } else {
            return res.status(500).json({ error: 'Failed to insert user', flag: false });
        }
    } catch (error) {
        console.error('Error verifying code or inserting user:', error);
        return res.status(500).json({ error: 'Failed to verify code or insert user', flag: false });
    }
};