"use client";

import { login } from "@/app/_services/api";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import LoadingButton from "../LoadingButton";
import useError from "@/app/_hooks/useError";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const { error, setError } = useError();
  const onLogin = async () => {
    await login(userName)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col p-6 border-8 border-double rounded-lg shadow-md bg-base-100 bg-opacity-60 w-80 shadow-primary">
        <h1 className="px-1 mx-auto text-2xl card-title">Login</h1>
        <div className="divider"></div>
        {error && (
          <div className="alert alert-error" data-testid="error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <div className="grid mb-4">
          <label htmlFor="username" className="font-semibold label">
            <span className="text-lg label-text">Username</span>
          </label>
          <input
            type="text"
            required
            value={userName}
            onChange={(evt) => setUserName(evt.target.value)}
            id="username"
            name="userName"
            autoComplete="off"
            className="input input-primary"
          />
        </div>
        <LoadingButton onClick={onLogin} className="mt-2 btn btn-primary">
          <FormattedMessage id="signin-username" />
        </LoadingButton>
      </div>
    </div>
  );
};
export default LoginPage;
