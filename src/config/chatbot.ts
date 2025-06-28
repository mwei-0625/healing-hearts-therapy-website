// Chatbot Configuration
export const CHATBOT_CONFIG = {
  // Read API key from environment variable (set in .env file in root)
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
  
  // API endpoint - Updated to use the correct Gemini 2.5 Flash model
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  
  // Chatbot settings
  MAX_MESSAGE_LENGTH: 500,
  TYPING_INDICATOR_DELAY: 1000,
  
  // Welcome message
  WELCOME_MESSAGE: 'Hello! I\'m here to provide supportive conversation and information about therapy services. How can I help you today?',
  
  // Error messages
  ERROR_MESSAGES: {
    API_ERROR: 'I apologize, but I\'m experiencing technical difficulties. Please contact our office directly at (555) 123-4567 or email hello@healinghearts.com for immediate assistance.',
    NETWORK_ERROR: 'I apologize, but I\'m having trouble connecting right now. Please feel free to contact our human therapists directly for immediate support.',
    INVALID_RESPONSE: 'I apologize, but I received an unexpected response. Please try again or contact our office directly.'
  }
};

// Helper function to get the API URL (without key parameter)
export const getGeminiApiUrl = () => {
  return CHATBOT_CONFIG.GEMINI_API_URL;
};

// Helper function to check if API key is configured
export const isApiKeyConfigured = () => {
  return CHATBOT_CONFIG.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE' && 
         CHATBOT_CONFIG.GEMINI_API_KEY.length > 0;
}; 