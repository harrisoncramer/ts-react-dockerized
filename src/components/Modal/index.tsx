import React from "react";
import { Button, Modal as BootstrapModal } from "react-bootstrap";

type ModalProps = {
  heading: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <BootstrapModal show={props.show} onHide={handleClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{props.heading}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
