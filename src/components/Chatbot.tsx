import { useState, useRef, useEffect } from 'react';
import { CHATBOT_CONFIG, getGeminiApiUrl, isApiKeyConfigured } from '../config/chatbot';
import './Chatbot.css';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: CHATBOT_CONFIG.WELCOME_MESSAGE,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (sender: 'user' | 'bot', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getGeminiReply = async (userMessage: string): Promise<string> => {
    if (!isApiKeyConfigured()) {
      return 'Please configure your Gemini API key in src/config/chatbot.ts to enable the chatbot functionality.';
    }

    const prompt = `You are a compassionate, supportive AI assistant for a therapy services website called "Healing Hearts". 
    Your role is to provide helpful, empathetic responses to people who may be seeking therapy or mental health support.
    
    Guidelines:
    - Be warm, understanding, and non-judgmental
    - Provide general information about therapy and mental health
    - Encourage professional help when appropriate
    - Never give medical advice or diagnose
    - Direct people to seek professional help for serious concerns
    - Keep responses conversational and supportive
    - Mention that you're an AI assistant, not a replacement for professional therapy
    - Keep responses concise but helpful (2-4 sentences)
    
    User message: ${userMessage}`;

    const body = {
      contents: [{ 
        role: 'user', 
        parts: [{ text: prompt }] 
      }]
    };

    try {
      const response = await fetch(getGeminiApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 
             CHATBOT_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return CHATBOT_CONFIG.ERROR_MESSAGES.API_ERROR;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    if (userMessage.length > CHATBOT_CONFIG.MAX_MESSAGE_LENGTH) {
      addMessage('bot', 'Your message is too long. Please keep it under 500 characters.');
      return;
    }

    setInputValue('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      const reply = await getGeminiReply(userMessage);
      addMessage('bot', reply);
    } catch (error) {
      addMessage('bot', CHATBOT_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="chatbot-button"
        aria-label="Open chat"
      >
        <i className="fas fa-comments"></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <h3>Therapist Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-content">
                  <div className="loading-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="chatbot-form">
            <div className="chatbot-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="chatbot-input"
                disabled={isLoading}
                maxLength={CHATBOT_CONFIG.MAX_MESSAGE_LENGTH}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="chatbot-send-btn"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot; 