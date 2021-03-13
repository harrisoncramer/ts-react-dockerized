import React, { Dispatch, SetStateAction, useState } from "react";

import "./style.scss";

const loginUser = async (username: string, password: string) => {
  return "imatoken";
};

type LoginProps = {
  setToken: Dispatch<SetStateAction<null | string>>;
};

const Login = ({ setToken }: LoginProps) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    if (token) {
      setToken(token);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please log in.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
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
