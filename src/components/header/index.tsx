import React, { useRef, useState } from "react";
import { FaCalculator, FaCalendar } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import useOnClickOutside from "use-onclickoutside";
import { useCardsList, useCardsUpdate } from "@/hooks/cards";
import { useAuth } from "@/hooks/use-auth";
import {
  Container,
  AvatarContainer,
  UserName,
  Button,
  ListHiddenItems,
} from "./styles";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { SimpleModal } from "../modals/simple-modal";
import { FeeCalculator } from "../fee-calculator/fee-calculator";
import { CalendarInstallments } from "../calendar-installments";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MODALS } from "@/constants/modals";
import { useRecoilState } from "recoil";
import { modalsState } from "@/state/modals/atoms";
import { ModalAddNewCard } from "../modals/modal-add-new-card";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [_, setModalOpen] = useRecoilState(modalsState);
  const { handleSignIn, user, isAuthenticated, handleSignOut } = useAuth();

  const { cards } = useCardsList();
  const { handleHideOrRecoverCard } = useCardsUpdate();
  const { handleRefreshCardsList } = useCardsList();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalFeeCalculatorOpen, setIsModalFeeCalculatorOpen] =
    useState(false);

  const [isModalCalendarOpen, setIsModalCalendarOpen] = useState(false);
  const refDropdown = useRef<HTMLUListElement>(null);

  useOnClickOutside(refDropdown, () => setIsDropdownOpen(false));

  const handleClickCalendar = () => {
    navigate("calendar");
  };

  const handleClickDashboard = () => {
    navigate("/");
    handleRefreshCardsList();
  };

  const handleClickAddNewCard = () => {
    setModalOpen(MODALS.ADD_NEW_CARD);
  };

  return (
    <Container>
      <ModalAddNewCard onClickCancel={() => setModalOpen("")} />
      <SimpleModal
        isOpen={isModalFeeCalculatorOpen}
        onClickCancel={() => setIsModalFeeCalculatorOpen(false)}
        onClickConfirm={() => {}}
        headerText="Calculo de Financiamento"
        typeButton="button"
      >
        <FeeCalculator />
      </SimpleModal>

      <SimpleModal
        isOpen={isModalCalendarOpen}
        onClickCancel={() => setIsModalCalendarOpen(false)}
        onClickConfirm={() => {}}
        headerText="Calendário"
        typeButton="button"
      >
        <CalendarInstallments />
      </SimpleModal>
      {isAuthenticated && (
        <>
          <AvatarContainer
            onClick={() => setIsDropdownOpen((oldState) => !oldState)}
          >
            <img src={user.avatar} alt="avatar" />
            <ListHiddenItems
              isDropdownOpen={isDropdownOpen}
              className="drop-down"
              ref={refDropdown}
            >
              {cards
                .filter((card) => card.isHidden)
                .map((card) => (
                  <li key={card.id}>
                    {card.title}
                    <Button
                      type="button"
                      onClick={() =>
                        handleHideOrRecoverCard({
                          hide: false,
                          cardId: card.id,
                        })
                      }
                    >
                      <FiRefreshCcw />
                    </Button>
                  </li>
                ))}
            </ListHiddenItems>
          </AvatarContainer>
          <UserName>{user.userName}</UserName>
        </>
      )}
      {isAuthenticated && (
        <Button
          className="button-add-new-card"
          type="button"
          onClick={handleClickAddNewCard}
        >
          <FiPlus />
        </Button>
      )}

      {!isAuthenticated && (
        <Button type="button" onClick={handleSignIn}>
          Login
        </Button>
      )}

      <Button
        type="button"
        className="button-calculate-financing"
        onClick={() => setIsModalFeeCalculatorOpen(true)}
      >
        <FaCalculator />
      </Button>

      <Button
        type="button"
        className="button-calculate-financing"
        onClick={() => handleClickCalendar()}
      >
        <FaCalendar />
      </Button>

      <Button
        type="button"
        className="button-calculate-financing"
        onClick={() => handleClickDashboard()}
      >
        <MdDashboard />
      </Button>

      {isAuthenticated && (
        <Button type="button" onClick={handleSignOut}>
          <FiLogOut />
        </Button>
      )}
    </Container>
  );
};

export { Header };
