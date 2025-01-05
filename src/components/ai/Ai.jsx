// import React, { useState } from 'react';
// import '../ai/Ai.css';
// import Close from '../../images/delete.png';
// import send from '../../images/send-message.png'
// import axios from 'axios';

// const Ai = ({ setShowAi }) => {
//     const closeModal = () => {
//         setShowAi(false); 
//     };

//     const [messages, setMessages] = useState([
//         {
//             sender: "AI",
//             message: "Hello! How can I assist you today?",
//         },
//     ]);

//     const [userInput, setUserInput] = useState('');

//     const handleSend = async () => {
//         if (userInput.trim() === '') return;

//         const newMessages = [...messages, { sender: 'user', message: userInput }];
//         setMessages(newMessages);
//         setUserInput(''); 

//         try {
//             const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//             if (!apiKey) {
//                 console.error('API key is not set.');
//                 return;
//             }


//             const response = await axios.post(
//                 'https://api.openai.com/v1/chat/completions',
//                 {
//                     model: 'gpt-3.5-turbo', 
//                     messages: [{ role: 'user', content: userInput }],
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, 
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             const aiMessage = response.data.choices[0].message.content;

//             setMessages([...newMessages, { sender: 'AI', message: aiMessage }]);
//         } catch (error) {
//             console.error('Error with OpenAI API:', error.response || error.message);
//             setMessages([
//                 ...newMessages,
//                 { sender: 'AI', message: 'Sorry, something went wrong.' },
//             ]);
//         }
//     };

//     return (
//         <>
//             <div className="modal-overlay" onClick={closeModal}></div>
//             <div className="Ai-div">
//                 <p>AI Assistant is ready!</p>
//                 <button className="close-btn" onClick={closeModal}>
//                     <img src={Close} alt="close" />
//                 </button>

//                 <div className="chat-box">
//                     {messages.map((msg, i) => (
//                         <div key={i} className={msg.sender === 'AI' ? 'ai-message' : 'user-message'}>
//                             <strong>{msg.sender}:</strong> {msg.message}
//                         </div>
//                     ))}
//                 </div>

//                 <input
//                     type="text"
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                     placeholder="Ask Me Here"
//                 />
//                 <button onClick={handleSend} className='send-btn'><img src={send} alt="" /></button>
//             </div>
//         </>
//     );
// };

// export default Ai;


import React, { useState } from 'react';
import '../ai/Ai.css';
import Close from '../../images/delete.png';
import send from '../../images/send-message.png';
import axios from 'axios';

const Ai = ({ setShowAi }) => {
    const [messages, setMessages] = useState([
        {
            sender: "AI",
            message: "Hello! How can I assist you today?",
        },
    ]);

    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        setShowAi(false);
    };

    const handleSend = async () => {
        if (userInput.trim() === '') return;

        const newMessages = [...messages, { sender: 'User', message: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setLoading(true);

        try {
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

            if (!apiKey) {
                throw new Error('API key is not set. Please check your environment variables.');
            }

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: userInput }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const aiMessage = response.data.choices[0].message.content;

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'AI', message: aiMessage },
            ]);
        } catch (error) {
            console.error('Error with OpenAI API:', error.response || error.message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'AI', message: 'Sorry, something went wrong.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}></div>
            <div className="Ai-div">
                <p>AI Assistant is ready!</p>
                <button className="close-btn" onClick={closeModal}>
                    <img src={Close} alt="close" />
                </button>

                <div className="chat-box">
                    {messages.map((msg, i) => (
                        <div key={i} className={msg.sender === 'AI' ? 'ai-message' : 'user-message'}>
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                    {loading && <div className="loading-indicator">AI is typing...</div>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask me here..."
                        disabled={loading}
                    />
                    <button onClick={handleSend} className="send-btn" disabled={loading}>
                        <img src={send} alt="Send" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Ai;
