import { useState } from "react";
import { toast } from "react-toastify";
import { SimpleModal } from "../simple-modal";
import { Content } from "./styles";
import { formatCurrency } from "@/utils";
import { useRecoilState } from "recoil";
import { modalsState } from "@/state/modals/atoms";
import { MODALS } from "@/constants/modals";
import { Installment } from "@/types/installment";
import { useInstallmentsCreate } from "@/hooks/installments/use-installments-create";
import { DateTime } from "luxon";

const DEFAULT_INSTALLMENTS_QUANTITY = 2;

export const ModalAddNewInstallment = () => {
  const { handleCreateInstallment } = useInstallmentsCreate();
  const [modalOpen, setModalOpen] = useRecoilState(modalsState);
  const [amount, setAmount] = useState("");
  const [installmentsQuantity, setInstallmentsQuantity] = useState(
    DEFAULT_INSTALLMENTS_QUANTITY
  );
  const [productName, setProductName] = useState("");
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");

  const resetForm = () => {
    setAmount("");
    setProductName("");
    setInstallmentsQuantity(DEFAULT_INSTALLMENTS_QUANTITY);
    setFirstInstallmentDate("");
  };

  const handleClickConfirm = async () => {
    const trimmedName = productName.trim();
    const value = Number(amount.replace(/\D/g, ""));

    if (!trimmedName) {
      toast.error("Informe o nome do produto.");
      return;
    }

    if (!firstInstallmentDate) {
      toast.error("Informe a data da primeira parcela.");
      return;
    }

    if (installmentsQuantity < 1) {
      toast.error("A quantidade de parcelas deve ser maior que zero.");
      return;
    }

    if (value <= 0) {
      toast.error("Informe um valor válido para a parcela.");
      return;
    }

    const firstInstallment = DateTime.fromISO(firstInstallmentDate, {
      zone: "local",
    });

    if (!firstInstallment.isValid) {
      toast.error("Data da primeira parcela inválida.");
      return;
    }

    const dueDay = firstInstallment.day;
    const totalAmount = value * installmentsQuantity;

    const installment: Omit<Installment, "id"> = {
      amountEachInstallment: value,
      amount: totalAmount,
      dueDay,
      installments: installmentsQuantity,
      productName: trimmedName,
      firstInstallmentDate,
    };

    await handleCreateInstallment(installment);
    resetForm();
    setModalOpen("");
  };

  return (
    <SimpleModal
      isOpen={modalOpen === MODALS.ADD_NEW_INSTALLMENT}
      onClickCancel={() => {
        resetForm();
        setModalOpen("");
      }}
      headerText="Add new Installment"
      onClickConfirm={handleClickConfirm}
      typeButton="button"
    >
      <Content>
        <label htmlFor="installment-quantity">
          <span>Installments Quantity</span>
          <input
            name="installment-quantity"
            type="number"
            min={1}
            value={installmentsQuantity}
            onChange={(event) =>
              setInstallmentsQuantity(Number(event.target.value))
            }
            placeholder="Installment quantity"
          />
        </label>

        <label htmlFor="installment-product-name">
          <span>Installment product name</span>
          <input
            name="installment-product-name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Smartphone Samsung"
          />
        </label>

        <label htmlFor="installment-amount">
          <span>Installment amount</span>
          <input
            name="installment-amount"
            value={amount}
            placeholder="R$ 350,00"
            onChange={(event) => setAmount(formatCurrency(event.target.value))}
          />
        </label>

        <label htmlFor="installment-first-date">
          <span>First installment date</span>
          <input
            type="date"
            value={firstInstallmentDate}
            onChange={({ target }) => setFirstInstallmentDate(target.value)}
            name="installment-first-date"
          />
        </label>
      </Content>
    </SimpleModal>
  );
};
