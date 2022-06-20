import React, { FormEvent, useCallback } from "react";
import { ReactNode } from "react";

import { Container, Content } from "./styles";

export type SimpleModalProps = {
  isOpen: boolean;
  onClickConfirm: () => void;
  onClickCancel: () => void;
  onSubmit?: () => void;
  headerText: string;
  typeButton: "button" | "submit";
  children: ReactNode;
};

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClickCancel,
  onClickConfirm,
  headerText,
  children,
  typeButton = "button",
  onSubmit = () => {},
}) => {
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <Container style={{ display: isOpen ? "flex" : "none" }}>
      <Content>
        <header>
          <strong>{headerText}</strong>
        </header>
        <form onSubmit={handleSubmit} className="form-content-modal">
          {children}
          <div className="div-modal-content-buttons">
            <button onClick={onClickCancel} type="button">
              Cancelar
            </button>
            <button onClick={onClickConfirm} type={typeButton}>
              Confirmar
            </button>
          </div>
        </form>
      </Content>
    </Container>
  );
};

export { SimpleModal };
