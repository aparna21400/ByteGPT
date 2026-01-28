# ByteGPT

A full-stack AI chatbot application built with React and Node.js, featuring conversational AI powered by OpenAI's GPT-4o-mini model. The application provides a ChatGPT-like interface with persistent chat history stored in MongoDB.

## Project Overview

ByteGPT is a conversational AI web application that allows users to interact with an AI assistant in real-time. The project demonstrates full-stack development skills, including RESTful API design, state management, database integration, and modern frontend practices. Each conversation is stored as a "thread" with complete message history, enabling users to resume previous conversations.

## Features

- **Real-time AI Chat**: Interactive conversations with OpenAI's GPT-4o-mini model
- **Persistent Chat History**: All conversations are saved to MongoDB with unique thread IDs
- **Multi-threaded Conversations**: Create and manage multiple chat sessions
- **Typewriter Effect**: Animated text rendering for AI responses
- **Code Syntax Highlighting**: Automatic syntax highlighting for code snippets in responses
- **Markdown Support**: Rich text formatting using react-markdown
- **Thread Management**: View, switch between, and delete previous conversations
- **Search Functionality**: Search through chat history (UI implemented)
- **Responsive Design**: Clean, modern UI inspired by ChatGPT

## Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite** - Build tool and development server
- **react-markdown** - Markdown rendering for AI responses
- **rehype-highlight** - Code syntax highlighting
- **highlight.js** - Syntax highlighting themes
- **uuid** - Unique ID generation for chat threads
- **react-spinners** - Loading indicators

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database for storing chat threads
- **Mongoose 8.19.3** - MongoDB ODM
- **OpenAI API** - GPT-4o-mini model integration
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development auto-restart
- **dotenv** - Environment variable management

## Project Architecture

### High-Level Flow

1. **User Input** → User types a message in the chat interface
2. **Frontend Processing** → React captures the input and sends it to the backend via POST request
3. **Backend Processing** → Express server receives the message, forwards it to OpenAI API
4. **AI Response** → OpenAI returns the AI-generated response
5. **Database Storage** → Message and response are stored in MongoDB as part of a thread
6. **Frontend Rendering** → Response is rendered with markdown and syntax highlighting

### Data Flow

```
User Input → React Component → Express API → OpenAI API
                ↓                    ↓
         Context State ← MongoDB Storage
                ↓
         Chat Display (with typewriter effect)
```

### Database Schema

**Thread Collection:**
```javascript
{
  threadId: String (unique),
  title: String,
  messages: [
    {
      role: "user" | "assistant",
      content: String,
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ByteGPT
   ```

2. **Install Backend Dependencies**
   ```bash
   cd BACKEND
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../FRONTEND
   npm install
   ```

4. **Set Up Environment Variables**
   
   Create a `.env` file in the `BACKEND` directory:
   ```env
  
5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the Backend Server**
   ```bash
   cd BACKEND
   npm start
   # Server will run on http://localhost:8080
   ```

7. **Run the Frontend**
   ```bash
   cd FRONTEND
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API authentication key | Yes |

## API Endpoints

### Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/chat` | Send a message and get AI response | `{ threadId: string, message: string }` | `{ reply: string }` |
| GET | `/thread` | Get all chat threads | - | Array of thread objects |
| GET | `/thread/:threadId` | Get messages from a specific thread | - | Array of messages |
| DELETE | `/thread/:threadId` | Delete a specific thread | - | `{ success: string }` |
| POST | `/test` | Test endpoint for creating threads | - | Thread object |

## Folder Structure

```
ByteGPT/
├── BACKEND/
│   ├── models/
│   │   └── Threads.js          # MongoDB schema for chat threads
│   ├── routes/
│   │   └── chat.js             # API route handlers
│   ├── utils/
│   │   └── openai.js           # OpenAI API integration
│   ├── server.js               # Express server configuration
│   └── package.json
│
├── FRONTEND/
│   ├── src/
│   │   ├── App.jsx             # Main application component
│   │   ├── ChatWindow.jsx      # Chat interface component
│   │   ├── Chat.jsx            # Message display with typewriter effect
│   │   ├── Sidebar.jsx         # Thread list and navigation
│   │   ├── MyContext.jsx       # React Context for state management
│   │   └── *.css               # Component styles
│   ├── index.html
│   └── package.json
│
└── package.json                # Root package.json
```

## Key Components Explained

### Frontend

- **App.jsx**: Root component managing global state via React Context
- **ChatWindow.jsx**: Handles user input, API calls, and displays loading states
- **Chat.jsx**: Renders message history with typewriter animation effect
- **Sidebar.jsx**: Displays thread list, handles thread switching and deletion
- **MyContext.jsx**: Provides centralized state management across components

### Backend

- **server.js**: Express server setup with CORS and MongoDB connection
- **chat.js**: Route handlers for CRUD operations on chat threads
- **openai.js**: Wrapper function for OpenAI API calls
- **Threads.js**: Mongoose schema defining thread and message structure

## Challenges Faced & Learnings

### Challenges

1. **State Synchronization**: Managing chat state across multiple components required careful design of React Context to avoid prop drilling
2. **Typewriter Effect Timing**: Implementing smooth text animation while preserving markdown formatting required careful string splitting and timing logic
3. **Thread Management**: Ensuring thread deletion updates both the database and UI state without causing rendering issues
4. **Code Highlighting**: Integrating syntax highlighting for code blocks in AI responses required proper rehype plugin configuration

### Key Learnings

- **Context API Mastery**: Learned to effectively use React Context for complex state management without Redux
- **MongoDB Integration**: Gained experience with Mongoose ODM for schema design and CRUD operations
- **OpenAI API Usage**: Understanding how to structure prompts and handle API responses efficiently
- **Markdown Rendering**: Implementing rich text rendering with react-markdown and custom plugins
- **Full-Stack Development**: Coordinated frontend and backend development for seamless user experience

## Future Improvements

- [ ] **User Authentication**: Add user login/signup with JWT authentication
- [ ] **Multi-user Support**: Enable user-specific chat histories
- [ ] **File Upload**: Support image/document uploads in conversations
- [ ] **Conversation Search**: Implement functional search across all messages
- [ ] **Streaming Responses**: Use OpenAI streaming API for real-time token generation
- [ ] **Export Conversations**: Allow users to export chats as PDF or text files
- [ ] **Theme Customization**: Add dark/light mode toggle
- [ ] **Rate Limiting**: Implement API rate limiting to prevent abuse
- [ ] **Conversation Branching**: Allow users to fork conversations from specific messages
- [ ] **Model Selection**: Let users choose between different OpenAI models



## Contact

**Aparna Mishra**
- GitHub: [@aprna21400](https://github.com/aparna21400)
- LinkedIn: [aparna-mishra21](https://linkedin.com/in/aparna-mishra21)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

### Acknowledgments

- OpenAI for providing the GPT-4o-mini API
- React and Vite teams for excellent developer tools
- MongoDB for robust database solutions

---

**Built with ❤️ by Aparna Mishra**
