import React, { useState, useImperativeHandle, useRef } from "react";
import { Modal } from "antd";

type PayLoadType = {
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

export type ModalRefType = {
  show(payload?: PayLoadType): void;
};

const RefModal = React.forwardRef<ModalRefType, PayLoadType>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<PayLoadType>({});
  useImperativeHandle(
    ref,
    () => ({
      show: (payload: PayLoadType) => {
        payloadRef.current = payload;
        setVisible(true);
      },
    }),
    []
  );
  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false);
    method && method();
  };
  return (
    <Modal
      title="ref Modal"
      visible={visible}
      onOk={wrapWithClose(payloadRef.current?.onOk)}
      onCancel={wrapWithClose(payloadRef.current?.onCancel)}
    >
      <div>ref....</div>
    </Modal>
  );
});

export default RefModal;
