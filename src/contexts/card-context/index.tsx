import React, { createContext } from "react";
import useStateStorage from "../../hooks/use-state-storage";

export type ICard = {
  id: string;
  color: string;
  title: string;
  isCalculator: boolean;
};

export type SetCardColorProps = { cardId: string; color: string };

export type CardContextProps = {
  cards: ICard[];
  setCards: (card: ICard[]) => void;
  setCardColor: (data: SetCardColorProps) => void;
  deleteCard: (cardId: string) => void;
};

export const CardContext = createContext({} as CardContextProps);

export const CardContextProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useStateStorage<ICard[]>([], "@cards");

  function handleSetCardColor(data: SetCardColorProps) {
    const cardUpdated = cards.map((card) => {
      if (card.id === data.cardId) {
        return { ...card, color: data.color };
      }

      return card;
    });

    setCards(cardUpdated);
  }

  function handleDeleteCard(cardId: string) {
    const cardsUpdated = cards.filter((card) => card.id !== cardId);

    setCards(cardsUpdated);
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        setCardColor: handleSetCardColor,
        deleteCard: handleDeleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
