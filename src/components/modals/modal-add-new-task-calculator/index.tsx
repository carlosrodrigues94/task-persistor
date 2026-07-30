import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { formatCurrency } from "@/utils";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Content } from "./styles";

interface ModalAddNewTaskCalculatorProps {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: (data: {
    description: string;
    value: string;
    dueDate: string;
  }) => void;
}

const getTodayISODate = () => DateTime.now().toISODate() ?? "";

const ModalAddNewTaskCalculator: React.FC<ModalAddNewTaskCalculatorProps> = ({
  isOpen,
  onClickConfirm,
  onClickCancel,
}) => {
  const [inputDescription, setInputDescription] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [dueDate, setDueDate] = useState(getTodayISODate);

  const refInput = useRef<HTMLInputElement>(null);

  function handleClickConfirm() {
    onClickConfirm({
      description: inputDescription.trim(),
      value: inputAmount,
      dueDate: dueDate || getTodayISODate(),
    });
    setInputDescription("");
    setInputAmount("");
    setDueDate(getTodayISODate());
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
    setDueDate(getTodayISODate());
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
        <label htmlFor="calc-task-description">
          <span>Descrição</span>
          <input
            id="calc-task-description"
            type="text"
            value={inputDescription}
            ref={refInput}
            onChange={(event) => setInputDescription(event.target.value)}
            className="input-new-task"
            placeholder="Breve descrição da tarefa"
            maxLength={30}
          />
        </label>

        <label htmlFor="calc-task-amount">
          <span>Valor</span>
          <input
            id="calc-task-amount"
            value={inputAmount}
            placeholder="Valor"
            onChange={({ target }) => {
              setInputAmount(formatCurrency(target.value));
            }}
          />
        </label>

        <label htmlFor="calc-task-due-date">
          <span>Data de vencimento</span>
          <input
            id="calc-task-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>
      </Content>
    </SimpleModal>
  );
};

export { ModalAddNewTaskCalculator };
