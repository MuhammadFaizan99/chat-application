import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] }); 
export default function Chat() {
  // Room State
  const [room, setRoom] = useState("");

  // Messages State
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array to hold all messages

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Update messages array with the new message
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className={styles.mainChatContainer}>
      <div className={styles.chatContainer}>
        <input
          className={styles.roomInput}
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
        <input
          className={styles.messageInput}
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1 className={styles.messageTitle}> Messages:</h1>
        {/* Map through messages array to display all messages */}
        <div>
          {messages.map((msg, index) => (
            <p key={index} className={styles.messageContent}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
