import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabase/client";

export const CurrentUserContext = createContext();

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserContext");
  }
  return context;
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log(user);
      setCurrentUser(user);
    }
    setIsLoading(false);
  };

  const clearCurrentUser = () => {
    setCurrentUser(null);
    console.log("User logged out");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, getCurrentUser, clearCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
