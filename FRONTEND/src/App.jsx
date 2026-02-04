import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupLogin from "../src/pages/SignupLogin";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext";
import "./App.css";
import { v1 as uuidv1 } from "uuid";
import { useAuth } from "./pages/UseAuth";
import ProtectedRoute from "./hooks/ProtectedRoutes";

function App() {
  const { user } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currId, setCurrId] = useState(uuidv1());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThread, setAllthread] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currId, setCurrId,
    prevChat, setPrevChat,
    newChat, setNewChat,
    allThread, setAllthread
  };

  return (
    <MyContext.Provider value={providerValues}>
      <Routes>
        <Route
  path="/"
  element={
    <ProtectedRoute>
      <div className="app">
        <Sidebar />
        <ChatWindow />
      </div>
    </ProtectedRoute>
  }
/>

<Route path="/login" element={<SignupLogin />} />

      </Routes>
    </MyContext.Provider>
  );
}

export default App;
