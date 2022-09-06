import React, { FormEvent, useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { useCardsCreate, CreateCardProps } from "@/hooks/cards";
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
} from "./styles";
import { FiLogOut, FiPlus } from "react-icons/fi";

const Header: React.FC = () => {
  const { handleSignIn, user, isAuthenticated, handleSignOut } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isCalculator, setIsCalculator] = useState(false);
  const { handleCreateCard } = useCardsCreate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValue) return;

    const data: CreateCardProps = {
      color: colors.blue,
      title: inputValue,
      isCalculator,
      progressCalculatorIncremental: true,
      tasks: [],
    };

    handleCreateCard(data);

    setInputValue("");
  }

  return (
    <Container>
      {isAuthenticated && (
        <>
          <AvatarContainer>
            <img src={user.avatar} alt="avatar" />
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
