"use client";

import { login } from "@/app/_services/api";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import LoadingButton from "../LoadingButton";

const LoginPage: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = () => {
  const [userName, setUserName] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col p-6 border-8 border-double rounded-lg shadow-md bg-base-100 bg-opacity-60 w-80 shadow-primary">
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
        <LoadingButton onClick={() => login(userName)} className="mt-2 btn btn-primary" hideOnCatch>
          <FormattedMessage id="signin-username" />
        </LoadingButton>
      </div>
    </div>
  );
};
export default LoginPage;
