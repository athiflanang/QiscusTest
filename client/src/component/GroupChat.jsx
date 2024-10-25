"use client";

import { useState, useEffect } from "react";
import { Paperclip, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import chatDataJson from "../data/text.json";

export default function Component() {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = chatDataJson;
      setChatData(data.results[0]);
    };

    fetchData();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && chatData) {
      const newComment = {
        id: Date.now(),
        type: "text",
        message: message.trim(),
        sender: "customer@mail.com",
      };
      setChatData({
        ...chatData,
        comments: [...chatData.comments, newComment],
      });
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/room");
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold text-neutral-950">Group Chat</h1>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {chatData &&
            chatData.comments.map((comment) => (
              <div
                key={comment.id}
                className={`mb-4 ${
                  comment.sender === "customer@mail.com"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    comment.sender === "customer@mail.com"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{comment.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {chatData.room.participant.find(
                    (p) => p.id === comment.sender
                  )?.name || "Unknown"}
                </p>
              </div>
            ))}
        </main>

        <footer className="border-t p-4">
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-500">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-500">
              <Images className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Enter your message"
              className="flex-1 mx-2 p-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-500"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
          <button
            className="mt-4 text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-500"
            onClick={handleLeaveRoom}
          >
            Leave Room
          </button>
        </footer>
      </div>
    </>
  );
}
