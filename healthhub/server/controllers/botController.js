const axios = require('axios');

/**
 * sendChatbotRequest function
 * Sends a request to the chatbot API with the provided content.
 * @param {string} content - The content to send to the chatbot.
 * @returns {object} - The response data from the chatbot API.
 */
async function sendChatbotRequest(content) {
  console.log('Sending chatbot request:', content);
  const options = {
    method: 'POST',
    url: 'https://custom-chatbot-api.p.rapidapi.com/chatbotapi',
    headers: {
      'x-rapidapi-key': '1b9952a563msh8bd3a28ce672f19p12d0eejsn426249607114',
      'x-rapidapi-host': 'custom-chatbot-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      bot_id: 'OEXJ8qFp5E5AwRwymfPts90vrHnmr8yZgNE171101852010w2S0bCtN3THp448W7kDSfyTf3OpW5TUVefz',
      messages: [
        {
          role: 'user',
          content: content
        }
      ],
      user_id: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      model: 'gpt 3.5'
    }
  };
  
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

/**
 * getBotResponse function
 * Handles the request to get a response from the chatbot.
 * @param {object} req - The request object containing the message.
 * @param {object} res - The response object to send the bot response.
 */
exports.getBotResponse = async (req, res) => {
  const { message } = req.body;
  try {
    const botResponse = await sendChatbotRequest(message);
    res.json(botResponse);
  } catch (error) {
    console.error('Error getting bot response:', error);
    res.status(500).json({ error: 'Failed to get bot response' });
  }
};