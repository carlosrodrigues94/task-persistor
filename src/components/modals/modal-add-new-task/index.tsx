import React, { useState } from "react";
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

  function handleClickConfirm() {
    onClickConfirm(inputValue);
    setInputValue("");
  }

  return (
    <SimpleModal
      isOpen={isOpen}
      onClickCancel={onClickCancel}
      onClickConfirm={handleClickConfirm}
      headerText="Adicionar nova tarefa"
    >
      <Content>
        <input
          type="text"
          value={inputValue}
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
