import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState, RefObject } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { ADD_PAGE_LINK } from "../../graphql/queries";
import simApiCall from "../../utils/simApiCall";

type AddLinkFormProps = {
  handleAddLink: () => void;
};
const AddLinkForm = ({
  handleAddLink,
}: AddLinkFormProps): React.ReactElement => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");

  const [addLink] = useMutation(ADD_PAGE_LINK, { variables: { link } });
  const buttonRef = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    if (isValid) {
      if (!buttonRef.current) return;
      buttonRef.current.focus();
    }
  }, [isValid]);

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    addLink()
      .then(() => {
        setLoading(false);
        setError(false);
        handleAddLink();
      })
      .catch((err) => {
        alert("Could not submit link.");
        setLoading(false);
        setIsValid(false);
      });
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
            onChange={(e) => setLink(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
          <Button
            variant={!isValid ? "primary" : "success"}
            ref={buttonRef}
            type="submit"
          >
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
