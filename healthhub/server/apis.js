const express = require('express');
const router = express.Router();
const botController = require('./controllers/botController');
const signupController = require('./controllers/signupController');
const {verifyEmail} = require('./controllers/verifyEmailController');
const {login,loginGoogle} = require('./controllers/loginController');
const AppointmentController = require('./controllers/appointmentController');

router.post('/bot-response', botController.getBotResponse);
router.post('/sign-up', signupController.signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/login-google', loginGoogle);
router.post('/appointment', AppointmentController.makeAppointment); 


module.exports = router;