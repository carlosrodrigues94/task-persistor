import { Collections } from "@/constants/collections";
import { ICard } from "@/types/card";
import { database } from "@/services/firebase";
import { DataSnapshot, onValue, ref, set } from "firebase/database";
import { CardsIdsModel } from "@/models/cards-ids";

export const CardsModel = {
  getCard: async (cardId: string, userId: string) => {
    const starCountRef = ref(database, `${Collections.CARDS}/${cardId}`);
    onValue(starCountRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      console.log("DATA", data);
    });
  },
  storeCard: async (userId: string, card: ICard) => {
    await set(ref(database, `${Collections.CARDS}/${card.id}`), card);
  },

  getCards: async (userId: string): Promise<any> => {
    const { cardsIds } = await CardsIdsModel.getUserCardsIds(userId);

    const promises = cardsIds.map((id) => {
      const query = ref(database, `${Collections.CARDS}/${id}`);
      onValue(query, (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        return data;
      });
    });

    const result = Promise.all(promises);

    return result;
  },
};
