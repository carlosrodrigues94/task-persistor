import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  FaDollarSign,
  FaCalculator,
  FaCalendar,
  FaDashcube,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import useOnClickOutside from "use-onclickoutside";
import {
  useCardsCreate,
  CreateCardProps,
  useCardsList,
  useCardsUpdate,
} from "@/hooks/cards";
import { useAuth } from "@/hooks/use-auth";
import { colors } from "@/styles/colors";
import {
  Container,
  ButtonEnableCalc,
  AvatarContainer,
  ButtonAddCard,
  Form,
  UserName,
  Button,
  InputContainer,
  ListHiddenItems,
} from "./styles";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { SimpleModal } from "../modals/simple-modal";
import { FeeCalculator } from "../fee-calculator/fee-calculator";
import { CalendarInstallments } from "../calendar-installments";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSignIn, user, isAuthenticated, handleSignOut } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isCalculator, setIsCalculator] = useState(false);
  const { handleCreateCard } = useCardsCreate();
  const { cards } = useCardsList();
  const { handleHideOrRecoverCard } = useCardsUpdate();
  const { handleRefreshCardsList } = useCardsList();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalFeeCalculatorOpen, setIsModalFeeCalculatorOpen] =
    useState(false);

  const [isModalCalendarOpen, setIsModalCalendarOpen] = useState(false);
  const refDropdown = useRef<HTMLUListElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

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
  }

  useOnClickOutside(refDropdown, () => setIsDropdownOpen(false));

  const handleClickCalendar = () => {
    navigate("calendar");
  };

  const handleClickDashboard = () => {
    navigate("/");
    handleRefreshCardsList();
  };

  return (
    <Container>
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
        <Form onSubmit={handleSubmit}>
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
            <ButtonAddCard type="submit">
              <FiPlus />
            </ButtonAddCard>
          </InputContainer>
        </Form>
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
