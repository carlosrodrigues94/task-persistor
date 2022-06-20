import React, { FormEvent, useContext, useState } from "react";
import { CardContext } from "@/contexts/card-context";
import { colors } from "@/styles/colors";
import { randomUUID as uuid } from "crypto";
import { Container, ButtonEnableCalc } from "./styles";
import { FaDollarSign } from "react-icons/fa";
import { useCloudStorage } from "@/hooks/use-cloud-storage";
import { getData, writeUserData } from "@/services/firebase";

const Header: React.FC = () => {
  const { signIn } = useCloudStorage();
  const { cards, setCards } = useContext(CardContext);
  const [inputValue, setInputValue] = useState("");
  const [isCalculator, setIsCalculator] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValue) return;

    setCards([
      ...cards,
      {
        color: colors.blue,
        id: uuid(),
        title: inputValue,
        isCalculator,
        createdAt: new Date(),
      },
    ]);

    setInputValue("");
  }

  return (
    <Container>
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
      </form>

      <button type="button" onClick={signIn}>
        Logar
      </button>

      <button
        type="button"
        onClick={() =>
          writeUserData("id-card", {
            color: colors.blue,
            createdAt: new Date(),
            id: "iasdaisd",
            isCalculator: true,
            title: "teste",
          })
        }
      >
        gravar
      </button>

      <button type="button" onClick={() => getData()}>
        ler
      </button>
    </Container>
  );
};

export { Header };
