import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Content } from "./styles";

interface ModalAddNewTaskProps {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: (data: { description: string; dueDate: string }) => void;
}

const getTodayISODate = () => DateTime.now().toISODate() ?? "";

const ModalAddNewTask: React.FC<ModalAddNewTaskProps> = ({
  isOpen,
  onClickConfirm,
  onClickCancel,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState(getTodayISODate);

  const refInput = useRef<HTMLInputElement>(null);

  function handleClickConfirm() {
    onClickConfirm({
      description: inputValue.trim(),
      dueDate: dueDate || getTodayISODate(),
    });
    setInputValue("");
    setDueDate(getTodayISODate());
  }

  useEffect(() => {
    if (!refInput.current) return;
    if (!isOpen) return;
    refInput.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    setInputValue("");
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
        <label htmlFor="new-task-description">
          <span>Descrição</span>
          <input
            id="new-task-description"
            type="text"
            value={inputValue}
            ref={refInput}
            onChange={(event) => setInputValue(event.target.value)}
            className="input-new-task"
            placeholder="Breve descrição da tarefa"
            maxLength={30}
          />
        </label>
        <label htmlFor="new-task-due-date">
          <span>Data de vencimento</span>
          <input
            id="new-task-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>
      </Content>
    </SimpleModal>
  );
};

export { ModalAddNewTask };
