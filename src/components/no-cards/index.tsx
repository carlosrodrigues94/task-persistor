import { useCardsList } from "@/hooks/cards";
import React from "react";

import { Container } from "./styles";

export const NoCards: React.FC = () => {
  const { cards } = useCardsList();
  return (
    <Container style={{ display: !!cards.length ? "none" : "flex" }}>
      <h2>Parece que você não cadastrou nada ainda.</h2>
    </Container>
  );
};
