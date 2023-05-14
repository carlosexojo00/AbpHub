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

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, getCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
