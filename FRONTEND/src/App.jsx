import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { MyContext } from './MyContext' // Context to share state across components
import './App.css'
import { v1 as uuidv1 } from "uuid" // UUID generator for unique thread IDs


function App() {

  // Stores current user input message
  const [prompt, setPrompt] = useState("");

  // Stores assistant reply from backend
  const [reply, setReply] = useState(null);

  // Stores unique ID for current chat thread
  const [currId, setCurrId] = useState(uuidv1);

  const [prevChat, setPrevChat] = useState([]); //stores all chats of curr threads

  const [newChat, setNewChat] = useState(true); // Tracks whether the session starts with a new chat

  const [allThread, setAllthread] = useState([]);
  // Object holding shared state values
  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currId, setCurrId,
    prevChat, setPrevChat,
    newChat, setNewChat,
    allThread, setAllthread
  };

  return (

    <MyContext.Provider value={providerValues}> {/* Provide shared state to all children */}
      <div className="app">
        <Sidebar />
        <ChatWindow />{/* Chat interface */}
      </div>
    </MyContext.Provider>
  )
}

export default App
