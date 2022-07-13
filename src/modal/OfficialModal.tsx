import React, { useState } from "react";
import { Modal, Button } from "antd";

const OfficialModal = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Official Modal
      </Button>
      <Modal
        title="Official Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
export default OfficialModal;
