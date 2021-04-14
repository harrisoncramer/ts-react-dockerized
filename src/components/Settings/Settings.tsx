import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "../Modal";
import { DELETE_ACCOUNT } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

type SettingsProps = {
  removeToken: () => void;
};

const Settings = ({ removeToken }: SettingsProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: {
      password,
      email,
    },
  });

  const handleDeleteAccount = async () => {
    const res = await deleteAccount();
    if (res.data.unregister) {
      removeToken();
    }
  };

  return (
    <>
      <Modal heading="Enter Link" show={show} setShow={setShow}>
        <p>Are you sure? This action cannot be undone.</p>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant={"danger"} onClick={handleDeleteAccount}>
          Delete My Account
        </Button>
      </Modal>
      <div>
        <Button variant={"danger"} onClick={() => setShow(!show)}>
          Delete Account
        </Button>
      </div>
    </>
  );
};

export default Settings;
