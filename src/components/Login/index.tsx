import React, { useState } from "react";
import { LOGIN_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

import "./style.scss";

type LoginProps = {
  setToken: (token: string) => void;
};

const Login = ({ setToken }: LoginProps) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [setLogin] = useMutation(LOGIN_MUTATION, {
    variables: { password, email },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await setLogin();
    if (res.data?.login) {
      setToken(res.data.login.id); // Set ID of logged in user
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please log in.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
