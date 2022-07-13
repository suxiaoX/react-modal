import React, { memo, useState, useRef, useEffect } from "react";
import { Modal } from "antd";

type PayLoadType = {
  onOk?(): void;
  onCancel?(): void;
  [others: string]: any;
};

export type ModalEmitType = React.NamedExoticComponent & {
  show(payload?: PayLoadType): void;
};

const EmitModal: ModalEmitType = memo(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const payloadRef = useRef<PayLoadType>({});
    useEffect(() => {
      const lastShow = EmitModal.show;
      EmitModal.show = (payload: PayLoadType) => {
        setVisible(true);
        payloadRef.current = payload;
      };
      return () => {
        EmitModal.show = lastShow;
      };
    }, []);
    const wrapWithClose = (method?: () => void) => () => {
      setVisible(false);
      method && method();
    };
    return (
      <Modal
        title="emit Modal"
        visible={visible}
        onOk={wrapWithClose(payloadRef.current?.onOk)}
        onCancel={wrapWithClose(payloadRef.current?.onCancel)}
      >
        <div>emit....</div>
      </Modal>
    );
  },
  () => true
) as any;

EmitModal.show = (payload?: PayLoadType) => {
  console.log(payload, "emitModal is not mounted");
};

export default EmitModal;
