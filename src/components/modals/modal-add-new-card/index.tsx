import { MODALS } from "@/constants/modals";
import { SimpleModal } from "../simple-modal";
import { useRecoilState } from "recoil";
import { modalsState } from "@/state/modals/atoms";
import { Content, ButtonEnableCalc, InputContainer } from "./styles";
import { CreateCardProps, useCardsCreate } from "@/hooks/cards";
import { FC, FormEvent, useState } from "react";
import { colors } from "@/styles/colors";
import { FaDollarSign } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export const ModalAddNewCard: FC<{ onClickCancel: () => void }> = ({
  onClickCancel,
}) => {
  const localtion = useLocation();
  const { handleCreateCard } = useCardsCreate();
  const [modalOpen, setModalOpen] = useRecoilState(modalsState);
  const [inputValue, setInputValue] = useState("");
  const [isCalculator, setIsCalculator] = useState(false);

  function handleSubmit() {
    if (!inputValue) return;

    const data: CreateCardProps = {
      color: colors.blue,
      title: inputValue,
      isCalculator,
      progressCalculatorIncremental: true,
      isHidden: false,
      tasks: [],
    };

    handleCreateCard(data);

    setInputValue("");
    setModalOpen("");
  }
  return (
    <SimpleModal
      isOpen={modalOpen === MODALS.ADD_NEW_CARD}
      onClickCancel={onClickCancel}
      onClickConfirm={handleSubmit}
      headerText="Add new Card"
      typeButton="button"
    >
      <Content>
        <InputContainer
          className="input-container"
          isDisabled={location.pathname !== "/"}
        >
          <input
            type="text"
            disabled={location.pathname !== "/"}
            placeholder="Card Title"
            className="input-new-card"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <ButtonEnableCalc
            type="button"
            onClick={() => setIsCalculator(!isCalculator)}
            isCalculator={isCalculator}
          >
            <FaDollarSign />
          </ButtonEnableCalc>
        </InputContainer>
      </Content>
    </SimpleModal>
  );
};
