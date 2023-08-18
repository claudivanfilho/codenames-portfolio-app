import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function InitialPage() {
  const [userName, setUserName] = useState("");
  const { setUserName: saveUserName } = useUser();

  const onLogin = () => {
    saveUserName(userName);
  };

  return (
    <div className="flex flex-col items-start gap-4 sm:items-center sm:flex-row">
      <label htmlFor="usernameInput" className="text-xl font-medium leading-6">
        Username
      </label>
      <input
        value={userName}
        onChange={(evt) => setUserName(evt.target.value)}
        id="usernameInput"
        type="text"
        autoComplete="off"
        placeholder="Username"
        className="w-full max-w-xs input input-bordered"
      />
      <button onClick={onLogin} className="w-full sm:w-auto sm:ml-7 btn">
        Continue
      </button>
    </div>
  );
}
