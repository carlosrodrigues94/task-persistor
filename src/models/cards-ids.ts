import { Collections } from "@/constants/collections";
import { ICard } from "@/types/card";
import { database } from "@/services/firebase";
import { DataSnapshot, onValue, ref, set, update } from "firebase/database";

export const CardsIdsModel = {
  storeUserCardsIds: async (
    cardsIds: string[],
    userId: string
  ): Promise<void> => {
    await set(
      ref(database, `${Collections.USER_CARDS_IDS}/${userId}`),
      cardsIds
    );
  },

  updateUserCardsIds: async (
    userId: string,
    userCardsIds: string[],
    card: ICard
  ): Promise<void> => {
    let updates = {
      [`${Collections.USER_CARDS_IDS}/${userId}`]: [...userCardsIds, card.id],
    };
    await update(
      ref(database, `${Collections.USER_CARDS_IDS}/${userId}`),
      updates
    );
  },

  getUserCardsIds: async (userId: string): Promise<{ cardsIds: string[] }> => {
    const query = ref(database, `${Collections.USER_CARDS_IDS}/${userId}`);
    onValue(query, (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      return { cardsIds: [] };
    });

    return { cardsIds: [] };
  },
};
