"use client";

import { User } from "@/types/server";
import { FC, createContext, useState } from "react";

type UserContextType = {
  user: User;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC<React.HtmlHTMLAttributes<Element> & { remoteUser: User }> = ({
  children,
  remoteUser,
}) => {
  const [user] = useState(remoteUser);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
