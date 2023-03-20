import { useCardsList } from "@/hooks/cards";
import { useIncomesList } from "@/hooks/incomes";
import { useAuth } from "@/hooks/use-auth";
import React, { useMemo } from "react";

import { Container, ButtonRefresh } from "./styles";

export const NoCards: React.FC = () => {
  const { cards, handleRefreshCardsList } = useCardsList();
  const { handleRefreshIncomesList } = useIncomesList();
  const { isAuthenticated } = useAuth();

  const shouldDisplay = useMemo(() => {
    return cards.length < 1 && isAuthenticated;
  }, [isAuthenticated, cards.length]);

  return (
    <Container style={{ display: shouldDisplay ? "flex" : "none" }}>
      <h2>You do not have any cards yet.</h2>
      <ButtonRefresh
        type="button"
        onClick={() => {
          handleRefreshCardsList();
          handleRefreshIncomesList();
        }}
      >
        Refresh
      </ButtonRefresh>
    </Container>
  );
};
