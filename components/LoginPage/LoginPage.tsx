"use client";

import { User } from "@/models/server";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const LoginPage: React.FC<
  React.HtmlHTMLAttributes<HTMLElement> & {
    user?: User;
  }
> = ({ user }) => {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  useLayoutEffect(() => {
    if (user) router.push("/");
  }, []);

  useEffect(() => {
    if (error) alert(error);
  }, []);

  if (user) return null;

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col p-6 border-2 rounded-lg shadow-sm bg-base-100 w-80 shadow-primary"
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
