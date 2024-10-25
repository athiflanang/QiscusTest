import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const usernameHandler = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.username = username;
      navigate("/room");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-slate-200">
        <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <p className="font-bold text-neutral-700 text-3xl mb-5 text-center">
            Welcome to the Chatroom!
          </p>

          <p className="text-neutral-900 font-bold text-3xl sm:text-4xl lg:text-6xl text-center">
            Please make sure to enter your username to continue
          </p>

          <button
            onClick={() =>
              document.getElementById("model_username").showModal()
            }
            className="mt-12 py-3 px-5 text-md font-medium rounded-lg border bg-neutral-950 border-gray-200 text-white shadow-2xl relative h-12 overflow-hidden transition-all hover:shadow-neutral-700"
          >
            <p>Enter Username</p>
          </button>

          <dialog id="model_username" className="modal">
            <div className="bg-white modal-box p-6 max-w-sm mx-auto flex flex-col justify-center items-center">
              <h3 className="font-bold text-lg text-neutral-950 text-center">
                Insert Your Name
              </h3>
              <form
                onSubmit={usernameHandler}
                className="w-full flex flex-col items-center"
              >
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                  className="mt-5 input input-bordered w-full bg-white text-black text-center"
                />
                <button
                  type="submit"
                  className="mt-5 w-full py-3 px-5 text-md font-medium rounded-lg border bg-neutral-900 border-gray-200 text-white shadow-2xl relative h-12 overflow-hidden transition-all hover:shadow-neutral-700"
                >
                  <p>Submit</p>
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}
