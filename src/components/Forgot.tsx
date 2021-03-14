import React, { useState } from "react";
import { FORGOT_MUTATION } from "../graphql/queries";
import { useMutation } from "@apollo/client";

import "./style.scss";
type ForgotInput = {
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const Forgot = ({ setForgot, setError }: ForgotInput) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendForgotEmail] = useMutation(FORGOT_MUTATION, {
    variables: { email },
  });

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

  const handleReturnToLogin = () => {
    setError(false);
    setForgot(false);
  };

  return isSent ? (
    <div className="login-wrapper">
      <div>Please check your email ({email}) for a password reset link.</div>
      <div>
        <button onClick={handleReturnToLogin}>Login</button>
      </div>
    </div>
  ) : (
    <div className="login-wrapper">
      <h1>Please enter email to recieve a password reset.</h1>
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
      <div>
        <p onClick={handleReturnToLogin}>I know my password</p>
      </div>
      {emailError && <div className="error">Could not send email.</div>}
    </div>
  );
};

export default Forgot;
