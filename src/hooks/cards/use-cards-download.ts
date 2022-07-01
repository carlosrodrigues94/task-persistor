import { useCallback } from "react";
import { useCardsList } from "./use-cards-list";

export const useCardsDownload = () => {
  const { cards } = useCardsList();

  const handleDownloadCardData = useCallback(
    (data: { cardId: string }) => {
      const card = cards.find((item) => item.id === data.cardId);
      if (!card) return;
      const type = "data:text/json;charset=utf-8,";
      const json = JSON.stringify(card);
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
    [cards]
  );

  return { handleDownloadCardData };
};
