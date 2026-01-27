import React from 'react'
import "./Sidebar.css"
import { useContext, useEffect } from 'react'
import { MyContext } from './MyContext'
import { v1 as uuidv1 } from "uuid";


const Sidebar = () => {

  // global state and setters from context
  const { allThread, setAllthread, currId, setNewChat, setPrompt, setReply, setCurrId, setPrevChat } = useContext(MyContext);

  // Fetch all chat threads 
  const getAlltThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();

      // Extract only required fields for sidebar display
      const filterData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
      setAllthread(filterData);

    } catch (err) {
      console.log(err);
    }
  }

  // Re-fetch threads whenever current thread changes
  useEffect(() => {
    getAlltThreads();
  }, [currId])

  // Creates new chat

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrId(uuidv1());
    setPrevChat([]);
    setReply(null);
  }

  // Load chat history when clicking on an existing thread

  const changeId = async (newThreadId) => {
    setCurrId(newThreadId);
    try {
      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevChat(res);
      setNewChat(false);
    } catch (err) {
      console.log(err);
    }
  }

  // Delete a chat thread

  const deleteThread = async (threadId) => {
    if (!threadId) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" }
      );

      const res = await response.json();
      console.log(res);

      // remove from sidebar immediately
      setAllthread(prev =>
        prev.filter(thread => thread.threadId !== threadId)
      );

      // if deleted thread was active
      if (currId === threadId) {
        setCurrId(null);
        setPrevChat([]);
        setNewChat(true);
      }

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className='sidebar'>
      <button className='new-chat-button' onClick={createNewChat}>
        <img src="src/assets/ailogo.png" alt="gpt logo" className='logo' />
        {/*new chat button */}
        <br />
        <span> <i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      {/* SEARCH CHAT */}
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder="Search chats"
          className="search-input"
        />
      </div>


      {/*history */}
      <ul className='history'>
        {
          allThread?.map((thread, idx) => (
            < li key={idx}
              onClick={() => changeId(thread.threadId)}> {thread.title}
              <i className="fa-regular fa-trash-can" onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}></i>
            </li>
          ))
        }
      </ul>
      {/* sign in */}
      <div className='sign'>
        <p>By Aparna Mishra &hearts;</p>
      </div>
    </section >
  )
}

export default Sidebar;