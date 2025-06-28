import { useRecoilState } from "recoil";
import { SimpleModal } from "../simple-modal";
import { modalsState } from "@/state/modals/atoms";
import { MODALS } from "@/constants/modals";
import { FC } from "react";
import { Content } from "./styles";
import { useInstallmentsList } from "@/hooks/installments/use-installments-list";

type ModalDeleteInstallmentProps = {
  onClickConfirm(): void;
};

export const ModalDeleteInstallment: FC<ModalDeleteInstallmentProps> = ({
  onClickConfirm,
}) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalsState);

  const handleClickCancel = () => {
    setModalOpen("");
  };

  return (
    <SimpleModal
      isOpen={modalOpen === MODALS.DELETE_INSTALLMENT_CONFIRM}
      onClickConfirm={onClickConfirm}
      onClickCancel={handleClickCancel}
      headerText="Delete installment?"
      typeButton="button"
    >
      <Content>
        <h3>Are you sure you want delete this installment?</h3>
      </Content>
    </SimpleModal>
  );
};
