import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [videos, setVideos] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [commentBox, setCommentBox] = useState(false);

  return (
    <AppContext.Provider
      value={{
        videos,
        setVideos,
        searchInput,
        setSearchInput,
        filteredVideos,
        setFilteredVideos,
        commentBox,
        setCommentBox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
