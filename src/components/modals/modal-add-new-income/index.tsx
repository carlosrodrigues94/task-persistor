import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/utils";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Content } from "./styles";

interface ModalAddNewIncomeProps {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: (data: { title: string; amount: string }) => void;
}

const ModalAddNewIncome: React.FC<ModalAddNewIncomeProps> = ({
  isOpen,
  onClickConfirm,
  onClickCancel,
}) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  const refInput = useRef<HTMLInputElement>(null);

  const handleClickConfirm = useCallback(() => {
    onClickConfirm({ title: inputTitle, amount: inputAmount });
    setInputTitle("");
    setInputAmount("");
  }, [inputTitle, inputAmount, onClickConfirm]);

  useEffect(() => {
    if (!refInput.current) return;
    if (!isOpen) return;
    refInput.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    setInputTitle("");
    setInputAmount("");
  }, [isOpen]);

  return (
    <SimpleModal
      isOpen={isOpen}
      onClickCancel={onClickCancel}
      onClickConfirm={() => {
        handleClickConfirm();
      }}
      headerText="Add new Income"
      typeButton="submit"
      onSubmit={handleClickConfirm}
    >
      <Content>
        <label htmlFor="income-title">
          <span>Título</span>
          <input
            id="income-title"
            type="text"
            value={inputTitle}
            ref={refInput}
            onChange={(event) => setInputTitle(event.target.value)}
            placeholder="Ex: Salário"
            maxLength={30}
          />
        </label>

        <label htmlFor="income-amount">
          <span>Valor</span>
          <input
            id="income-amount"
            value={inputAmount}
            placeholder="R$ 0,00"
            onChange={({ target }) => {
              setInputAmount(formatCurrency(target.value));
            }}
          />
        </label>
      </Content>
    </SimpleModal>
  );
};

export { ModalAddNewIncome };
