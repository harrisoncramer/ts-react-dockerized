import React, { useState } from "react";
import { CHANGE_PASSWORD_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";

//import "./style.scss";

type QueryParams = {
  token: string;
};

const ResetPassword = () => {
  const { token }: QueryParams = useParams();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: { password, token },
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await changePassword();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const returnToLogin = () => history.push("/");

  return (
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
    </div>
  );
};

export default ResetPassword;
