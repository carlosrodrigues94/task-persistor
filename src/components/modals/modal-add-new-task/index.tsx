import React, { useEffect, useRef, useState } from "react";
import { SimpleModal } from "../simple-modal";
import { Content } from "./styles";

interface ModalAddNewTaskProps {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: (inputValue: string) => void;
}

const ModalAddNewTask: React.FC<ModalAddNewTaskProps> = ({
  isOpen,
  onClickConfirm,
  onClickCancel,
}) => {
  const [inputValue, setInputValue] = useState("");

  const refInput = useRef<HTMLInputElement>(null);

  function handleClickConfirm() {
    onClickConfirm(inputValue);
    setInputValue("");
  }

  useEffect(() => {
    if (!refInput.current) return;
    if (!isOpen) return;
    refInput.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    setInputValue("");
  }, [isOpen]);

  return (
    <SimpleModal
      isOpen={isOpen}
      onClickCancel={onClickCancel}
      onClickConfirm={handleClickConfirm}
      headerText="Adicionar nova tarefa"
      typeButton="submit"
      onSubmit={handleClickConfirm}
    >
      <Content>
        <input
          type="text"
          value={inputValue}
          ref={refInput}
          onChange={(event) => setInputValue(event.target.value)}
          className="input-new-task"
          placeholder="Breve descrição da tarefa"
          maxLength={30}
        />
      </Content>
    </SimpleModal>
  );
};

export { ModalAddNewTask };
