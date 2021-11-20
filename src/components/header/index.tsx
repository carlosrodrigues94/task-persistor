import React, { useContext, useState } from "react";
import { CardContext } from "../../contexts/card-context";
import { colors } from "../../styles/colors";
import { v4 as uuid } from "uuid";
import { Container } from "./styles";

const Header: React.FC = () => {
  const { cards, setCards } = useContext(CardContext);
  const [inputValue, setInputValue] = useState("");

  function handleClickAddNewCard() {
    if (!inputValue) return;

    setCards([...cards, { color: colors.blue, id: uuid(), title: inputValue }]);

    setInputValue("");
  }

  return (
    <Container>
      <input
        type="text"
        placeholder="Título do Card"
        className="input-new-card"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="button" onClick={handleClickAddNewCard}>
        Adicionar Card
      </button>
    </Container>
  );
};

export { Header };
