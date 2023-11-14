
import React, { createContext, useContext, useState } from "react";

const ChatBadgeContext = createContext();

export const ChatBadgeProvider = ({ children }) => {
  const [chatBadgeCount, setChatBadgeCount] = useState(0);

  return (
    <ChatBadgeContext.Provider value={{ chatBadgeCount, setChatBadgeCount }}>
      {children}
    </ChatBadgeContext.Provider>
  );
};

export const useChatBadge = () => {
  return useContext(ChatBadgeContext);
};
