const nodemailer = require('nodemailer');
const { getDb } = require('../db'); // Import database connection module

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
    service: "QQ",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const port = process.env.REACT_APP_PORT;

/**
 * sendEmail function
 * Sends a verification email to the user.
 * @param {string} firstName - The first name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} code - The verification code to send.
 */
async function sendEmail(firstName, email, code) {
    console.log('Sending email to:', email);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Hello ${firstName},\n\nThis is your verification code: ${code}\n\nDo not share this code with anyone.\n\nBest,\nHealth Hub`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent:', mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    };
}

/**
 * signup function
 * Handles user signup by checking if the user exists, sending a verification email, and returning the verification code.
 * @param {object} req - The request object containing user details.
 * @param {object} res - The response object to send the result.
 */
exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const db = getDb(); // Get database instance

        // Check if user already exists
        const user = await db.collection('user').findOne({ email });
        if (user) {
            res.json({ 
                error: 'Email already exists',
                flag: false
            });
            return;
        }
        else{
            console.log('User does not exist');
        }
        const code = Math.floor(100000 + Math.random() * 900000);

        // Send verification email
        await sendEmail(firstName, email, code);

        res.json({ message: 'Signup successful', flag: true, code: code });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Failed to signup', flag: false });
    }
}