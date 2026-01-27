import "./ChatWindow.css"
// Component responsible for rendering chat messages
import Chat from './Chat'
import { MyContext } from './MyContext'
import { useContext, useState, useEffect } from 'react'
import { BounceLoader } from "react-spinners"


const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currId, prevChat, setPrevChat, newChat, setNewChat } = useContext(MyContext);  // Access shared chat state from context

  const [loading, setLoading] = useState(false);   // Controls loading spinner while waiting for API response



  const getReply = async () => {
    setLoading(true); // Show loader when request starts
    setNewChat(false);
    console.log("message", prompt, "threadId", currId) // Debug log for sent message
    const options = {
      method: "POST", // Send data using POST request
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currId
      })
    };
    try {
      const Response = await fetch("http://localhost:8080/api/chat", options);       // Send message to backend chat API

      const res = await Response.json();
      console.log(res);

      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false); // Hide loader after request completes
  }

  useEffect(() => {
    if (prompt && reply) {
      setPrevChat(prevChat => (
        [...prevChat, {
          role: "user",
          content: prompt
        }, {
          role: "assistant",
          content: reply
        }]
      ))
    }
    setPrompt('');
  }, [reply]);


  return (
    <div className='ChatWindow'>
      {/* NAVBAR PANEL */}
      <div className="navbar">

        {/* CHATBOT NAME */}
        <span>ByteGPT<i className="fa-solid fa-chevron-down"></i></span>

        {/* USER ICON WITH DROPDOWN FUNCTION */}
        <div className="UserIconDiv">
          <span className='user-icon'> <i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {/* Component displaying chat messages */}
      <Chat></Chat>
      {loading && (
        <div className="loaderWrapper">
          <BounceLoader color="white" size={28} />
        </div>
      )}
      <div className="chatInput">
        {/* USER INPUT AREA */}
        <div className="InputBox">
          <input placeholder="Ask Anything" value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // Update prompt on typing
            onKeyDown={(e) => e.key === "Enter" ? getReply() : ''}  // Send message when Enter key is pressed

          />

          <div id="submit" onClick={getReply}><i className="fa-regular fa-circle-up"></i></div>
        </div>

        {/* CHATBOT GENERAL INFORMATION */}
        <p className='info'>ByteGPT can make mistakes. Check important info. See Cookie Preferences.</p>
      </div>
    </div>
  )
}

export default ChatWindow