import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import simApiCall from "../../utils/simApiCall";

type AddLinkFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
const AddLinkForm = ({ onSubmit }: AddLinkFormProps): React.ReactElement => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting link...");
  };

  const validate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    simApiCall({
      timeout: 2000,
      errorMsg: "Invalid link",
      successMsg: "Valid link",
    })
      .then(() => {
        setIsValid(true);
        setError(false);
      })
      .catch((err) => {
        setIsValid(false);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Form onSubmit={!isValid ? validate : add}>
        <Form.Group controlId="formSubmitLink">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            disabled={isValid}
          />
          <Form.Text className="text-muted"></Form.Text>
          <Button variant={!isValid ? "primary" : "success"} type="submit">
            {!isValid ? "Validate" : "Submit"}
          </Button>
        </Form.Group>
      </Form>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Validating...</span>
        </Spinner>
      )}
      {error && <div>That is not a valid link.</div>}
    </div>
  );
};

export default AddLinkForm;
