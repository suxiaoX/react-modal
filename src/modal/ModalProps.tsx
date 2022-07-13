import React, { memo, useState } from "react";
import { Modal } from "antd";

type ModalPropsType = {
  children: React.ReactElement;
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

const ModalProps = memo<ModalPropsType>(
  ({ children, onOk, onCancel, ...others }) => {
    const [visible, setVisible] = useState(false);
    const wrapWithClose = (method?: () => void) => () => {
      setVisible(false);
      method && method();
    };
    return (
      <>
        <Modal
          title="props Modal"
          visible={visible}
          onOk={wrapWithClose(onOk)}
          onCancel={wrapWithClose(onCancel)}
        >
          <div>...</div>
        </Modal>
        {React.cloneElement(children, {
          onClick: (...args: any[]) => {
            const { onClick } = children.props;
            setVisible(true);
            onClick && onClick(...args);
          },
        })}
      </>
    );
  }
);

export default ModalProps;
