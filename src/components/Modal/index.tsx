import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

type ModalProps = {
  heading: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const handleClose = () => props.setShow(false);

  return (
    <BootstrapModal show={props.show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props.heading}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
