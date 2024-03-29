import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Modal, Form } from "antd";
import type { ModalProps } from "antd";

type InjectModalRefType = {
  open: () => void;
  close: () => void;
  injectChildren: (children: React.ReactElement) => void;
  injectProps: (props: ModalProps) => void;
  setType: (type: string) => void;
  setFieldsValue: (values: any) => void;
};

type openArgsType = ModalProps & {
  children: React.ReactElement;
  type: "form" | "default";
  initialValues?: {
    [key: string]: any;
  };
};

const InjectModal = memo(
  forwardRef<InjectModalRefType, any>((props, ref) => {
    const [form] = Form.useForm();
    const typeRef = useRef<string>();
    const [modalChildren, setModalChildren] = useState<React.ReactElement>();
    const [modalProps, setModalProps] = useState<ModalProps>({
      visible: false,
    });
    const onFinish = useCallback(
      (values: any) => {
        modalProps.onOk?.(values);
      },
      [modalProps]
    );
    const onCancel = useCallback(() => {
      setModalProps((source: any) => ({
        ...source,
        visible: false,
      }));
    }, [setModalProps]);
    const onOpen = useCallback(() => {
      setModalProps((source: any) => ({
        ...source,
        visible: true,
      }));
    }, [setModalProps]);

    useImperativeHandle(
      ref,
      () => ({
        open: onOpen,
        close: onCancel,
        injectChildren: (element) => setModalChildren(element),
        injectProps: (props) => {
          setModalProps((source: any) => ({
            ...source,
            ...props,
          }));
        },
        setType: (type: string) => {
          typeRef.current = type;
        },
        setFieldsValue: (values: any) => {
          form.setFieldsValue(values);
        },
      }),
      [form, onOpen, onCancel, setModalChildren, setModalProps]
    );
    const handleOk = useCallback(() => {
      if (typeRef.current === "form") {
        form.submit();
      } else {
        modalProps.onOk?.(null as any);
      }
    }, [form, modalProps, typeRef]);
    return (
      <Modal {...modalProps} onCancel={onCancel} onOk={handleOk} footer={null}>
        {modalChildren
          ? React.cloneElement(modalChildren, {
              form,
              onFinish,
              onCancel,
            })
          : null}
      </Modal>
    );
  })
);

export default function useModal() {
  const injectModalRef = useRef<InjectModalRefType>(null);
  const handle = useMemo(() => {
    return {
      open: ({ children, type, initialValues, ...rest }: openArgsType) => {
        injectModalRef.current?.injectChildren(children); // 注入子组件
        injectModalRef.current?.injectProps(rest); // 注入Modal的参数
        injectModalRef.current?.setType(type); // 注入Modal的类型
        injectModalRef.current?.open();
      },
      close: () => injectModalRef.current?.close(),
    };
  }, []);
  return [handle, <InjectModal ref={injectModalRef} />] as const;
}
