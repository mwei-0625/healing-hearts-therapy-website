import { useState, useRef, useEffect } from 'react';
import { CHATBOT_CONFIG, getGeminiApiUrl, isApiKeyConfigured } from '../config/chatbot';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi there! I\'m here to help you learn about our therapy services. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
      return 'Please configure your Gemini API key in the .env file to enable the chatbot functionality.';
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
    - Focus on welcoming people and explaining our services
    
    User message: ${userMessage}`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(getGeminiApiUrl(), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': CHATBOT_CONFIG.GEMINI_API_KEY
        },
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
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Your Journey to Healing Starts Here</h1>
          <p className="hero-subtitle">
            Professional therapy services in a safe, supportive environment. 
            We're here to help you navigate life's challenges and find your path to wellness.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('contact')}
            >
              Book a Session
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => scrollToSection('services')}
            >
              Learn More
            </button>
            <button 
              className="btn btn-chat" 
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <i className="fas fa-comments"></i>
              Chat with AI Assistant
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <i className="fas fa-spa"></i>
          </div>
        </div>
      </div>
      
      {/* Embedded Chatbot */}
      {isChatOpen && (
        <div className="hero-chatbot">
          <div className="hero-chatbot-container">
            <div className="hero-chatbot-header">
              <h3>AI Therapy Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hero-chatbot-close"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            
            <div className="hero-chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`hero-chatbot-message ${message.sender === 'user' ? 'user' : 'bot'}`}
                >
                  <div className="hero-message-content">
                    <p>{message.text}</p>
                    <span className="hero-message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="hero-chatbot-message bot">
                  <div className="hero-message-content">
                    <div className="hero-loading-dots">
                      <div className="hero-dot"></div>
                      <div className="hero-dot"></div>
                      <div className="hero-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="hero-chatbot-form">
              <div className="hero-chatbot-input-container">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our services..."
                  className="hero-chatbot-input"
                  disabled={isLoading}
                  maxLength={CHATBOT_CONFIG.MAX_MESSAGE_LENGTH}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="hero-chatbot-send-btn"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero 