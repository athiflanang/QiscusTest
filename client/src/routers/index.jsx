import * as React from "react";

import { createBrowserRouter, redirect } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import Chatroom from "../views/Chatroom";
import GroupChat from "../component/GroupChat";
import Chat from "../component/Chat";

const router = createBrowserRouter([
  {
    path: "/room",
    element: <Chatroom />,
    loader: () => {
      if (!localStorage.username) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/multi-chat",
    element: <GroupChat />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export default router;
