import React from "react";
import { Alert } from "react-bootstrap";

type AlertPopupProps = {
  contentHeader: string;
  content: string;
};

const AlertPopup = ({ contentHeader, content }: AlertPopupProps) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>{contentHeader}</Alert.Heading>
      <p>{content}</p>
    </Alert>
  );
};

export default AlertPopup;
