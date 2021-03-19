import React, { useState } from "react";
import { LOGIN_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Modal from "../Modal";

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
    try {
      const res = await setLogin();
      setToken(res.data.login.id); // Set ID of logged in user
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && (
        <Modal
          show={error}
          setShow={setError}
          heading="Wrong login credentials."
        >
          <div>You either entered the wrong password or email.</div>
        </Modal>
      )}
      <div className="login-buttons">
        <Button type="secondary" onClick={() => history.push("/signup")}>
          Create an account
        </Button>
        <Button type="secondary" onClick={() => history.push("/forgot")}>
          Forgot Password
        </Button>
      </div>
    </div>
  );
};

export default Login;
