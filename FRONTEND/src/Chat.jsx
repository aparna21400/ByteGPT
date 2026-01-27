import React, { useContext, useState, useEffect } from 'react'
import "./Chat.css"
import { MyContext } from './MyContext';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"

const Chat = () => {
  // Read new chat flag and chat history array from global context
  const { newChat, prevChat, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);


  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChat?.length) return;

    const content = reply.split(" ");

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);

  }, [prevChat, reply])

  return (
    <>
      {newChat && <h1>Start the new chats !</h1>}
      <div className='chats'>
        {
          // Loop over each message in chat history
          prevChat?.slice(0, -1).map((Chat, idx) =>
            <div className={Chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
              {
                Chat.role === "user" ?
                  <p className="userMsg">{Chat.content}</p> :
                  <Markdown rehypePlugins={[rehypeHighlight]}>
                    {Chat.content}</Markdown>}
              {/* Render message content based on sender role */}

            </div>
          )
        }
        {
          prevChat.length > 0 && (
            <>
              {
                latestReply === null ? (
                  <div className="gptDiv" key={"non-typing"}>
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {prevChat[prevChat.length - 1].content}</Markdown>

                  </div>
                ) : (
                  <div className="gptDiv" key={"typing"}>
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {latestReply}</Markdown>

                  </div>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default Chat;