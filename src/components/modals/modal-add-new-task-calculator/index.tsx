import React, { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/utils";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Content } from "./styles";

interface ModalAddNewTaskCalculatorProps {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: (data: { description: string; value: string }) => void;
}

const ModalAddNewTaskCalculator: React.FC<ModalAddNewTaskCalculatorProps> = ({
  isOpen,
  onClickConfirm,
  onClickCancel,
}) => {
  const [inputDescription, setInputDescription] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  const refInput = useRef<HTMLInputElement>(null);

  function handleClickConfirm() {
    onClickConfirm({ description: inputDescription, value: inputAmount });
    setInputDescription("");
  }

  useEffect(() => {
    if (!refInput.current) return;
    if (!isOpen) return;
    refInput.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    setInputDescription("");
    setInputAmount("");
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
          value={inputDescription}
          ref={refInput}
          onChange={(event) => setInputDescription(event.target.value)}
          className="input-new-task"
          placeholder="Breve descrição da tarefa"
          maxLength={30}
        />

        <input
          value={inputAmount}
          placeholder="Valor"
          onChange={({ target }) => {
            setInputAmount(formatCurrency(target.value));
          }}
        />
      </Content>
    </SimpleModal>
  );
};

export { ModalAddNewTaskCalculator };
