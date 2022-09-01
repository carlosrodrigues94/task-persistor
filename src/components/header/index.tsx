import React, { FormEvent, useEffect, useState } from "react";
import { colors } from "@/styles/colors";
import { Container, ButtonEnableCalc, AvatarContainer } from "./styles";
import { FaDollarSign } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";
import { useCardsCreate, CreateCardProps } from "@/hooks/cards";

const Header: React.FC = () => {
  const { handleSignIn, user } = useAuth();

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

  useEffect(() => {
    console.log(`user`, user);
  }, []);

  return (
    <Container>
      <AvatarContainer>
        <img src={user.avatar} alt="avatar" />
      </AvatarContainer>
      <span>{user.userName}</span>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título do Card"
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
        <button type="submit">Adicionar Card</button>
        <button type="button" onClick={handleSignIn}>
          Logar
        </button>
      </form>
    </Container>
  );
};

export { Header };
