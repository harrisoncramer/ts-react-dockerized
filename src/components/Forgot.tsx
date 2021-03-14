import React, { useState } from "react";
import { FORGOT_MUTATION } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import "./style.scss";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendForgotEmail] = useMutation(FORGOT_MUTATION, {
    variables: { email },
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sendForgotEmail();
    if (res.data?.forgotPassword) {
      setIsSent(true);
    } else {
      setEmailError(true);
    }
    setIsLoading(false);
  };

  const returnToLogin = () => history.push("/");

  return isSent ? (
    <div className="login-wrapper">
      <div>Please check your email ({email}) for a password reset link.</div>
      <div>
        <button onClick={returnToLogin}>Login</button>
      </div>
    </div>
  ) : (
    <div className="login-wrapper">
      <h1>What's my password?</h1>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div>Sending email...</div>
      )}
      <div className="login-notice">
        <p onClick={returnToLogin}>I know my password</p>
      </div>
      {emailError && <div className="error">Could not send email.</div>}
    </div>
  );
};

export default Forgot;
