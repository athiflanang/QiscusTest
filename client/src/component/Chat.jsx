import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Paperclip, Images } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const socket = io("http://localhost:3001");

const Chat = () => {
  const { chatroom } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [image, setImage] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pdfSelected, setPdfSelected] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    const msg = { text: message, image: null, pdf: null, user: username };
    setMessages((prevMessages) => [...prevMessages, msg]);
    socket.emit("chatMessage", msg);
    setMessage("");

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await axios.post("http://localhost:3001/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = res.data.url;

        const imageMsg = {
          text: null,
          image: imageUrl,
          pdf: null,
          user: username,
        };
        setMessages((prevMessages) => [...prevMessages, imageMsg]);
        socket.emit("chatMessage", imageMsg);
      } catch (err) {
        console.error("Failed to upload image:", err);
      } finally {
        setImage(null);
        setFileSelected(false);
        setImagePreview(null);
      }
    }

    if (pdf) {
      const formData = new FormData();
      formData.append("pdf", pdf);

      try {
        const res = await axios.post(
          "http://localhost:3001/uploadPdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const pdfUrl = res.data.url;

        const pdfMsg = { text: null, image: null, pdf: pdfUrl, user: username };
        setMessages((prevMessages) => [...prevMessages, pdfMsg]);
        socket.emit("chatMessage", pdfMsg);
      } catch (err) {
        console.error("Failed to upload PDF:", err);
      } finally {
        setPdf(null);
        setPdfSelected(false);
        setPdfPreview(null);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileSelected(true);
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdf(file);
    setPdfSelected(true);
    setPdfPreview(file.name);
  };

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", chatroom);
    navigate("/room");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Chatroom</h2>
      <div className="chat-box h-64 overflow-y-scroll border p-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="font-bold">{msg.user}</div>
            <div>{msg.text}</div>
            {msg.image && (
              <img
                src={msg.image === "loading" ? imagePreview : msg.image}
                alt="chat-image"
                className="mt-2 max-w-xs"
              />
            )}
            {msg.pdf && (
              <a
                href={msg.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-500"
              >
                {msg.pdf}
              </a>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex items-center mb-4">
        <label htmlFor="image-upload" className="cursor-pointer mr-2">
          <Images
            className={`w-5 h-5 ${
              fileSelected ? "text-blue-500" : "text-gray-700"
            }`}
          />
          <input
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>
        {imagePreview && (
          <div className="mr-2">
            <img
              src={imagePreview}
              alt="preview"
              className="w-10 h-10 object-cover rounded"
            />
          </div>
        )}
        <label htmlFor="pdf-upload" className="cursor-pointer mr-2">
          <Paperclip
            className={`w-5 h-5 ${
              pdfSelected ? "text-blue-500" : "text-gray-700"
            }`}
          />
          <input
            id="pdf-upload"
            type="file"
            onChange={handlePdfChange}
            accept="application/pdf"
            className="hidden"
          />
        </label>
        {pdfPreview && (
          <div className="mr-2">
            <span className="text-gray-700">{pdfPreview}</span>
          </div>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="flex-1 mx-2 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-500"
        >
          Send
        </button>
      </form>
      <button
        className="mt-4 text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-500"
        onClick={handleLeaveRoom}
      >
        Leave Room
      </button>
    </div>
  );
};

export default Chat;
