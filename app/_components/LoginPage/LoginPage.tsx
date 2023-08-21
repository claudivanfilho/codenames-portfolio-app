"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = () => {
  const [userName, setUserName] = useState("");
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    if (error) alert(error);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col p-6 border-8 border-double rounded-lg shadow-md bg-base-100 bg-opacity-60 w-80 shadow-primary"
        action="/auth/login"
        method="post"
      >
        <h1 className="px-1 mx-auto text-2xl card-title">Login</h1>
        <div className="divider"></div>
        <div className="grid mb-4">
          <label htmlFor="username" className="font-semibold label">
            <span className="text-lg label-text">Username</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(evt) => setUserName(evt.target.value)}
            id="username"
            name="userName"
            autoComplete="off"
            className="input input-primary"
          />
        </div>
        <button className="mt-2 btn btn-primary">SignIn Anonymously</button>
      </form>
    </div>
  );
};
export default LoginPage;
