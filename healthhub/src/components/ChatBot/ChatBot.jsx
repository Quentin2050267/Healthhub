import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Chat, { Bubble, useMessages } from '@chatui/core';
import { Card, CardTitle, CardText, CardActions, Button } from '@chatui/core';
import '@chatui/core/dist/index.css';
import '../../styles/chatui-theme.css';
import '../../styles/ChatBot.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const canRecord = typeof SpeechRecognition === 'function';

let recorder;
let timer;

const initialMessages = [
    {
        type: 'text',
        content: { text: 'Hello! How can I help you today?' },
        user: { avatar: './health-bot.svg' },
    },
];

const defaultQuickReplies = [
    {
        name: 'Hospitals',
    },
    {
        name: 'E-Record',
    },
    {
        name: 'Community',
    },
    {
        name: 'About',
    },
];

const port = process.env.REACT_APP_PORT;
const backendUrl = `http://localhost:${port}/bot-response`;

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

const GRAPHQL_ENDpoint = process.env.REACT_APP_GRAPHQL_ENDpoint || 'http://localhost:3001/graphql';

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_ENDpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.exception.errors) {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            }
            else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

/**
 * ChatBot component
 * This component renders a chatbot interface with various functionalities such as sending messages,
 * handling quick replies, and recording speech input.
 */
const ChatBot = () => {
    const [isChatBotVisible, setIsChatBotVisible] = useState(false);
    const { messages, appendMsg, setTyping } = useMessages(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const { user } = useAuth();
    const [actualHospitals, setActualHospitals] = useState([]);
    const navigate = useNavigate();

    /**
     * searchHospitalByDepart
     * Fetches hospitals by department from the GraphQL endpoint and sets the top 3 hospitals.
     * @param {string} department - The department to search for hospitals.
     */
    const searchHospitalByDepart = async (department) => {
        const query = `
              query ($department: String!) {
                hospitalsByDepartment(department: $department) {
                    _id
                    name
                    address_zh
                    address_en
                    phone
                    intro
                    departments_zh
                    departments_en
                    img_url
                }
              }
            `;
        const data = await graphQLFetch(query, { department });
        // Get the top 3 hospitals
        const topHospitals = data.hospitalsByDepartment.slice(0, 3);
        setActualHospitals(topHospitals);
        console.log('data:', topHospitals);
    };

    /**
     * handleSend
     * Handles sending messages and bot responses.
     * @param {string} type - The type of message being sent.
     * @param {string} val - The content of the message being sent.
     */
    function handleSend(type, val) {
        if (!user) {
            navigate('/login');
            return;
        }
        if (type === 'text' && val.trim()) {
            // your send message
            appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
            });

            // bot responding
            setTyping(true);

            if (val === 'Hospitals' || val === 'E-Record' || val === 'Community' || val === 'About') {
                switch (val) {
                    case 'Hospitals': {
                        appendMsg(
                            {
                                type: 'Hospitals',
                                content: { text: "You can find hundreds of hospitals in this page. I am sure you will find the one that suits you best. ;)" },
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                        break;
                    }
                    case 'E-Record': {
                        appendMsg(
                            {
                                type: 'E-Record',
                                content: { text: "You can find your electronic medical records here. It's very convenient to manage your health information." },
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                        break;
                    }
                    case 'Community': {
                        appendMsg(
                            {
                                type: 'Community',
                                content: { text: "Here's a community for you to share your health stories and experiences."},
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                        break;
                    }
                    case 'About': {
                        appendMsg(
                            {
                                type: 'About',
                                content: { text: "Here you can find information about our team, our mission, and our features. You can also contact us if you have any questions or suggestions." },
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                        break;
                    }
                }
                return;
            }

            // prompt
            const prompt = `User input: "${val}"
            You are an online virtual doctor. Please respond to the user and try to detect any potential diseases mentioned in the input. 
            You are only allowed to respond like a doctor would. If the user talks something that is not related to health, you should respond with a generic message.
            You are required to answer in English.
            If a disease is detected, determine which of the following departments it belongs to:
                1. 内科
                2. 外科
                3. 骨科
                4. 儿科
                5. 妇产科
                6. 眼科
                7. 耳鼻咽喉头颈科
                8. 皮肤性病科
                9. 精神科
                10. 牙科
                11. 男科
                12. 肿瘤科
                13. 中医科
                14. 麻醉科
                15. 疼痛科
                16. 营养科
            Return the response in the following JSON format:
            {
                "response": "{model's response in the language spoken by the user}",
                "disease": "{detected disease, if any, otherwise an empty string}",
                "department": "{corresponding department in Chinese, if any, otherwise an empty string}"
            }`;

            // bot message
            axios.post(backendUrl, { message: prompt }) // Use the complete backend URL
                .then(response => {
                    let botMessage = response.data.result;
                    botMessage = botMessage.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Remove non-printable characters
                    const parsedResult = JSON.parse(botMessage);
                    console.log('parsedResult:', parsedResult);
                    if (parsedResult.disease && parsedResult.department) {
                        console.log(`Detected disease: ${parsedResult.disease}, Department: ${parsedResult.department}`);
                        searchHospitalByDepart(parsedResult.department)
                        console.log('actualHospitals:', actualHospitals);
                        appendMsg(
                            {
                                type: 'card',
                                content: {
                                    text: `${parsedResult.response} 
                                Here are some hospitals recommended:` },
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                    } else {
                        console.log('No disease detected.');

                        appendMsg(
                            {
                                type: 'text',
                                content: { text: parsedResult.response },
                                user: { avatar: './health-bot.svg' },
                            },
                        );
                    }
                    setTyping(false);
                })
                .catch(error => {
                    console.error('Error getting bot response:', error);
                    setTyping(false);
                });

        }
    }

    /**
     * handleQuickReplyClick
     * Handles quick reply clicks by sending the corresponding message.
     * @param {object} item - The quick reply item that was clicked.
     */
    function handleQuickReplyClick(item) {
        handleSend('text', item.name);
    }

    /**
     * handleInputChange
     * Handles changes to the input field.
     * @param {string} val - The new value of the input field.
     */
    function handleInputChange(val) {
        setInputValue(val);
    }

    /**
     * renderMessageContent
     * Renders the content of a message based on its type.
     * @param {object} msg - The message object containing type and content.
     * @returns {JSX.Element|null} - The rendered message content.
     */
    function renderMessageContent(msg) {
        // console.log('renderMessageContent:', msg);
        const { type, content } = msg;

        // Render based on message type
        switch (type) {
            case 'text':
                return <Bubble content={content.text} />;
            case 'image':
                return (
                    <Bubble type="image">
                        <img src={content.picUrl} alt="" />
                    </Bubble>
                );
            case 'card':
                return (
                    <Card size="lg">
                        <CardTitle>Smart Recommendations</CardTitle>
                        <CardText>{content.text}</CardText>
                        <CardActions direction="column">
                            {actualHospitals.map((hospital) => (
                                <Button color="primary" size="sm">

                                    <Link
                                        key={hospital._id}
                                        to={`/hospital/${hospital._id}/`}
                                        state={{ hospitalProp: hospital }}
                                    >
                                        {hospital.name}
                                    </Link>

                                </Button>
                            ))}
                        </CardActions>
                    </Card>
                );
            case 'Hospitals':
                return (
                    <Card size="lg">
                        <CardTitle>Want to find a hospital?</CardTitle>
                        <CardText>{content.text}</CardText>
                        <CardActions direction="column">
                            <Button color="primary" size="sm">
                                <Link to="/hospitals">Find Hospitals</Link>
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 'E-Record':
                return (
                    <Card size="lg">
                        <CardTitle>Manage Your Health Information</CardTitle>
                        <CardText>{content.text}</CardText>
                        <CardActions direction="column">
                            <Button color="primary" size="sm">
                                <Link to="/records">View Records</Link>
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 'Community':
                return (
                    <Card size="lg">
                        <CardTitle>Healthhub Community</CardTitle>
                        <CardText>{content.text}</CardText>
                        <CardActions direction="column">
                            <Button color="primary" size="sm">
                                <Link to="/community">Join Us!</Link>
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 'About':
                return (
                    <Card size="lg">
                        <CardTitle>Learn More About Us</CardTitle>
                        <CardText>{content.text}</CardText>
                        <CardActions direction="column">
                            <Button color="primary" size="sm">
                                <Link to="/about">About Us</Link>
                            </Button>
                        </CardActions>
                    </Card>
                );
            default:
                return null;
        }

    }

    /**
     * makeRecorder
     * Creates a recorder object with methods to start, end, and cancel recording.
     * @param {object} ctx - The context object (not used in this implementation).
     * @returns {object} - The recorder object with methods.
     */
    function makeRecorder({ ctx }) {
        console.log('makeRecorder');
        return {
            canRecord,
            onStart() {
                // Start recording
                console.log('Start recording');
                recorder = new SpeechRecognition(); // Create a speech recognition object
                recorder.lang = 'en-US';
                setIsRecording(true); // Set active state when recording starts
                recorder.onresult = function (event) {
                    const { transcript } = event.results[0][0]; // Get the recognition result text
                    console.log('Recognition result:', transcript);
                    handleSend('text', transcript); // Send the recognition result
                    console.log('inputValue:', inputValue);
                };
                recorder.onend = this.onEnd;
                recorder.start();
                console.log('recorder-started');
                // End recording after 60 seconds
                timer = setTimeout(() => {
                    this.onEnd();

                }, 60000);
            },
            onEnd() {
                clearTimeout(timer);
                // End recording
                console.log('End recording');
                if (recorder) {
                    recorder.stop();
                    recorder = undefined;
                }
                setIsRecording(false); // Cancel active state when recording ends
            },
            onCancel() {
                // Cancel recording
                console.log('Cancel recording');
                if (recorder) {
                    recorder.abort();
                    recorder = undefined;
                }
                setIsRecording(false); // Cancel active state when recording ends
            },
        };
    }

    /**
     * handleMicClick
     * Handles the microphone button click to start or stop recording.
     */
    function handleMicClick() {
        const recorderInstance = makeRecorder({});

        if (isRecording) {
            recorderInstance.onCancel();
        } else {
            recorderInstance.onStart();
        }
    };

    return (
        <div>
            <button className="open-chatbot-button" onClick={() => setIsChatBotVisible(!isChatBotVisible)}>
                {isChatBotVisible ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faComment} />}
            </button>


            <CSSTransition
                in={isChatBotVisible}
                timeout={300}
                classNames="chatbot"
                unmountOnExit
            >
                <div className="chatbot-container">
                    <Chat
                        navbar={{ title: 'HealthMate' }}
                        loadMoreText='loading' // Load more text
                        messages={messages}
                        renderMessageContent={renderMessageContent}
                        onSend={handleSend}
                        locale="en-US"
                        placeholder="Type a message..."
                        quickReplies={defaultQuickReplies}
                        onQuickReplyClick={handleQuickReplyClick}
                        toolbar={[
                            {
                                type: 'speech',
                                icon: 'mic',
                                title: 'speech',
                            },
                        ]}
                        onToolbarClick={(item, ctx) => {
                            if (item.type === 'speech') {
                                handleMicClick();
                            }
                        }}
                        onInputChange={handleInputChange} // Update the value of the input box
                        text={inputValue}
                        wideBreakpoint='600px'
                    />
                </div>
            </CSSTransition>
        </div>
    );
};

export default ChatBot;