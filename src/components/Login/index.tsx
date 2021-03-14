import React, { useState } from "react";
import { LOGIN_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin()
      .then((res) => {
        console.log("SUCCESS");
        setToken(res.data.login.id); // Set ID of logged in user
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
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
      <div className="login-notice">
        <p onClick={() => history.push("/signup")}>Create an account</p>
      </div>
      <div className="login-notice">
        <p onClick={() => history.push("/forgot")}>Forgot password</p>
      </div>
    </div>
  );
};

export default Login;
