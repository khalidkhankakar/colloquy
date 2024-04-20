'use client'
import { useState } from "react";
import { EmailContext } from "./EmailContext";

export const EmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('')
  return <EmailContext.Provider value={{userEmail, setUserEmail}}>{children}</EmailContext.Provider>;
};
