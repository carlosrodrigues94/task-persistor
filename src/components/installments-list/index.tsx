import {
  ContainerInstallment,
  ContentItemTitleAndValue,
  ContainerInstallmentPayments,
  Installment,
  InstallmentProgress,
  InstallmentsTitleContainer,
  ItemDetails,
} from "./styles";
import { FaPlus } from "react-icons/fa";
import { ModalAddNewInstallment } from "../modals/modal-add-new-installment";
import { useInstallmentsList } from "@/hooks/installments/use-installments-list";
import { useInstallmentsCreate } from "@/hooks/installments/use-installments-create";
import { useEffect, useState } from "react";
import { useInstallmentsDelete } from "@/hooks/installments/use-installments-delete";
import { ModalDeleteInstallment } from "../modals/modal-delete-installment";
import { useRecoilState } from "recoil";
import { modalsState } from "@/state/modals/atoms";
import { MODALS } from "@/constants/modals";

export const InstallMentsList = () => {
  const [_, setModalOpen] = useRecoilState(modalsState);
  const { products, handleRefreshInstallmentsList } = useInstallmentsList();
  const { handleClickAddNewInstallment } = useInstallmentsCreate();
  const { handleDeleteInstallment } = useInstallmentsDelete();
  const [installmentId, setInstallmentId] = useState("");

  const handleConfirmDeleteInstallment = () => {
    handleDeleteInstallment(installmentId);
    setModalOpen("");
  };

  useEffect(() => {
    handleRefreshInstallmentsList();
  }, []);

  return (
    <ContainerInstallmentPayments>
      <ModalAddNewInstallment />
      <ModalDeleteInstallment onClickConfirm={handleConfirmDeleteInstallment} />
      <InstallmentsTitleContainer>
        <h2>Installments</h2>
        <button type="button" onClick={handleClickAddNewInstallment}>
          <FaPlus />
        </button>
      </InstallmentsTitleContainer>
      {products.map((item) => {
        const {
          productName,
          amountFormated,
          amountPaidFormated,
          installments,
          installmentsPaid,
        } = item;
        return (
          <ContainerInstallment
            key={productName}
            onClick={() => {
              setModalOpen(MODALS.DELETE_INSTALLMENT_CONFIRM);
              setInstallmentId(item.id);
            }}
          >
            <ContentItemTitleAndValue>
              <span>{item.dueDate}</span>
              <span>{productName}</span>
              <span>{amountFormated}</span>
            </ContentItemTitleAndValue>
            <Installment>
              <ItemDetails>
                {installmentsPaid} de {installments} parcelas
              </ItemDetails>
              <InstallmentProgress
                totalInstallments={installments}
                paidInstallments={installmentsPaid}
              />
              <ItemDetails>{amountPaidFormated}</ItemDetails>
            </Installment>
          </ContainerInstallment>
        );
      })}
    </ContainerInstallmentPayments>
  );
};
