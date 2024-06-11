import { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [postDetails, setPostDetails] = useState(null);;

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};
