import React from "react";
import { Link } from "react-router-dom";

export default function Chatroom() {
  return (
    <>
      <div className="p-4 md:p-8 flex flex-col justify-center items-center h-screen w-screen bg-slate-200">
        <h1 className="text-3xl md:text-4xl text-neutral-950 font-bold text-center">
          Select a Chatroom
        </h1>
        <div className="w-full max-w-4xl p-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/chat">
              <button className="flex flex-col items-center hover:-translate-y-3 transition-all duration-500 px-6 py-4 bg-white border border-neutral-300 rounded-lg text-neutral-950 w-full sm:w-80">
                <p className="text-neutral-950 font-bold text-lg md:text-2xl mb-2 text-center">
                  Live Chatroom
                </p>
                <p className="text-neutral-500 font-medium text-center">
                  A working chatroom for Testing
                </p>
              </button>
            </Link>
            <Link to="/multi-chat">
              <button className="flex flex-col items-center hover:-translate-y-3 transition-all duration-500 px-6 py-4 bg-white border border-neutral-300 rounded-lg text-neutral-950 w-full sm:w-80">
                <p className="text-neutral-950 font-bold text-lg md:text-2xl mb-2 text-center">
                  Group Chatroom
                </p>
                <p className="text-neutral-500 font-medium text-center">
                  A chatroom for multiple people
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
