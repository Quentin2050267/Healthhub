import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaMapMarkerAlt, FaPhone, FaHospital } from 'react-icons/fa';
import '../styles/HospitalDetail.css';
import axios from 'axios';

import { TUICallKit, TUICallKitServer, TUICallType } from "@tencentcloud/call-uikit-react";
import * as GenerateTestUserSig from "./utils/GenerateTestUserSig-es";

const SDKAppID = parseInt(process.env.REACT_APP_CALL_SDKAPPID);
const SDKSecretKey = process.env.REACT_APP_CALL_SDKSECRETKEY;

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
];

/**
 * HospitalDetail component
 * This component renders the detailed view of a single hospital, including a Google Map with a marker.
 */
const HospitalDetail = () => {
    const location = useLocation();
    const [hospital] = useState(location.state.hospitalProp);
    const appointmentRef = useRef(null);
    const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center read
    const [markerPosition, setMarkerPosition] = useState(null); // Used to store the marker position
    const port = process.env.REACT_APP_PORT;
    const backendUrl = `http://localhost:${port}/appointment`;

    const [callerUserID, setCallerUserID] = useState('');
    const [calleeUserID, setCalleeUserID] = useState('');
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeslot: '',
        hospital: hospital.name,
        department: '',
    });

    const [emailError, setEmailError] = useState('');

    /**
     * handleButtonClick
     * Opens the call modal.
     */
    const handleButtonClick = () => {
        setIsCallModalOpen(true);
    };

    /**
     * init
     * Initializes the TUICallKit with the caller's user ID and user signature.
     */
    const init = async () => {
        const { userSig } = GenerateTestUserSig.genTestUserSig({
            userID: callerUserID,
            SDKAppID,
            SecretKey: SDKSecretKey,
        });
        await TUICallKitServer.init({
            userID: callerUserID,
            userSig,
            SDKAppID,
        });

        alert('TUICallKit init succeed');
    };

    /**
     * call
     * Initiates a video call to the callee's user ID.
     */
    const call = async () => {
        await TUICallKitServer.call({
            userID: calleeUserID,
            type: TUICallType.VIDEO_CALL,
        });
    };

    /**
     * handleCloseModal
     * Closes the call modal.
     */
    const handleCloseModal = () => {
        setIsCallModalOpen(false);
    };

    useEffect(() => {
        if (hospital) {
            const fetchCoordinates = async () => {
                try {
                    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            address: hospital.address ? hospital.address : hospital.name,
                            key: 'AIzaSyAImeAC4soC7RMlC1qSZe736w2u5GaaiTc',
                        },
                    });
                    const { results } = response.data;
                    if (results.length > 0) {
                        const { lat, lng } = results[0].geometry.location;
                        setCenter({ lat, lng });
                        setMarkerPosition({ lat, lng }); // Set marker position
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                }
            };

            fetchCoordinates();
        }
    }, [hospital]);

    /**
     * handleInputChange
     * Handles changes to the input fields in the appointment form.
     * @param {object} e - The event object.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'email') {
            validateEmail(value);
        }
    };

    /**
     * validateEmail
     * Validates the email format.
     * @param {string} email - The email to validate.
     */
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    /**
     * handleAppointmentSubmit
     * Handles the submission of the appointment form.
     * @param {object} e - The event object.
     */
    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            alert('Please correct the errors before submitting.');
            return;
        }
        try {
            const response = await axios.post(backendUrl, formData);
            if (response.status === 200) {
                alert('Appointment booked successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    department: '',
                    date: '',
                    timeslot: '',
                });
            } else {
                alert('Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('An error occurred while booking the appointment. Please try again.');
        }
    };

    /**
     * getTodayDate
     * Returns today's date in YYYY-MM-DD format.
     * @returns {string} - Today's date in YYYY-MM-DD format.
     */
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    /**
     * handleAppointmentClick
     * Scrolls to the appointment section smoothly.
     */
    const handleAppointmentClick = () => {
        appointmentRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="hospital-detail">
            <div className="hospital-header">
                <h1>{hospital.name}</h1>
                <button className="appointment-button" onClick={handleAppointmentClick}>Book Appointment</button>
            </div>

            <div className="hospital-content">
                <div className="hospital-info-section">
                    <p><div className='icon'><FaMapMarkerAlt /></div><strong>Address:</strong> {hospital.address}</p>
                    <p><div className='icon'><FaPhone /></div><strong>Phone:</strong> {hospital.phone}</p>
                    <p><div className='icon'><FaHospital /></div><strong>Departments:</strong> {hospital.departments_en.join(', ')}</p>
                </div>
                <div className="hospital-description">
                    <img src={hospital.img_url} alt={hospital.name} className="hospital-image" />
                    <p>{hospital.intro}</p>
                </div>
                <div className="hospital-map">
                    <LoadScript googleMapsApiKey="AIzaSyAImeAC4soC7RMlC1qSZe736w2u5GaaiTc" language='en'>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={15}
                            mapTypeId="hybrid"
                        >
                            {markerPosition && <Marker position={markerPosition} />}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div ref={appointmentRef} className="appointment-section">
                    <h2>Appointment</h2>
                    <form className="appointment-form" onSubmit={handleAppointmentSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='Enter your name'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Enter your email'
                            />
                            {emailError && <span className="error">{emailError}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='Enter your phone number'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select
                                id="department"
                                name="department"
                                required
                                value={formData.department}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a department</option>
                                {hospital.departments_en.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Appointment Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleInputChange}
                                min={getTodayDate()}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeslot">Appointment Time Slot:</label>
                            <select
                                id="timeslot"
                                name="timeslot"
                                required
                                value={formData.timeslot}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a time slot</option>
                                {timeSlots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="submit-button">Submit Appointment</button>
                            <button type="button" className="online-button" onClick={handleButtonClick}>Online Consultation</button>
                        </div>
                    </form>

                    {isCallModalOpen && (
                        <div className="call-modal">
                            <div className="call-modal-content">
                                <div>
                                    <span>Caller’s ID:</span>
                                    <input
                                        type="text"
                                        placeholder="Enter caller UserID"
                                        onChange={(event) => setCallerUserID(event.target.value)}
                                    />
                                    <button onClick={init} className='blue-button-1'>Initialize</button>
                                    <hr />
                                </div>
                                <div>
                                    <span>Callee’s ID:</span>
                                    <input
                                        type="text"
                                        placeholder="Enter callee UserID"
                                        onChange={(event) => setCalleeUserID(event.target.value)}
                                    />
                                    <button onClick={call} className='blue-button-1'>Start Call</button>
                                    <hr />
                                </div>
                                <button className="close-button" onClick={handleCloseModal}>Close</button>
                            </div>
                            <TUICallKit />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HospitalDetail;