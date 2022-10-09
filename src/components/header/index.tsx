import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
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

const Header: React.FC = () => {
  const { handleSignIn, user, isAuthenticated, handleSignOut } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isCalculator, setIsCalculator] = useState(false);
  const { handleCreateCard } = useCardsCreate();
  const { cards } = useCardsList();
  const { handleHideOrRecoverCard } = useCardsUpdate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <Container>
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
          <InputContainer className="input-container">
            <input
              type="text"
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

      {isAuthenticated && (
        <Button type="button" onClick={handleSignOut}>
          <FiLogOut />
        </Button>
      )}
    </Container>
  );
};

export { Header };
