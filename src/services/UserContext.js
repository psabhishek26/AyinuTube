import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [googleId, setGoogleId] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, googleId, setGoogleId }}>
      {children}
    </UserContext.Provider>
  );
};
