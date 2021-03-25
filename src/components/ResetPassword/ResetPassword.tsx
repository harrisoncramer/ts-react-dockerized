import React, { useState } from "react";
import { CHANGE_PASSWORD_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormControl, Spinner } from "react-bootstrap";
import Modal from "../Modal";

//import "./style.scss";

type QueryParams = {
  token: string;
};

const ResetPassword = () => {
  const { token }: QueryParams = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: { password, token },
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    changePassword()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const returnToLogin = () => history.push("/");

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <div className="login-wrapper">
      <h2 className="login-header">New password:</h2>
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type="password"
          placeholder="Password"
          className="mr-sm-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outline-success">Send</Button>
      </Form>
      <Button variant="secondary" size="sm" onClick={returnToLogin}>
        I remembered my password, just return me to the login page.
      </Button>
      {error && (
        <Modal show={error} setShow={setError} heading="Password reset failed.">
          <div>Something went wrong. We could not reset the password.</div>
        </Modal>
      )}
    </div>
  );
};

export default ResetPassword;
