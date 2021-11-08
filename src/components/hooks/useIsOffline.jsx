import React, { createContext, useContext, useEffect, useState } from "react";

const ConnectionContext = createContext(true);

export const ConnectionProvider = ({ children }) => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnline(false);
    });
    window.addEventListener("online", () => {
      setOnline(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnline(false);
      });
      window.removeEventListener("online", () => {
        setOnline(true);
      });
    };
  }, []);

  return (
    <ConnectionContext.Provider value={online}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useIsOnline = () => {
  return useContext(ConnectionContext);
};
