import React, { useState } from "react";
import anytime from '../assets/anytime.webp';
import anytimehover from '../assets/anytimehover.webp';
import elderhover from '../assets/elder.svg';
import elder from '../assets/elderhover.png';
import ourstory from '../assets/ourstory.webp';
import group from '../assets/group.webp';
import record from "../assets/record.svg";
import recordhover from "../assets/record.svg";
import bookhover from '../assets/booknursehover.webp';
import book from '../assets/times.webp';
import "../styles/About.css";

/**
 * About component
 * This component renders the About page, including the mission, story, and features of Health Hub.
 */
const About = () => {
    const [bookHovered, setBookHovered] = useState(false);
    const [elderHovered, setElderHovered] = useState(false);
    const [support, setSupport] = useState(false);
    const [recordHovered, setRecordHovered] = useState(false);

    return (
        <>
            <div className="py-8 mb-5 w-[50vw] justify-start ml-auto mr-auto mt-10"></div>
            <div className="mb-16">
                <h1 className="text-center text-[6vw] lg:text-[4vw] font-semibold leading-[8vw] lg:leading-[6vw]">
                    Health Hub excels at helping <br /> you{" "}
                    <span className="text-blue-500">stay healthy</span>
                </h1>
                <div className="pt-12 sm:pt-28 m-auto flex justify-center flex-wrap gap-6 lg:gap-12 text-center px-[6vw] lg:px-28">
                    <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center">
                        <h5 className="font-semibold text-xl text-blue-500 sm:text-[2rem] lg:text-[3vw]">
                            Our Mission
                        </h5>
                        <p className="text-left w-full lg:w-[35vw] text-base lg:text-[1.4vw] lg:leading-[2vw]">
                            At Health Hub, our mission is to enhance the quality of life for the elderly by providing comprehensive healthcare solutions. We are dedicated to making healthcare accessible and convenient for seniors, ensuring they receive the best care possible.
                        </p>
                    </div>
                    <div>
                        <img src={group} width={400} height={400} alt="group" className="w-full lg:w-[35vw] rounded-xl" />
                    </div>
                </div>

                <div className="pt-16 sm:pt-28 m-auto px-[6vw]">
                    <div className="flex justify-center flex-wrap-reverse gap-6 sm:gap-8 lg:gap-14 text-center">
                        <div>
                            <img src={ourstory} width={400} height={400} className="w-full lg:w-[35vw] rounded-xl" alt="Our Story" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="font-semibold text-center text-xl pb-4 sm:pb-6 lg:pb-8 text-blue-500 sm:text-[2rem] lg:text-[3vw]">
                                Our Story
                            </h5>
                            <p className="text-left w-full lg:w-[35vw] text-base lg:text-[1.4vw] lg:leading-[2vw]">
                                This website was built by two students, Qin Tian and Xu Yi, using React and MongoDB. It aims to help the elderly lead healthy and fulfilling lives by providing innovative and excellent healthcare services tailored for seniors.
                            </p>
                        </div>
                    </div>
                </div>
                <div id='about-us' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h5 className="font-semibold text-center text-xl pb-2 lg:pb-6 text-blue-500 mt-24 sm:mt-32 sm:text-[2rem]">Our Features</h5>
                    <div className='about-us-block lg:px-16'>
                        <div className='about-us-community transition-background duration-300 ease-linear' onMouseOver={() => setRecordHovered(true)} onMouseLeave={() => setRecordHovered(false)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={recordHovered ? recordhover : record} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '3rem' }} />
                                <div className='about-us-blk-text'>Electronic Medical Records</div>
                            </div>
                            <p className='about-us-blk-para'>Manage your health information with ease using our Electronic Medical Records system. Access your medical history, prescriptions, and test results anytime, anywhere.</p>
                        </div>
                        <div className='about-us-product transition-background duration-300 ease-linear' onMouseOver={() => setBookHovered(true)} onMouseLeave={() => setBookHovered(false)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={bookHovered ? bookhover : book} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '3rem' }} />
                                <div className='about-us-blk-text'>Hospital Appointments</div>
                            </div>
                            <p className='about-us-blk-para'>Easily book hospital appointments with our user-friendly platform. Ensure timely medical consultations and follow-ups without the hassle of long waits.</p>
                        </div>
                    </div>
                    <div className='about-us-block lg:px-16'>
                        <div className='about-us-location transition-background duration-300 ease-linear' onMouseOver={() => setSupport(true)} onMouseLeave={() => setSupport(false)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={support ? anytimehover : anytime} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '3rem' }} />
                                <div className='about-us-blk-text'>NLP Chatbot</div>
                            </div>
                            <p className='about-us-blk-para'>Get instant assistance with our NLP-powered chatbot HealthMate. Whether you have questions about your health or need help navigating our services, our chatbot is here to help.</p>
                        </div>
                        <div className='about-us-event transition-background duration-300 ease-linear' onMouseOver={() => setElderHovered(true)} onMouseLeave={() => setElderHovered(false)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={elderHovered ? elderhover : elder} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '3rem' }} />
                                <div className='about-us-blk-text'>Elderly-Friendly Design</div>
                            </div>
                            <p className='about-us-blk-para'>Our platform is designed with the elderly in mind. Enjoy a powerful AI automation, simple navigation, and easy access to all our features.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;