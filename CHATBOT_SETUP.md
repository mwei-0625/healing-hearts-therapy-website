# Therapist Chatbot Setup Guide

## Overview
The Healing Hearts Therapy website now includes an AI-powered chatbot that provides supportive conversation and information about therapy services using Google's Gemini API.

## Features
- 🤖 **AI-Powered Responses**: Uses Google Gemini 2.5 Flash API for intelligent, empathetic responses
- 💬 **Real-time Chat**: Instant messaging interface with typing indicators
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🎨 **Professional Design**: Matches the website's design system
- 🔒 **Safe & Ethical**: Includes safety guidelines and disclaimers

## Setup Instructions

### 1. Get Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://ai.google.dev/](https://ai.google.dev/)
2. **Sign in**: Use your Google account
3. **Create API Key**: 
   - Click "Get API key" or "Create API key"
   - Give it a name (e.g., "Healing Hearts Chatbot")
   - Copy the generated API key

### 2. Configure the API Key

1. **Create or edit `.env` file** in the root directory of your project
2. **Add your API key**:
   ```
   VITE_GEMINI_API_KEY=your-actual-api-key-here
   ```
   
   **Example:**
   ```
   VITE_GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
   ```

3. **Important**: Make sure `.env` is in your `.gitignore` file to keep your API key secure

### 3. Test the Chatbot

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**: Go to `http://localhost:5174/`

3. **Test the chatbot**: 
   - Click the "Chat with AI Assistant" button in the hero section
   - Type a message and press Enter
   - Verify you get a response from the AI

## API Configuration

The chatbot uses the latest Gemini 2.5 Flash model with the correct API format:

```typescript
// API endpoint
GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// Request format
{
  contents: [
    {
      parts: [
        {
          text: "Your prompt here"
        }
      ]
    }
  ]
}

// Headers
{
  'Content-Type': 'application/json',
  'x-goog-api-key': 'your-api-key'
}
```

## Configuration Options

You can customize the chatbot by editing `src/config/chatbot.ts`:

```typescript
export const CHATBOT_CONFIG = {
  // API Configuration (reads from .env file)
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  
  // Chatbot Settings
  MAX_MESSAGE_LENGTH: 500,        // Maximum characters per message
  TYPING_INDICATOR_DELAY: 1000,   // Delay before showing typing indicator
  
  // Customize Messages
  WELCOME_MESSAGE: 'Your custom welcome message...',
  
  // Error Messages
  ERROR_MESSAGES: {
    API_ERROR: 'Custom API error message...',
    NETWORK_ERROR: 'Custom network error message...',
    INVALID_RESPONSE: 'Custom invalid response message...'
  }
};
```

## Environment Variables

The chatbot uses Vite's environment variable system:

- **Development**: Create `.env` file in project root
- **Production**: Set environment variables on your hosting platform
- **Security**: Never commit `.env` files to version control

### Example `.env` file:
```
VITE_GEMINI_API_KEY=your-actual-api-key-here
```

## Safety & Ethics

The chatbot is designed with safety in mind:

- **No Medical Advice**: The AI never provides medical diagnoses or treatment advice
- **Professional Referral**: Always encourages seeking professional help for serious concerns
- **Clear Disclaimers**: Users are informed it's an AI assistant, not a replacement for therapy
- **Content Filtering**: Responses are guided by ethical guidelines

## Troubleshooting

### Common Issues

1. **"Please configure your API key" message**
   - Make sure you've created a `.env` file in the project root
   - Verify the variable name is `VITE_GEMINI_API_KEY`
   - Restart the development server after creating the `.env` file

2. **HTTP 404 errors**
   - Ensure you're using the correct API endpoint (gemini-2.5-flash)
   - Verify your API key is valid and has proper permissions
   - Check that the request format matches the official documentation

3. **API errors or network issues**
   - Check your internet connection
   - Verify your API key is correct in the `.env` file
   - Ensure you have sufficient API quota
   - Check the browser console for detailed error messages

4. **Chatbot not appearing**
   - Check the browser console for errors
   - Verify the Hero component is properly imported in `src/App.tsx`

5. **Environment variable not working**
   - Make sure the variable name starts with `VITE_`
   - Restart the development server after changing `.env`
   - Check that `.env` is in the root directory

### API Quota & Limits

- **Free Tier**: 15 requests per minute, 1500 requests per day
- **Paid Tier**: Higher limits available
- **Monitor Usage**: Check your Google AI Studio dashboard

### Debugging Steps

1. **Check browser console** for detailed error messages
2. **Verify API key** in Google AI Studio dashboard
3. **Test API directly** using curl or Postman
4. **Check network tab** in browser dev tools for request/response details

## Security Notes

- **Never commit `.env` files** to version control
- **Use environment variables** for all API keys
- **Regularly rotate** your API keys
- **Monitor usage** for unusual activity

## Production Deployment

For production, set environment variables on your hosting platform:

### Vercel:
```bash
vercel env add VITE_GEMINI_API_KEY
```

### Netlify:
- Go to Site Settings > Environment Variables
- Add `VITE_GEMINI_API_KEY` with your API key

### Other platforms:
- Set `VITE_GEMINI_API_KEY` environment variable
- Restart your application

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is working in Google AI Studio
3. Test with a simple message first
4. Check the network tab for API request/response details
5. Ensure your `.env` file is properly formatted
6. Refer to the [official Gemini API documentation](https://ai.google.dev/gemini-api/docs/text-generation)

---

**Note**: This chatbot is designed to provide general information and support, not professional therapy. Always encourage users to seek professional help for serious mental health concerns. 