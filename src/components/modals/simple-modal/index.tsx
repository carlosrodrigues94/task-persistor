import React from "react";

import { Container, Content } from "./styles";

export type SimpleModalProps = {
  isOpen: boolean;
  onClickConfirm: () => void;
  onClickCancel: () => void;
  headerText: string;
};

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClickCancel,
  onClickConfirm,
  headerText,
  children,
}) => {
  return (
    <Container style={{ display: isOpen ? "flex" : "none" }}>
      <Content>
        <header>
          <strong>{headerText}</strong>
        </header>
        {children}
        <div className="div-modal-content-buttons">
          <button onClick={onClickCancel} type="button">
            Cancelar
          </button>
          <button onClick={onClickConfirm} type="button">
            Confirmar
          </button>
        </div>
      </Content>
    </Container>
  );
};

export { SimpleModal };
