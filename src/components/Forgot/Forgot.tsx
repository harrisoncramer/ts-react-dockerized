import React, { useState } from "react";
import { FORGOT_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, Spinner } from "react-bootstrap";

//import "./style.scss";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendForgotEmail] = useMutation(FORGOT_MUTATION, {
    variables: { email },
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    sendForgotEmail()
      .then((res) => {
        if (res.data?.forgotPassword) {
          setIsSent(true);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const returnToLogin = () => history.push("/");

  if (isSent)
    return (
      <div className="login-wrapper">
        <div>Please check your email ({email}) for a password reset link.</div>
        <div>
          <button onClick={returnToLogin}>Login</button>
        </div>
      </div>
    );

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="login-wrapper">
      <h2 className="login-header">What's my password?</h2>
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type="email"
          placeholder="Email"
          className="mr-sm-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Send
        </Button>
      </Form>
      <Button variant="secondary" size="sm" onClick={returnToLogin}>
        I know my password
      </Button>
      {error && <div className="error">Could not send email.</div>}
    </div>
  );
};

export default Forgot;
