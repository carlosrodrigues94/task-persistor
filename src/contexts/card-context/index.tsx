import React, { createContext, useCallback } from "react";
import useStateStorage from "../../hooks/use-state-storage";
import { Task } from "../../types/task";

export type ICard = {
  id: string;
  color: string;
  title: string;
  isCalculator: boolean;
  createdAt: Date;
};

export type SetCardColorProps = { cardId: string; color: string };

export type CardContextProps = {
  cards: ICard[];
  setCards: (card: ICard[]) => void;
  setCardColor: (data: SetCardColorProps) => void;
  deleteCard: (cardId: string) => void;
  handleDownloadCardData: (data: { cardId: string }) => void;
};

export const CardContext = createContext({} as CardContextProps);

export const CardContextProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useStateStorage<ICard[]>([], "@cards");
  const [tasks] = useStateStorage<Task[]>([], "@tasks");

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

  const handleDownloadCardData = useCallback(
    (data: { cardId: string }) => {
      const card = cards.find((item) => item.id === data.cardId);
      if (!card) return;

      const cardTasks = tasks.filter((task) => task.cardId === card.id);

      const type = "data:text/json;charset=utf-8,";
      const json = JSON.stringify({ ...card, tasks: cardTasks });
      const elementData = type + encodeURIComponent(json);

      const element = document.getElementById("a-download-json");

      if (!element) return;

      const cardDateCreated = card.createdAt ?? new Date();

      const date = {
        year: new Date(cardDateCreated).getFullYear(),
        month: new Date(cardDateCreated).getMonth() + 1,
        day: new Date(cardDateCreated).getDate(),
      };
      const cardDate = `${date.day}-${date.month}-${date.year}`;

      element.setAttribute("href", elementData);
      element.setAttribute("download", `card-${card.id}-${cardDate}.json`);
      element.click();
    },
    [cards, tasks]
  );

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        setCardColor: handleSetCardColor,
        deleteCard: handleDeleteCard,
        handleDownloadCardData,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
