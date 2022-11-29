import axios from 'axios';

const sendMessage = async (phone, message) => {
  return await axios.post(
    'https://app.touchsms.com.au/api/v2/sms',
    { messages: [{ to: `61${phone}`, from: 'Vantastic', body: `${message}` }] },
    {
      auth: {
        username: import.meta.env.VITE_ACCESS_TOKEN,
        password: import.meta.env.VITE_TOKEN_ID,
      },
    },
  );
};

export default sendMessage;
