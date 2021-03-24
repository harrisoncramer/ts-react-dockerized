import React, { useState } from "react";

const Modal = ({ text }: { text: string }) => <div>{text}</div>;

const Settings = () => {
  const [modal, setModal] = useState(false);

  const handleDeleteAccount = () => {
    setModal(true);
  };

  return (
    <>
      {modal && <Modal text="Are you sure? This action cannot be undone." />}
      <div>
        <button onClick={() => setModal(!modal)}>Delete Account</button>
      </div>
    </>
  );
};

export default Settings;
