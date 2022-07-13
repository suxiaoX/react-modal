import React from "react";
import { Button } from "antd";
import "antd/dist/antd.min.css";
import { OfficialModal, ModalProps, RefModal, EmitModal } from "./modal";
import { ModalRefType } from "./modal/RefModal";
import "./App.css";

function App() {
  const refModal = React.useRef<ModalRefType>(null);
  const showRefModal = () => {
    refModal.current?.show();
  };
  const showEmitModal = () => {
    EmitModal.show({
      onOk: () => {
        console.log("onOk");
      },
      onCancel: () => {
        console.log("onCancel");
      },
    });
  };
  const showEmitModal2 = () => {
    EmitModal.show({
      onOk: () => {
        console.log("onOk2");
      },
      onCancel: () => {
        console.log("onCancel2");
      },
    });
  };
  return (
    <div className="App">
      <OfficialModal />
      <ModalProps>
        <Button type="primary">Props Modal</Button>
      </ModalProps>
      <RefModal ref={refModal}></RefModal>
      <Button onClick={showRefModal}> 打开refModal </Button>
      <Button type="primary" onClick={showEmitModal}>
        打开EmitModal
      </Button>
      <Button type="primary" onClick={showEmitModal2}>
        打开EmitModal2
      </Button>
      <EmitModal />
    </div>
  );
}

export default App;
