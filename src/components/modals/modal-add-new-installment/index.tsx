import { useState } from "react";
import { SimpleModal } from "../simple-modal";
import { Content } from "./styles";
import { formatCurrency } from "@/utils";
import { useRecoilState } from "recoil";
import { modalsState } from "@/state/modals/atoms";
import { MODALS } from "@/constants/modals";
import { Installment } from "@/types/installment";
import { useInstallmentsCreate } from "@/hooks/installments/use-installments-create";
import { DateTime } from "luxon";

export const ModalAddNewInstallment = () => {
  const { handleCreateInstallment } = useInstallmentsCreate();
  const [modalOpen, setModalOpen] = useRecoilState(modalsState);
  const [amount, setAmount] = useState("");
  const [installmentsQuantity, setInstallmentsQuantity] = useState(2);
  const [productName, setProductName] = useState("");
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");

  const handleClickConfirm = async () => {
    const dueDay = DateTime.fromISO(firstInstallmentDate)
      .toLocal()
      .toFormat("dd");

    const value = Number(amount.replace(/\D/g, ""));
    const totalAmount = value * installmentsQuantity;

    const installment: Omit<Installment, "id"> = {
      amountEachInstallment: value,
      amount: totalAmount,
      dueDay: Number(dueDay),
      installments: installmentsQuantity,
      productName,
      firstInstallmentDate,
    };

    await handleCreateInstallment(installment);
    setModalOpen("");
  };

  return (
    <SimpleModal
      isOpen={modalOpen === MODALS.ADD_NEW_INSTALLMENT}
      onClickCancel={() => {
        setAmount("");
        setProductName("");
        setInstallmentsQuantity(0);
        setFirstInstallmentDate("");
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
            onChange={({ target }) => setFirstInstallmentDate(target.value)}
            name="installment-first-date"
          />
        </label>
      </Content>
    </SimpleModal>
  );
};
