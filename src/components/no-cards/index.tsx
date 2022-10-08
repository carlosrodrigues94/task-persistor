import { useCardsList } from "@/hooks/cards";
import { useAuth } from "@/hooks/use-auth";
import React, { useMemo } from "react";

import { Container, ButtonRefresh } from "./styles";

export const NoCards: React.FC = () => {
  const { cards, handleRefreshCardsList } = useCardsList();
  const { isAuthenticated } = useAuth();

  const shouldDisplay = useMemo(() => {
    return cards.length < 1 && isAuthenticated;
  }, [isAuthenticated, cards.length]);

  return (
    <Container style={{ display: shouldDisplay ? "flex" : "none" }}>
      <h2>You do not have any cards yet.</h2>
      <ButtonRefresh type="button" onClick={handleRefreshCardsList}>
        Refresh
      </ButtonRefresh>
    </Container>
  );
};
