import { getUserName, setUserName as setUserNameOnStorage } from "@/utils/storage";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState("");

  const _setUserName = (name: string) => {
    setUserNameOnStorage(name);
    setUserName(name);
  };

  useEffect(() => {
    setUserName(getUserName() || "");
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUserName: _setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
