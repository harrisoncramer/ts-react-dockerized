import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../graphql/queries";
import { useHistory } from "react-router-dom";

type SignupProps = {
  setToken: (arg: string) => void;
};
const Signup = ({ setToken }: SignupProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setSignup] = useMutation(SIGNUP_MUTATION, {
    variables: { password, email, name },
  });

  const history = useHistory();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSignup()
      .then((res) => {
        setToken(res.data.register.id);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
    setIsLoading(false);
  };

  return (
    <div className="login-wrapper">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="name">
          <p>Name</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
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
      <div className="login-notice">
        <p onClick={() => history.push("/")}>I already have an account.</p>
      </div>
      {error && (
        <div className="error">There was a problem signing you up.</div>
      )}
    </div>
  );
};

export default Signup;
