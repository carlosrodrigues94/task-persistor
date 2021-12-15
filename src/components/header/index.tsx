import React, { FormEvent, useContext, useState } from "react";
import { CardContext } from "../../contexts/card-context";
import { colors } from "../../styles/colors";
import { v4 as uuid } from "uuid";
import { Container } from "./styles";

const Header: React.FC = () => {
  const { cards, setCards } = useContext(CardContext);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValue) return;

    setCards([...cards, { color: colors.blue, id: uuid(), title: inputValue }]);

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
        <button type="submit">Adicionar Card</button>
      </form>
    </Container>
  );
};

export { Header };
