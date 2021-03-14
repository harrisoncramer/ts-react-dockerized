import React, { useState } from "react";
import { LOGIN_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import Forgot from "../Forgot";

import "./style.scss";

type LoginProps = {
  setToken: (token: string) => void;
};

const Login = ({ setToken }: LoginProps) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [setLogin] = useMutation(LOGIN_MUTATION, {
    variables: { password, email },
  });
  const [forgot, setForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await setLogin();
    if (res.data?.login) {
      setToken(res.data.login.id); // Set ID of logged in user
    } else {
      setError(true);
    }
  };

  return forgot ? (
    <Forgot setError={setError} setForgot={setForgot} />
  ) : (
    <div className="login-wrapper">
      <h1>Please log in.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
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
      {error && <div className="error">The email or password is incorrect</div>}
      <div>
        <p onClick={() => setForgot(true)}>Forgot password</p>
      </div>
    </div>
  );
};

export default Login;
